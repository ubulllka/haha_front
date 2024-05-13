import Accordion from "react-bootstrap/Accordion";
import {WorkCard} from "./WorkCard";
import {useEffect, useState} from "react";
import {getResume, getResumeAnon, getResumesWorkListAnon} from "../../services/ResumeService";
import {getUser, isUser} from "../../services/UserService";

export const WorkProfile = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [listWork, setListWork] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const resListWork = await getResumesWorkListAnon(id)
            setListWork(resListWork)
            setIsLoading(false);
        };
        fetchData();
    }, [id]);
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Опыт работы</Accordion.Header>
                <Accordion.Body>
                    {
                        (isLoading) ? <p>Loading...</p> :
                            <ul className="list-unstyled">
                                {
                                    (listWork && listWork?.length) ?
                                        listWork.map((item) => (
                                            <li key={item?.id}>
                                                <WorkCard item={item}/>
                                            </li>
                                        )) : <li>Список пуст ;-(</li>
                                }
                            </ul>
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}