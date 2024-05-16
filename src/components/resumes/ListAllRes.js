import {useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import ResumeService from "../../services/ResumeService";
import {PagBlock} from "../Pag";
import UserService from "../../services/UserService";
import {ResCard} from "./ResCard";
import {ModalBlockRole} from "../modal/ModalBlockRole";


export const ListAllRes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState(null)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [isLoadListVac, setIsLoadListVac] = useState(true)
    const [listVac, setListVac] = useState(null)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadListVac(true);
            if (role === "EMPLOYER") {
                const result = await UserService.getList(token)
                setListVac(result)
            }
            setIsLoadListVac(false);
        };
        fetchData();
    }, [role, token])

    const fetchDataResList = async () => {
        setIsLoading(true);
        const result = (role === "EMPLOYER")
            ? await ResumeService.searchResumes(page, search, token)
            : await ResumeService.searchResumesAnon(page, search)
        setList(result?.list)
        setPagination(result?.pag)
        setIsLoading(false);
    };
    useEffect(() => {
        fetchDataResList();
    }, [search, page, role, token]);



    return (
        <>
            {
                (!isLoadListVac && role === "EMPLOYER") &&
                <ModalBlockRole list={listVac} show={show} setShow={setShow} modalId={modalId}
                                fetchDataList={fetchDataResList}/>
            }

            <h2 className="mb-2">Резюме</h2>
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
                            list.map(res => (
                                <li key={res?.ID} className="mb-3">
                                    <ResCard res={res} setShow={setShow} setModalId={setModalId} prof={false}/>
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