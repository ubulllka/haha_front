import {useEffect, useState} from "react";
import {getList, getUser, isUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getResume} from "../../services/ResumeService";
import {useSelector} from "react-redux";
import {UserInfo} from "../user/UserInfo";
import {ModalBlock} from "../modal/ModalBlock";
import Button from "react-bootstrap/Button";
import {ModalBlockRole} from "../modal/ModalBlockRole";

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
            const resRes = await getResume(id)
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
    }, []);

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
    }, [])

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
                            (role === "EMPLOYER") &&
                            <Button className="mt-2 mb-3" onClick={() => {
                                setShow(true)
                                setModalId(res?.ID)
                            }}>Откликнуться на резюме</Button>
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