import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getDateStr} from "../getDataStr";

export const ResCard = ({res, setShow, setModalId}) => {
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
                <div className="d-flex gap-2">
                    {
                        (role === "EMPLOYER") &&
                        <Button className="p-0 ps-1 pe-1" onClick={() => {
                            setShow(true)
                            setModalId(res?.ID)
                        }}>Откликнуться</Button>
                    }
                    <p className="mb-0">{getDateStr(res?.CreatedAt)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}