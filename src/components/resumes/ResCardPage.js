import {useEffect, useState} from "react";
import {getList, getUser, isUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getResume, getResumeAnon, getResumesWorkListAnon} from "../../services/ResumeService";
import {useSelector} from "react-redux";
import {UserInfo} from "../user/UserInfo";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {ModalBlockRole} from "../modal/ModalBlockRole";
import {getDateStr} from "../getDataStr";
import {WorkCard} from "../work/WorkCard";


const GetStatus = ({status}) => {
    switch (status) {
        case "WAIT":
            return (<h3 className="text-secondary d-inline-block me-2">Cтатус: Ожидание</h3>)
        case "ACCEPT":
            return (<h3 className="text-success d-inline-block me-2">Cтатус: Принято</h3>)
        case "DECLINE":
            return (<h3 className="text-danger d-inline-block me-2">Cтатус: Отклонено</h3>)
        default:
            return
    }
}


export const ResCardPage = ({id}) => {
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)
    const [res, setRes] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [appl, setAppl] = useState(null);
    const [myprof, setMyprof] = useState(false)
    const [listWork, setListWork] = useState(null)

    //Получение резюме, данных о соискателе, сравнение token с id
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const resRes = (role === "EMPLOYER")
                ? await getResume(id, token)
                : await getResumeAnon(id)
            setRes(resRes)
            const resListWork = await getResumesWorkListAnon(id)
            setListWork(resListWork)
            const result = await getUser(resRes?.applicant_id);
            setAppl(result);
            if (token !== "") {
                const myprofRes = await isUser(result?.ID, token)
                setMyprof(myprofRes?.status === "true")
            }
            setIsLoading(false);
        };
        fetchData();
    }, [id, role, token]);

    const [show, setShow] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [isLoadListRes, setIsLoadListRes] = useState(true)
    const [listRes, setListRes] = useState(null)

    const fetchDataRes = async () => {
        setIsLoadListRes(true);
        if (role === "EMPLOYER") { //для modalBlock
            const result = await getList(token)
            setListRes(result)
        }
        setIsLoadListRes(false);
    };

    useEffect(() => {
        fetchDataRes();
    }, [role, token])

    return (
        <>
            {
                (!isLoadListRes && role === "EMPLOYER") &&
                <ModalBlockRole list={listRes} show={show} setShow={setShow} modalId={modalId}
                                fetchData={fetchDataRes}/>
            }
            <h2>Резюме</h2>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <h3 className="mb-2">{res?.post}</h3>
                        <p className="mb-1">{res?.description}</p>
                        <h4>Опыт работы:</h4>
                        <ul className="list-unstyled">
                            {
                                (listWork && listWork?.length) ?
                                    listWork.map((item) => (
                                        <li key={item?.id}>
                                            <WorkCard item={item}/>
                                        </li>
                                    )) : <li>Список пуст ;-(</li>
                            }
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        {
                            (role === "EMPLOYER") && (status === "")
                                ?
                                <Button className="mt-2 mb-3" onClick={() => {
                                    setShow(true)
                                    setModalId(res?.ID)
                                }}>Откликнуться на резюме</Button>
                                :
                                (status !== "") &&
                                <div className="gap-1">
                                    <GetStatus status={status}/>
                                </div>
                        }
                        <UserInfo user={appl}/>
                        {
                            (token !== "") && (myprof) ?
                                <Link to={`/prof`}>Подробнее о соискателе...</Link>
                                :
                                <Link to={`/user/${appl?.ID}`}>Подробнее о соискателе...</Link>
                        }
                    </div>
                </div>
            )}
        </>
    )
}