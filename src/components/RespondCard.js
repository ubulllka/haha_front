import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import {dateCard} from "./dateParse";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import RespondService from "../services/RespondService";


const GetFooter = ({type, itemRespond, setItemRespond, fetchDataRespondList}) => {
    const token = useSelector((state) => state.user.token)

    const handleSubmitDelete = async (id) => {
        const res = (type === "my")
            ? await RespondService.deleteMyRespond(id, token)
            : await RespondService.deleteOtherRespond(id, token)
        if (res?.status === "ok") {
            fetchDataRespondList()
        }
        console.log("deleted: ", res?.status)
    }

    if ((type === "other") && (itemRespond?.status === "WAIT")) {
        const handleSubmitUpdate = async (id, status) => {
            const res = await RespondService.updateRespond({id: id, status: status}, token)
            if (res?.status === "ok") {
                setItemRespond({...itemRespond, status: status})
            }
            console.log("update: ", res?.status)
        }
        return (
            <div className="d-flex gap-2">
                <Button variant={"success"} className="p-0 ps-1 pe-1"
                        onClick={async () => {
                            await handleSubmitUpdate(itemRespond?.id, "ACCEPT")
                        }}
                >Принять</Button>
                <Button variant={"danger"} className="p-0 ps-1 pe-1"
                        onClick={async () => {
                            await handleSubmitUpdate(itemRespond?.id, "DECLINE")
                        }}
                >Отклонить</Button>
            </div>
        )
    } else {
        const map = new Map();
        map.set("WAIT", {text: "Ожидание", class: "text-secondary"})
        map.set("ACCEPT", {text: "Принято", class: "text-success"})
        map.set("DECLINE", {text: "Отклонено", class: "text-danger"})

        return (
            <>
                <Card.Text
                    className={map.get(itemRespond.status).class}>Cтатус: {map.get(itemRespond.status).text}</Card.Text>
                <Button variant={"danger"} className="p-0 ps-1 pe-1"
                        onClick={() => handleSubmitDelete(itemRespond?.id)}
                >Удалить</Button>
            </>
        )
    }


}

export const RespondCard = ({item, type, fetchDataRespondList}) => {

    const addRemoveActive = (event) => {
        event.target.classList.toggle("active");
    }
    const [itemRespond, setItemRespond] = useState(item)

    const getLettter = () => {
        return itemRespond?.letter.replace(/\n/g, "<br>")
    }

    const role = useSelector((state) => state.user.role)
    return (
        <Card>
            <Card.Body>
                <Card.Title>{itemRespond?.post}</Card.Title>
                <Card.Text>
                    {itemRespond?.description}
                </Card.Text>
                <Card.Subtitle className="mb-1">
                    Сопроводительное письмо
                </Card.Subtitle>
                <Card.Text className={`respond-letter respond-letter-${itemRespond?.id}`}
                           dangerouslySetInnerHTML={{__html: getLettter()}}
                           onClick={(e) => addRemoveActive(e)}/>
                <Card.Subtitle className="mb-1">
                    {
                        (role === "EMPLOYER")
                            ? <span className="me-1">Вакансия:</span>
                            : <span className="me-1">Резюме:</span>
                    }
                </Card.Subtitle>
                <Card.Text>{itemRespond?.other_post}</Card.Text>

                <GetFooter type={type} itemRespond={itemRespond} setItemRespond={setItemRespond}
                           fetchDataRespondList={fetchDataRespondList}/>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between gap-2">
                <Card.Link href=
                               {
                                   (role === "EMPLOYER")
                                       ? `/res/${itemRespond?.resume_id}`
                                       : `/vac/${itemRespond?.vacancy_id}`
                               }
                >
                    Подробнее...
                </Card.Link>
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                    <p className="mb-0">Последнее обновление: {dateCard(itemRespond?.updated_at)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}
