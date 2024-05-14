import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMyListPag} from "../../services/UserService";
import {PagBlock} from "../Pag";
import {VacCard} from "./VacCard";
import {ModalVac} from "../modal/ModalVac";

export const VacProfile = ({listChanged}) => {
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)
    const [vac, setVac] = useState({
        id: "",
        post: "",
        description: ""
    })
    const [showVac, setShowVac] = useState(false)


    useEffect(() => {
        const fetchData = async (setIsLoding) => {
            setIsLoding(true);
            const result = await getMyListPag(token, page)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoding(false);
            console.log("apds")
        };
        fetchData();
    }, [listChanged, page, token])
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <ModalVac oldVac={vac} show={showVac} setShow={setShowVac} isCreate={false}
                              />
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        <VacCard vac={item} prof={true} setShowUpdate={setShowVac} setVac={setVac}/>
                                    </li>
                                ))

                                :
                                <li>Список пуст ;-(</li>
                        }
                    </ul>
                </>
            }

            {
                (!isLoading && list && list?.length) ?
                    <PagBlock pag={pagination} setPage={setPage}/>
                    : ""
            }
        </>
    )
}