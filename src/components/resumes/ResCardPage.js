import {useEffect, useState} from "react";
import {getList, getUser, isUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getResume, getResumeAnon} from "../../services/ResumeService";
import {useSelector} from "react-redux";
import {UserInfo} from "../user/UserInfo";
import Button from "react-bootstrap/Button";
import {ModalBlockRole} from "../modal/ModalBlockRole";


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

    //Получение резюме, данных о соискателе, сравнение token с id
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const resRes = (role === "EMPLOYER")
                ? await getResume(id, token)
                : await getResumeAnon(id)
            setRes(resRes)
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


    useEffect(() => {
        const fetchData = async () => {
            setIsLoadListRes(true);
            if (role === "EMPLOYER") {
                const result = await getList(token)
                setListRes(result)
            }
            setIsLoadListRes(false);
        };
        fetchData();
    }, [role, token])

    return (
        <>
            {
                (!isLoadListRes && role === "EMPLOYER") &&
                <ModalBlockRole list={listRes} show={show} setShow={setShow} modalId={modalId}/>
            }
            <h2>Резюме</h2>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <h3 className="mb-2">{res?.post}</h3>
                        <p className="mb-1">{res?.description}</p>
                    </div>
                    <div className="col-lg-4">
                        {
                            (role === "EMPLOYER") && (res?.status === "")
                                ?
                                <Button className="mt-2 mb-3" onClick={() => {
                                    setShow(true)
                                    setModalId(res?.ID)
                                }}>Откликнуться на резюме</Button>
                                :
                                (res?.status !== "") &&
                                <div className="gap-1">
                                    <GetStatus status={res?.status}/>
                                </div>
                        }
                        <UserInfo user={appl}/>
                        {
                            (myprof) ?
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