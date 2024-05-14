import {ResCard} from "./ResCard";
import {PagBlock} from "../Pag";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMyListPag} from "../../services/UserService";

export const ResProfile = () => {
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoding(true);
            const result = await getMyListPag(token, page)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoding(false);
        };
        fetchData();
    }, [page, token])
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :

                <ul className="list-unstyled">
                    {
                        (list && list?.length)
                            ?
                            list.map(item => (
                                <li key={item?.ID} className="mb-3">
                                    <ResCard res={item} prof={true}/>
                                </li>
                            ))

                            :
                            <li>Список пуст ;-(</li>
                    }
                </ul>
            }

            {
                (!isLoading && list && list?.length) ?
                    <PagBlock pag={pagination} setPage={setPage}/>
                    : ""
            }
        </>
    )
}