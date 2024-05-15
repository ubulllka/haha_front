import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
import {dataForm} from "../getDataStr";

export const ModalRes = ({show, setShow, isCreate, setShowUpdate, oldRes, setOldRes, updateList}) => {

    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);
    const [res, setRes] = useState(oldRes)
    const [listChecked, setListChecked] = useState(oldRes?.old_work.map((work, i) => ({
        id: i,
        work_id: work?.id,
        checked: (new Date(work.end_time).getFullYear() === 1)
    })))
    const [idCheck, setIdCheck] = useState(listChecked.length)

    useEffect(() => {

        setRes(oldRes)
        setListChecked(oldRes?.old_work.map((work, i) => ({
            id: i,
            work_id: work?.id,
            checked: (new Date(work.end_time).getFullYear() === 1)
        })))
        setIdCheck(listChecked.length)
    }, [oldRes])


    const checkForm = () => {
        let formSpan = document.getElementById("formspan")
        let input = document.getElementById(`inp-${isCreate}`)
        let textarea = document.getElementById(`txt-${isCreate}`)
        input.classList.remove("border-danger")
        textarea.classList.remove("border-danger")
        if (res.post === "" || res.description === "") {
            if (res.post === "") {
                input.classList.add("border-danger")
            }
            if (res.description === "") {
                textarea.classList.add("border-danger")
            }
            formSpan.innerHTML = "Заполните все поля!"
            formSpan.classList.add("mb-3", "d-block")
            return false
        } else {
            formSpan.innerHTML = ""
            formSpan.classList.remove("mb-3", "d-block")
        }
        return true
    }

    const handelSubmitCreate = async () => {
        console.log(res)
        // const res = await createVacancy({post: res?.post, description: res?.description}, token)
        // if (res?.status === "ok") {
        //     alert("Ваша вакансия сохранен!")
        // } else {
        //     alert("Ваша вакансия не сохранена ;-(")
        // }
    }

    const handelSubmitUpdate = async () => {
        console.log(res)
        // const res = await updateVacancy(vac?.id, {post: vac?.post, description: vac?.description}, token)
        // if (res?.status === "ok") {
        //     alert("Ваша вакансия изменена!")
        // } else {
        //     alert("Ваша вакансия изменена ;-(")
        // }
        // проверять совпедения вызова из бд
    }


    return (
        <>
            <Modal show={show} onHide={() => {
                setRes({
                    id: "",
                    post: "",
                    description: "",
                    old_work: [{index: 0, id: "", post: "", description: "", start_time: "", end_time: "",}]
                })
                handleClose()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            (isCreate)
                                ? <>Создание резюме</>
                                : <>Изменение резюме</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Должность:</p>
                            <input id={`inp-${isCreate}`} className="form-control" type="text" name="post"
                                   defaultValue={res.post}
                                   onChange={(e) => setRes(
                                       {...res, post: e.target.value}
                                   )}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Описание:</p>
                            <textarea id={`txt-${isCreate}`} className="form-control" rows="3" name="description"
                                      defaultValue={res.description}
                                      onChange={(e) => setRes(
                                          {...res, description: e.target.value}
                                      )}
                            />
                        </label>
                        <div className="d-flex justify-content-between">
                            <p className="mb-1 form-label">Опыт работы:</p>
                            <Button className="mb-2" size="sm" variant="success"
                                    onClick={() => {
                                        res?.old_work.push(
                                            {index: idCheck, id: "", post: "", description: "", start_time: "", end_time: "",}
                                        )
                                        listChecked.push({
                                            id: idCheck,
                                            work_id: "",
                                            checked: false,
                                        })
                                        setIdCheck(idCheck + 1)
                                        console.log(res)
                                    }}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Button>
                        </div>
                        <ul className="list-unstyled">
                            {
                                (res?.old_work && res?.old_work?.length)
                                    ?
                                    res?.old_work.map((work) => (
                                        <li key={work?.index} className="mb-3 card">
                                            <div className="card-body">
                                                <Button className="form__btn" size="sm" variant="danger">
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </Button>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Должность:</p>
                                                    <input className="form-control" type="text"
                                                           defaultValue={work?.post}
                                                    />
                                                </label>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Описание:</p>
                                                    <textarea className="form-control" rows="2"
                                                              defaultValue={work?.description}
                                                    />
                                                </label>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Начало работы:</p>
                                                    {dataForm(work?.start_time)}
                                                    <input className="form-control" type="date"
                                                           defaultValue={dataForm(work?.start_time)}
                                                    />
                                                </label>

                                                <label className="mb-2 w-100">
                                                    <span className="mb-1 form-label me-2">Конец работы:</span>
                                                    <Form.Check // prettier-ignore
                                                        className="d-inline-block"
                                                        type="switch"
                                                        label="По настоящее время"
                                                        checked={listChecked.filter(item => item.id === work.index)[0]?.checked}
                                                        onChange={() => {
                                                            let newItem = listChecked.filter(item => item.id === work.index)[0]
                                                            newItem.checked = !newItem.checked
                                                            setListChecked(
                                                                [...listChecked.filter(item => item.id !== work.index), newItem]
                                                            )
                                                        }}
                                                    />
                                                </label>
                                                <label className="mb-2 w-100">
                                                    <input className="form-control" type="date"
                                                           hidden={listChecked.filter(item => item.id === work.index)[0]?.checked}
                                                           defaultValue={dataForm(work?.end_time)}
                                                    />
                                                </label>
                                            </div>
                                        </li>
                                    ))
                                    :
                                    <li>Список пуст ;-(</li>
                            }

                        </ul>
                        <span id="formspan"></span>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        setRes({
                            id: "",
                            post: "",
                            description: "",
                            old_work: [{index: 0, id: "", post: "", description: "", start_time: "", end_time: "",}]
                        })
                    }}>
                        Закрыть
                    </Button>

                    {
                        (isCreate)
                            ? <Button variant="primary" onClick={async () => {
                                if (!checkForm()) return
                                handleClose()
                                await handelSubmitCreate()
                                updateList()
                                setRes({
                                    id: "",
                                    post: "",
                                    description: "",
                                    old_work: [{index: 0, id: "", post: "", description: "", start_time: "", end_time: "",}]
                                })
                            }}>
                                Сохранить
                            </Button>
                            : <Button variant="warning" onClick={async () => {
                                if (!checkForm()) return
                                handleClose()
                                await handelSubmitUpdate()
                                setOldRes({...oldRes, post: res?.post, description: res?.description})
                                setRes({
                                    id: "",
                                    post: "",
                                    description: "",
                                    old_work: [{index: 0, id: "", post: "", description: "", start_time: "", end_time: "",}]
                                })
                            }}>
                                Изменить
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}