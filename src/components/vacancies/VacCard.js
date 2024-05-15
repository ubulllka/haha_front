import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {dateCard} from "../dateParse";

const GetStatus = ({status}) => {
    const map = new Map();
    map.set("WAIT", {text: "Ожидание", st: "text-secondary"})
    map.set("ACCEPT", {text: "Принято", st: "text-success"})
    map.set("DECLINE", {text: "Отклонено", st: "text-danger"})

    const item = map.get(status)
    return (
        (item) &&
        <Card.Text className={item.st}>Cтатус: {item.text}</Card.Text>
    )
}

export const VacCard = ({vac, setVac, setShow, setIsCreate, setShowDel, setModalId, setItem, prof}) => {
    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{vac?.post}</Card.Title>
                <Card.Text>
                    {vac?.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between gap-2">
                <Card.Link href={`/vac/${vac?.ID}`}>
                    Подробнее...
                </Card.Link>
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                    {
                        (role === "APPLICANT") && (vac?.status === "")
                            ?
                            <Button className="p-0 ps-1 pe-1" onClick={() => {
                                setShow(true)
                                setModalId(vac?.ID)
                            }}>Откликнуться</Button>
                            :
                            (vac?.status !== "") &&
                            <div className="gap-1">
                                <GetStatus status={vac?.status}/>
                            </div>
                    }
                    {
                        (prof) &&
                        <>
                            <Button variant={"warning"} className="p-0 ps-1 pe-1"
                                    onClick={() => {
                                        setIsCreate(false)
                                        setVac({
                                            id: vac?.ID,
                                            post: vac?.post,
                                            description: vac?.description,
                                        })
                                        setShow(true)
                                    }}
                            >Редактировать</Button>
                            <Button variant={"danger"} className="p-0 ps-1 pe-1"
                                    onClick={async () => {
                                        setShowDel(true)
                                        setItem({
                                            id: vac?.ID,
                                            post: vac?.post,
                                        })
                                    }}
                            >Удалить</Button>
                        </>
                    }
                    <p className="mb-0">{dateCard(vac?.CreatedAt)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}