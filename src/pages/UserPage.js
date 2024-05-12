import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getList, getListPag, getUser} from "../services/UserService";
import {useSelector} from "react-redux";
import {ResCard} from "../components/resumes/ResCard";
import {VacCard} from "../components/vacancies/VacCard";
import {PagBlock} from "../components/Pag";
import {ModalBlock} from "../components/modal/ModalBlock";
import {UserInfo} from "../components/user/UserInfo";


const GetModalBlock = ({role, list, show, setShow, modalId}) => {
    return (
        (role === "EMPLOYER") ?
            <ModalBlock
                list={list}
                show={show}
                setShow={setShow}
                modalId={modalId}
                head={"Отклик на резюме"}
                head1={"Выберите вакансию, которую хотите отправить соискателю"}
                not={"У вас нет еще ни одной вакансии ;-(. Но вы легко можете её создать в своём профиле!"}
            />
            :
            (role === "APPLICANT") &&
            <ModalBlock
                list={list}
                show={show}
                setShow={setShow}
                modalId={modalId}
                head={"Отклик на вакансию"}
                head1={"Выберите резюме, которое хотите отправить работодателю"}
                not={"У вас нет еще ни одного резюме ;-(. Но вы легко можете его создать в своём профиле!"}
            />
    )
}
export const UserPage = () => {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [isLoadList, setIsLoadList] = useState(true)
    const [show, setShow] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [isLoadListMod, setIsLoadListMod] = useState(true)
    const [listMod, setListMod] = useState(null)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoadListMod(true);
            const result = await getList(token)
            setListMod(result)
            setIsLoadListMod(false);
        };
        fetchData();
    }, [token])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoding(true);
            const result = await getUser(id)
            setUser(result)
            setIsLoding(false);
        };
        fetchData();
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadList(true);
            const result = await getListPag(id, page)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoadList(false);
        };
        fetchData();
    }, [page, id])
    return (
        <>
            {
                (!isLoadListMod) &&
                <GetModalBlock role={role} list={listMod} show={show} setShow={setShow} modalId={modalId}/>
            }
            {(isLoading) ?
                <p>Loading...</p>
                :
                <div className="row">
                    <UserInfo user={user}/>
                </div>
            }
            {(isLoadList) ?
                <p>Loading...</p>
                :
                <>
                    {
                        (user?.role === "APPLICANT") ?
                            <h4 className="mt-2">Резюме</h4>
                            :
                            <h4 className="mt-2">Вакансии</h4>
                    }
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        {
                                            (user?.role === "APPLICANT") ?
                                                <ResCard res={item} setShow={setShow} setModalId={setModalId} prof={false}/>
                                                :
                                                <VacCard vac={item} setShow={setShow} setModalId={setModalId} prof={false}/>
                                        }

                                    </li>
                                ))

                                :
                                <li>Список пуст ;-(</li>
                        }
                    </ul>
                </>
            }
            {
                (!isLoading && list && list?.length) ?
                    <PagBlock pag={pagination} setPage={setPage}/>
                    : ""
            }
        </>
    )
}
