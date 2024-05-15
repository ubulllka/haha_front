import Accordion from "react-bootstrap/Accordion";
import {WorkCard} from "./WorkCard";

export const WorkProfile = ({list}) => {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Опыт работы</Accordion.Header>
                <Accordion.Body>
                    <ul className="list-unstyled">
                        {
                            (list && list?.length) ?
                                list.map((item) => (
                                    <li key={item?.ID}>
                                        <WorkCard item={item}/>
                                    </li>
                                )) : <li>Список пуст ;-(</li>
                        }
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}