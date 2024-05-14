import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMyListPag} from "../../services/UserService";
import {PagBlock} from "../Pag";
import {VacCard} from "./VacCard";
import {ModalVac} from "../modal/ModalVac";
import Button from "react-bootstrap/Button";
import {ModalDelete} from "../modal/ModalDelete";

export const VacProfile = ({listChanged}) => {
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

    const fetchData = async () => {
        setIsLoding(true);
        const result = await getMyListPag(token, page)
        setList(result?.list)
        setPagination(result?.pag)
        setIsLoding(false);
    };

    useEffect(() => {

        fetchData();
    }, [page, token])
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <ModalVac oldVac={vac} show={showVac} setShow={setShowVac} isCreate={isCreate}
                              setOldVac={setVac} updateList={fetchData}/>
                    <ModalDelete show={showDel} setShow={setShowDel} isVac={true} oldItem={item}
                                 updateList={fetchData}/>
                    <Button className="mb-2" variant={"success"}
                            onClick={() => {
                                setIsCreate(true)
                                setShowVac(true)
                            }}
                    >Добавить вакансию</Button>
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.ID} className="mb-3">
                                        <VacCard vac={item} prof={true} setShowUpdate={setShowVac} setVac={setVac}
                                                 setIsCreate={setIsCreate} setItem={setItem} setShowDel={setShowDel}/>
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