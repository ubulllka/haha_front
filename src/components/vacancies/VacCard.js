import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getDateStr} from "../getDataStr";

export const VacCard = ({vac, setShow, setModalId}) => {
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
                <div className="d-flex gap-2">
                    {
                        (role === "APPLICANT") &&
                        <Button className="p-0 ps-1 pe-1" onClick={() => {
                            setShow(true)
                            setModalId(vac?.ID)
                        }}>Откликнуться</Button>
                    }
                    <p className="mb-0">{getDateStr(vac?.CreatedAt)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}