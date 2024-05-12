import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getDateStr} from "../getDataStr";

const GetStatus = ({status}) => {
    switch (status) {
        case "WAIT":
            return (
                <>
                    <Card.Text className="text-secondary d-inline-block me-2">Cтатус: Ожидание</Card.Text>
                    <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                </>
            )
        case "ACCEPT":
            return (
                <>
                    <Card.Text className="text-success d-inline-block me-2">Cтатус: Принято</Card.Text>
                    <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                </>
            )
        case "DECLINE":
            return (
                <>
                    <Card.Text className="text-danger d-inline-block me-2">Cтатус: Отклонено</Card.Text>
                    <Button variant={"danger"} className="btn-danger p-0 ps-1 pe-1">Удалить</Button>
                </>

            )
    }
}

export const ResCard = ({res, setShow, setModalId, prof}) => {
    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{res?.post}</Card.Title>
                <Card.Text>
                    {res?.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between gap-2">
                <Card.Link href={`/res/${res?.ID}`}>
                    Подробнее...
                </Card.Link>
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                    {
                        (role === "EMPLOYER") && (res?.status === "")
                            ?
                            <Button className="p-0 ps-1 pe-1" onClick={() => {
                                setShow(true)
                                setModalId(res?.ID)
                            }}>Откликнуться</Button>
                            :
                            (res?.status !== "") &&
                            <div className="gap-1">
                                <GetStatus status={res?.status}/>
                            </div>
                    }
                    {
                        (prof) &&
                        <>
                            <Button variant={"warning"} className="p-0 ps-1 pe-1">Редактировать</Button>
                            <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                        </>
                    }
                    <p className="mb-0">{getDateStr(res?.CreatedAt)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}