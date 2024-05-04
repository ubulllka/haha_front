import {defer, useLoaderData, Await, useAsyncValue} from "react-router-dom"
import {Suspense} from "react"
import {useSelector} from "react-redux";
import {ListAllVac} from "../components/vacancies/ListAllVac";
import {getAllVacancies} from "../services/VacancyService";


function returnList(type, list, user) {
    switch (type) {
        case "allVac":
            return (<ListAllVac list={list}/>)
        case "res":
            // return (<ListOffice list={list}/>)
        default:
            break;
    }
}

const ListBlock = ({type}) => {
    const list = useAsyncValue();
    const user = useSelector((state) => state.user)
    return (
        <>
            {
                (list && list?.length)
                    ?
                    returnList(type, list, user)
                    :
                    <p>Список пуст</p>
            }
        </>
    )
}

export const ListPage = ({type}) => {
    const {list} = useLoaderData()
    return (
        <>
            <Suspense fallback={<h3>Loading...</h3>}>
                <Await resolve={list}>
                    <ListBlock type={type}/>
                </Await>
            </Suspense>

        </>
    )
}


export const listAllVacLoader = async () => {
    return defer({
        list: getAllVacancies()
    })
}
