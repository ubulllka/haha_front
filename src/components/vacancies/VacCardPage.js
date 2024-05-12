import {useEffect, useState} from "react";
import {getList, getUser, isUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getVacancy, getVacancyAnon} from "../../services/VacancyService";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {UserInfo} from "../user/UserInfo";
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
            const vacRes = (role === "APPLICANT")
                ? await getVacancy(id, token)
                : await getVacancyAnon(id)

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

    }, [id, token, role]);

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
    }, [role, token])

    useEffect(() => {
        console.log(vac)
    }, [vac])

    return (
        <>
            {
                (!isLoadListRes && role === "APPLICANT") &&
                <ModalBlockRole list={listRes} show={show} setShow={setShow} modalId={modalId}/>
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
                            (role === "APPLICANT") && (vac?.status === "")
                                ?
                                <Button className="mt-2 mb-3" onClick={() => {
                                    setShow(true)
                                    setModalId(vac?.ID)
                                }}>Откликнуться на вакансию</Button>
                                :
                                (vac?.status !== "") &&
                                <div className="gap-1">
                                    <GetStatus status={vac?.status}/>
                                </div>
                        }
                        <UserInfo user={empl}/>
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