import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {searchVacancies} from "../../services/VacancyService";
import {PagBlock} from "../Pag";
import {getDateStr} from "../getDataStr";


const VacCard = ({vac}) => {
    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{vac?.post}</Card.Title>
                <Card.Text>
                    {vac?.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between">
                <Card.Link href={`/vac/${vac?.ID}`}>
                    Подробнее...
                </Card.Link>
                <p className="mb-0">{getDateStr(vac?.CreatedAt)} </p>
            </Card.Footer>
        </Card>
    )
}

export const ListAllVac = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [list, setList] = useState(null);
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await searchVacancies(page, search)
            setList(result?.vac)
            setPagination(result?.pag)
            setIsLoading(false)
        };
        fetchData();
    }, [search, page]);
    return (
        <>
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
                                    <VacCard vac={vac}/>
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