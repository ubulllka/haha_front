import {Suspense} from 'react'
import {Await, defer, useLoaderData} from "react-router-dom";
import {getVacancy} from "../services/VacancyService";
import {getResume} from "../services/ResumeService";
import {VacCard} from "../components/vacancies/VacCard";
import {ResCard} from "../components/resumes/ResCard";

function returnCard(type) {
    switch (type) {
        case "vac":
            return (<VacCard/>)
        case "res":
            return (<ResCard/>)
        default:
            break;
    }
}

export const CardPage = ({type}) => {
    const {id, card} = useLoaderData()
    // const navigate = useNavigate()
    // const user = useSelector((state) => state.user)
    return (
        <Suspense fallback={<h2 style={{marginTop: 10 + "px"}}>Loading...</h2>}>
            <Await resolve={card}>
                {
                    returnCard(type, card)
                }
            </Await>
        </Suspense>
    );
}

export const vacancyLoader = async ({params}) => {
    const id = params.id;
    return defer({
        id: id,
        card: getVacancy(id)
    })
}

export const resumeLoader = async ({params}) => {
    const id = params.id;
    return defer({
        id: id,
        card: getResume(id)
    })
}