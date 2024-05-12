import {useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {PagBlock} from "../Pag";
import {getList} from "../../services/UserService";
import {searchVacancies} from "../../services/VacancyService";
import {VacCard} from "./VacCard";
import {ModalBlockRole} from "../modal/ModalBlockRole";

export const ListAllVac = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState(null)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [isLoadListRes, setIsLoadListRes] = useState(true)
    const [listRes, setListRes] = useState(null)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)

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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await searchVacancies(page, search)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoading(false);
        };
        fetchData();
    }, [search, page]);

    return (
        <>
            {
                (!isLoadListRes && role === "APPLICANT") &&
                <ModalBlockRole list={listRes} show={show} setShow={setShow} modalId={modalId} />
            }

            <h2 className="mb-2">Вакансии</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    className="form-control--search"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => setSearch(query)}
                >
                    Найти
                </Button>
            </InputGroup>

            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <ul className="list-unstyled">
                    {
                        (list && list?.length)
                            ?
                            list.map(vac => (
                                <li key={vac?.ID} className="mb-3">
                                    <VacCard vac={vac} setShow={setShow} setModalId={setModalId}/>
                                </li>
                            ))

                            :
                            <li>Список пуст ;-(</li>
                    }
                </ul>
            )}
            {
                (!isLoading && list && list?.length) ?
                    <PagBlock pag={pagination} setPage={setPage}/>
                    : ""
            }
        </>
    )
}