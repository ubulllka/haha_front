import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import {getDateStr} from "./getDataStr";
import Button from "react-bootstrap/Button";


const GetFooter = ({type, status}) => {
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
        }
    } else {
        switch (status) {
            case "WAIT":
                return (
                    <div className="d-flex gap-2">
                        <Button variant={"success"} className="p-0 ps-1 pe-1">Принять</Button>
                        <Button variant={"danger"} className="p-0 ps-1 pe-1">Отклонить</Button>
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

                <GetFooter status={item?.status} type={type} />
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
