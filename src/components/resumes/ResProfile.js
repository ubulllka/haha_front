import {ResCard} from "./ResCard";
import {PagBlock} from "../Pag";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMyListPag} from "../../services/UserService";
import Button from "react-bootstrap/Button";
import {ModalRes} from "../modal/ModalRes";

export const ResProfile = () => {
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const role = useSelector((state) => state.user.role)

    const token = useSelector((state) => state.user.token)
    const [res, setRes] = useState({
        id: "",
        post: "",
        description: "",
        old_work: [{
            index: 0,
            id: "",
            post: "",
            description: "",
            start_time: "",
            end_time: "",
        }]
    })
    const [showRes, setShowRes] = useState(false)
    const [isCreate, setIsCreate] = useState(false)

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
                <>
                    <ModalRes show={showRes} setShow={setShowRes} isCreate={isCreate} oldRes={res} setOldRes={setRes}     />
                    <Button className="mb-2" variant={"success"}
                            onClick={() => {
                                setIsCreate(true)
                                setShowRes(true)
                            }}
                    >Добавить резюме</Button>
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        <ResCard res={item} setRes={setRes} setShow={setShowRes} setIsCreate={setIsCreate} prof={true} />
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