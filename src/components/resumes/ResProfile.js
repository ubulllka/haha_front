import {ResCard} from "./ResCard";
import {PagBlock} from "../Pag";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import Button from "react-bootstrap/Button";
import {ModalRes} from "../modal/ModalRes";
import {ModalDelete} from "../modal/ModalDelete";

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
        old_works: [{
            work_id: 0,
            post: "",
            description: "",
            start_time: null,
            end_time: null,
        }]
    })
    const [showRes, setShowRes] = useState(false)
    const [isCreate, setIsCreate] = useState(false)

    const [showDel, setShowDel] = useState(false)
    const [item, setItem] = useState({
        id: "",
        post: "",
    })
    const fetchDataRes = async () => {
        setIsLoding(true);
        const result = await UserService.getMyListPag(token, page)
        setList(result?.list)
        setPagination(result?.pag)
        setIsLoding(false);

    };

    useEffect( () => {
        fetchDataRes();
    }, [])
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <ModalRes show={showRes} setShow={setShowRes} isCreate={isCreate} oldRes={res} setOldRes={setRes}
                              updateList={fetchDataRes}/>
                    <ModalDelete show={showDel} setShow={setShowDel} isVac={false} oldItem={item}
                                 updateList={fetchDataRes}/>
                    <Button className="mb-2" variant={"success"}
                            onClick={() => {
                                setIsCreate(true)
                                setRes({
                                    ID: "",
                                    post: "",
                                    description: "",
                                    old_works: [{
                                        work_id: 0,
                                        post: "",
                                        description: "",
                                        start_time: null,
                                        end_time: null,
                                    }]
                                })
                                setShowRes(true)
                            }}
                    >Добавить резюме</Button>
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        <ResCard res={item} setShow={setShowRes}
                                                 setIsCreate={setIsCreate} setRes={setRes} prof={true} setItem={setItem}
                                                 setShowDel={setShowDel}
                                        />
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