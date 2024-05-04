import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const getDateStr = (createdAt) => {
    let date = new Date(createdAt)
    const [day, month, year] = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
    ];
    let str = ""
    str += (day < 10) ? "0" + day : day
    str += "."
    str += (month < 10) ? "0" + month : month
    str += "." + year
    return str
}
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
                <p className="mb-0">{getDateStr(vac?.CreatedAt)}</p>
            </Card.Footer>
        </Card>
    )
}

export const ListAllVac = ({list}) => {
    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            <ul className="list-unstyled">
                {
                    list.map(vac => (
                        <li key={vac?.ID} className="mb-3">
                            <VacCard vac={vac}/>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}