import {defer, useLoaderData} from "react-router-dom";
import {VacCardPage} from "../components/vacancies/VacCardPage";
import {ResCardPage} from "../components/resumes/ResCardPage";

function returnCard(type, id) {
    switch (type) {
        case "vac":
            return (<VacCardPage id={id}/>)
        case "res":
            return (<ResCardPage id={id}/>)
        default:
            break;
    }
}

export const CardPage = ({type}) => {
    const {id} = useLoaderData()
    return (returnCard(type, id));
}

export const vacancyLoader = async ({params}) => {
    const id = params.id;
    return defer({
        id: id,
    })
}

export const resumeLoader = async ({params}) => {
    const id = params.id;
    return defer({
        id: id,
    })
}