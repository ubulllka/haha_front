import Card from "react-bootstrap/Card";
import {dateCard} from "../dateParse";

const GetData = ({start, end}) => {
    return (
        <Card.Text>
            {dateCard(start)}
            <span className="ms-1 me-1"> - </span>
            {
                (new Date(end).getFullYear() !== 1)
                    ? dateCard(end)
                    : <span>по настоящее время</span>
            }
        </Card.Text>
    )
}

export const WorkCard = ({item}) => {
    return(
        <Card.Body className="form-control p-2 mb-2">
            <Card.Title>{item?.post}</Card.Title>
            <Card.Text className="mb-1">
                {item?.description}
            </Card.Text>
            <GetData start={item?.start_time} end={item.end_time}/>
        </Card.Body>
    )
}