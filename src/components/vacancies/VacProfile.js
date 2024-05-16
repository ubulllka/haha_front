import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import {PagBlock} from "../Pag";
import {VacCard} from "./VacCard";
import {ModalVac} from "../modal/ModalVac";
import Button from "react-bootstrap/Button";
import {ModalDelete} from "../modal/ModalDelete";

export const VacProfile = () => {
    const [isLoading, setIsLoding] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const token = useSelector((state) => state.user.token)
    const [vac, setVac] = useState({
        id: "",
        post: "",
        description: ""
    })
    const [showVac, setShowVac] = useState(false)
    const [isCreate, setIsCreate] = useState(false)

    const [showDel, setShowDel] = useState(false)
    const [item, setItem] = useState({
        id: "",
        post: "",
    })

    const fetchDataVac = async () => {
        setIsLoding(true);
        const result = await UserService.getMyListPag(token, page)
        setList(result?.list)
        setPagination(result?.pag)
        setIsLoding(false);
    };

    useEffect(() => {
        fetchDataVac();
    }, [])
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <ModalVac oldVac={vac} show={showVac} setShow={setShowVac} isCreate={isCreate}
                              setOldVac={setVac} updateList={fetchDataVac}/>
                    <ModalDelete show={showDel} setShow={setShowDel} isVac={true} oldItem={item}
                                 updateList={fetchDataVac}/>
                    <Button className="mb-2" variant={"success"}
                            onClick={() => {
                                setIsCreate(true)
                                setVac({
                                    id: "",
                                    post: "",
                                    description: ""
                                })
                                setShowVac(true)
                            }}
                    >Добавить вакансию</Button>
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        <VacCard vac={item} setVac={setVac} setShow={setShowVac} setShowDel={setShowDel}
                                                 setItem={setItem} prof={true} setIsCreate={setIsCreate}
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