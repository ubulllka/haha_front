import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {searchResumes} from "../../services/ResumeService";
import {getDateStr} from "../getDataStr";
import {PagBlock} from "../Pag";
import {ModalBlock} from "../ModalBlock";


const ResCard = ({res, setShow, setMainId}) => {
    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{res?.post}</Card.Title>
                <Card.Text>
                    {res?.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between">
                <Card.Link href={`/res/${res?.ID}`}>
                    Подробнее...
                </Card.Link>
                <Button onClick={() => {
                        setShow(true)
                        setMainId(res?.ID)
                }}>Откликнуться</Button>
                <p className="mb-0">{getDateStr(res?.CreatedAt)}</p>
            </Card.Footer>
        </Card>
    )
}

export const ListAllRes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState(null)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [mainID, setMainID] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await searchResumes(page, search)
            setList(result?.res)
            setPagination(result?.pag)
            setIsLoading(false);
        };
        fetchData();
    }, [search, page]);
    return (
        <>
            <ModalBlock show={show} setShow={setShow} mainID={mainID}/>
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
                                    <ResCard res={res} setShow={setShow} setMainId={setMainID}/>
                                </li>
                            ))

                            :
                            <li>Список пуст ;-(</li>
                    }
                </ul>
            )}
            {
                (!isLoading && list && list?.length) &&
                <PagBlock pag={pagination} setPage={setPage}/>
            }
        </>
    )
}