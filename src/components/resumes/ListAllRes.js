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
const ResCard = ({res}) => {
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
                <p className="mb-0">{getDateStr(res?.CreatedAt)}</p>
            </Card.Footer>
        </Card>
    )
}

export const ListAllRes = ({list}) => {
    return (
        <>
            <h2 className="mb-2">Резюме</h2>
            <InputGroup className="mb-3">
                <Form.Control className="form-control--search"/>
                <Button variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            <ul className="list-unstyled">
                {
                    list.map(res => (
                        <li key={res?.ID} className="mb-3">
                            <ResCard res={res}/>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}