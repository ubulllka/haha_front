import {ListAllVac} from "../components/vacancies/ListAllVac";
import {ListAllRes} from "../components/resumes/ListAllRes";


const ListBlock = ({type}) => {
    switch (type) {
        case "allVac":
            return (<ListAllVac/>)
        case "allRes":
            return (<ListAllRes/>)
        default:
            break;
    }
}

export const ListPage = ({type}) => {
    return (
        <>
            <ListBlock type={type}/>
        </>
    )
}


