import {useEffect, useState} from "react";
import {getList, getUser, isUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getVacancy} from "../../services/VacancyService";
import {ModalBlock} from "../modal/ModalBlock";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {UserInfo} from "../user/UserInfo";
import {ModalBlockRole} from "../modal/ModalBlockRole";

export const VacCardPage = ({id}) => {
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)
    const [vac, setVac] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [empl, setEmpl] = useState(null);
    const [myprof, setMyprof] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const vacRes = await getVacancy(id)
            setVac(vacRes)
            const result = await getUser(vacRes?.employer_id);
            setEmpl(result);
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
            if (role === "APPLICANT") {
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
                (!isLoadListRes && role === "APPLICANT") &&
                <ModalBlockRole list={listRes} show={show} setShow={setShow} modalId={modalId} />
            }
            <h2>Вакансия</h2>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <h3 className="mb-2">{vac?.post}</h3>
                        <p className="mb-1">{vac?.description}</p>

                    </div>
                    <div className="col-lg-4">
                        {
                            (role === "APPLICANT") &&
                            <Button className="mt-2 mb-3" onClick={() => {
                                setShow(true)
                                setModalId(vac?.ID)
                            }}>Откликнуться на вакансию</Button>
                        }
                        <UserInfo user={empl} />
                        {
                            (myprof) ?
                                <Link to={`/prof`}>Подробнее о работодателе...</Link>
                                :
                                <Link to={`/user/${empl?.ID}`}>Подробнее о работодателе...</Link>
                        }

                    </div>
                </div>
            )}
        </>
    )
}