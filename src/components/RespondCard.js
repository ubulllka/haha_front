import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import {getDateStr} from "./getDataStr";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {createRespond, updateRespond} from "../services/RespondService";


const GetFooter = ({type, status, id}) => {
    const token = useSelector((state) => state.user.token)
    if (type === "my") {
        switch (status) {
            case "WAIT":
                return (
                    <>
                        <Card.Text className="text-secondary">Cтатус: Ожидание</Card.Text>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                    </>
                )
            case "ACCEPT":
                return (
                    <>
                        <Card.Text className="text-success">Cтатус: Принято</Card.Text>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                    </>
                )
            case "DECLINE":
                return (
                    <>
                        <Card.Text className="text-danger">Cтатус: Отклонено</Card.Text>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                    </>

                )
            default:
                return
        }
    } else {
        switch (status) {
            case "WAIT":
                const handleSubmit = async (id, status) => {
                    const res = await updateRespond({id: id, status:status}, token)
                    if (res?.status === "ok" ) {
                        alert("Ваше изменение сохранено!")
                    } else {
                        alert("Ваше изменение не сохранено ;-(")
                    }
                }
                return (
                    <div className="d-flex gap-2">
                        <Button variant={"success"} className="p-0 ps-1 pe-1"
                                onClick={() => {
                                    handleSubmit(id,"ACCEPT")
                                }}
                        >Принять</Button>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1"
                                onClick={() => {
                                    handleSubmit(id,"DECLINE")
                                }}
                        >Отклонить</Button>
                    </div>
                )
            case "ACCEPT":
                return (
                    <>
                        <Card.Text className="text-success">Cтатус: Принято</Card.Text>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                    </>
                )
            case "DECLINE":
                return (
                    <>
                        <Card.Text className="text-danger">Cтатус: Отклонено</Card.Text>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                    </>

                )
            default:
                return
        }
    }
}

export const RespondCard = ({item, type}) => {
    const getLettter = () => {
        return item?.letter.replace(/\n/g, "<br>")
    }

    const addRemoveActive = (event) => {
        event.target.classList.toggle("active");
    }
    const [itemRespond, setItemRespond] = useState(item)
    const [flagItem, setFlagItem] = useState(false)

    useEffect(() => {

    })

    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{item?.post}</Card.Title>
                <Card.Text>
                    {item?.description}
                </Card.Text>
                <Card.Subtitle className="mb-1">
                    Сопроводительное письмо
                </Card.Subtitle>
                <Card.Text className={`respond-letter respond-letter-${item?.id}`}
                           dangerouslySetInnerHTML={{__html: getLettter()}}
                           onClick={(e) => addRemoveActive(e)}/>

                <GetFooter status={item?.status} type={type} id={item?.id}/>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between gap-2">
                <Card.Link href=
                               {
                                   (role === "EMPLOYER")
                                       ? `/res/${item?.resume_id}`
                                       : `/vac/${item?.vacancy_id}`
                               }
                >
                    Подробнее...
                </Card.Link>
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                    <p className="mb-0">Последнее обновление: {getDateStr(item?.updated_at)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}
