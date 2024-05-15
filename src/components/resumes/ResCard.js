import {useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {dateCard} from "../dateParse";
import {WorkProfile} from "../work/WorkProfile";
import {useEffect, useState} from "react";
import {getResumesWorkListAnon} from "../../services/ResumeService";

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

export const ResCard = ({res, setRes, setShow, setIsCreate, setShowDel, setModalId, setItem, prof}) => {
    const role = useSelector((state) => state.user.role)
    const [isLoading, setIsLoading] = useState(true)
    const [listWork, setListWork] = useState(null)

    const fetchData = async () => {
        setIsLoading(true);
        const resListWork = await getResumesWorkListAnon(res?.ID)
        setListWork(resListWork)
        setIsLoading(false);
    };
    useEffect(() => {
        if (prof) {
            fetchData();
        }
    }, []);
    return (
        <Card>
            <Card.Body>
                <Card.Title>{res?.post}</Card.Title>
                <Card.Text>
                    {res?.description}
                </Card.Text>
                {
                    (prof) &&
                    (!isLoading) ? <WorkProfile list={listWork}/> : ""

                }
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
                            <Button variant={"warning"} className="p-0 ps-1 pe-1"
                                    onClick={() => {
                                        setIsCreate(false)
                                        setShow(true)
                                        setRes({
                                            id: res?.ID,
                                            post: res?.post,
                                            description: res?.description,
                                            old_work: listWork.map((work, i) => ({
                                                index: i,
                                                id: work?.ID,
                                                post: work?.post,
                                                description: work?.description,
                                                start_time: work?.start_time,
                                                end_time: work?.end_time
                                            }))
                                        })
                                    }}
                            >Редактировать</Button>
                            <Button variant={"danger"} className="p-0 ps-1 pe-1">Удалить</Button>
                        </>
                    }
                    <p className="mb-0">{dateCard(res?.CreatedAt)}</p>
                </div>
            </Card.Footer>
        </Card>
    )
}