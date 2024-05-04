import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import { parse } from 'date-fns';

export const VacCard = ({vac}) => {

    const role = useSelector((state) => state.user.role)
    let str = new Date(vac?.CreatedAt)
    console.log(str)
    return (
        <Card>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    <p>{vac?.post}</p>
                    <p>{vac?.description}</p>
                    <p>{str}</p>
                </Card.Text>
                <Card.Link href={`/teachers/${vac.ID}`}>

                </Card.Link>
                {/*{*/}
                {/*    (role !== "ANON") && <Button variant="primary"></Button>*/}
                {/*}*/}
            </Card.Body>
        </Card>
    )
}