import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useEffect, useState} from "react";
import {getMyListPag} from "../../services/UserService";
import {PagBlock} from "../Pag";
import {ResCard} from "../resumes/ResCard";
import {VacCard} from "../vacancies/VacCard";
import {useSelector} from "react-redux";
import {FilterTab} from "./FilterTab";
import {getMyAllResponds, getOtherAllResponds} from "../../services/RespondService";

export const UserTabs = ({id}) => {
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)

    const getTitle = () => {
        return (role === "APPLICANT") ?
            "Мои резюме" : "Мои вакансии"
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoding(true);
            const result = await getMyListPag(token, page)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoding(false);
        };
        fetchData();
    }, [page, token])
    return (
        <Tabs
            defaultActiveKey="mylist"
            className="mb-3 mt-3"
        >
            <Tab eventKey="mylist" title={getTitle()}>
                {(isLoading) ?
                    <p>Loading...</p>
                    :

                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        {
                                            (role === "APPLICANT") ?
                                                <ResCard res={item} prof={true} close={true}/>
                                                :
                                                <VacCard vac={item} prof={true} close={true} />
                                        }

                                    </li>
                                ))

                                :
                                <li>Список пуст ;-(</li>
                        }
                    </ul>
                }

                {
                    (!isLoading && list && list?.length) ?
                        <PagBlock pag={pagination} setPage={setPage}/>
                        : ""
                }
            </Tab>
            <Tab eventKey="myrespond" title="Мои отклики">
                <FilterTab type={"my"} funcForGetData={getMyAllResponds}/>
            </Tab>
            <Tab eventKey="otherrespond" title="Отклики мне">
                <FilterTab type={"other"} funcForGetData={getOtherAllResponds}/>
            </Tab>
        </Tabs>
    )
}