import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ModalRes = ({show, setShow, isCreate, setShowUpdate, oldRes, setOldRes, updateList}) => {

    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);
    const [res, setRes] = useState({
        id: oldRes?.id,
        post: oldRes?.post,
        description: oldRes?.description
    })
    const [listWork, setListWork] = useState(oldRes?.old_work.map((work, i) => ({
        id: i,
        work_id: work?.id,
        start: work?.start_time,
        end: work?.end_time,
        checked: (new Date(work.end_time).getFullYear() === 1)
    })))

    const compareDate = (a, b) => {
        if (new Date(a.start_time) < new Date(b.start_time)) {
            return 1
        }
        if (new Date(a.start_time) > new Date(b.start_time)) {
            return -1
        }
        return 0
    }

    listWork.sort((a, b) => compareDate(a, b))

    const [idCheck, setIdCheck] = useState(listWork.length)

    useEffect(() => {

        setRes({
            id: oldRes?.id,
            post: oldRes?.post,
            description: oldRes?.description
        })
        setListWork(oldRes?.old_work.map((work, i) => ({
            id: i,
            work_id: work?.id,
            post: work?.post,
            description: work?.description,
            start_time: work?.start_time,
            end_time: work?.end_time,
            checked: (new Date(work.end_time).getFullYear() === 1)
        })))
        listWork.sort((a, b) => compareDate(a, b))

        setIdCheck(listWork.length)
    }, [oldRes])


    const dropData = () => {
        setRes({
            id: "",
            post: "",
            description: "",
        })
        setListWork([{
            id: 1,
            work_id: "",
            post: "",
            description: "",
            start_time: "",
            end_time: "",
            checked: false
        }])
        setIdCheck(1)
    }
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
        console.log(oldRes, res, listWork)
        let saveListWork = listWork.map((item) => ({
            post: item?.post,
            description: item?.description,
            start_time: item?.start_time,
            end_time: item.end_time,
        }))
        let saveRes = {
            post: res?.post,
            description: res?.description,
            old_work: saveListWork
        }
        console.log(saveRes)
        // const res = await createVacancy({post: res?.post, description: res?.description}, token)
        // if (res?.status === "ok") {
        //     alert("Ваша вакансия сохранен!")
        // } else {
        //     alert("Ваша вакансия не сохранена ;-(")
        // }
    }

    const handelSubmitUpdate = async () => {
        console.log(oldRes, res, listWork)
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
                dropData()
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
                                        listWork.push({
                                            id: idCheck,
                                            work_id: "",
                                            start_time: "",
                                            end_time: "",
                                            checked: false,
                                        })
                                        setIdCheck(idCheck + 1)

                                        console.log(res, listWork)
                                    }}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Button>
                        </div>
                        <ul className="list-unstyled">
                            {
                                (listWork && listWork.length)
                                    ?
                                    listWork.map((work) => (
                                        <li key={work?.id} className="mb-3 card">
                                            <div className="card-body">
                                                <Button className="form__btn" size="sm" variant="danger">
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </Button>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Должность:</p>
                                                    <input className="form-control" type="text"
                                                           defaultValue={listWork.filter(item => item.id === work.id)[0]?.post}
                                                           onChange={(e) => {
                                                               let old = listWork.filter(item => item.id === work.id)[0]
                                                               old = {...old, post: e.target.value}
                                                               let newArr = listWork.filter(item => item.id !== work.id)
                                                               setListWork([old, ...newArr])
                                                               listWork.sort((a, b) => new Date(a.start_time) < new Date(b.start_time))
                                                           }}
                                                    />
                                                </label>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Описание:</p>
                                                    <textarea className="form-control" rows="2"
                                                              defaultValue={listWork.filter(item => item.id === work.id)[0]?.description}
                                                              onChange={(e) => {
                                                                  let old = listWork.filter(item => item.id === work.id)[0]
                                                                  old = {...old, description: e.target.value}
                                                                  let newArr = [old, ...listWork.filter(item => item.id !== work.id)]
                                                                  newArr.sort((a, b) => compareDate(a, b))
                                                                  setListWork(newArr)
                                                              }}
                                                    />
                                                </label>
                                                <label htmlFor={`data-start-${work.id}`} className="mb-1 form-label ">Начало
                                                    работы:</label>
                                                <br/>
                                                <DatePicker
                                                    id={`data-start-${work.id}`}
                                                    className="form-control"
                                                    dateFormat="dd.MM.yyyy"
                                                    selected={listWork.filter(item => item.id === work.id)[0]?.start_time}
                                                    onChange={(date) => {
                                                        let old = listWork.filter(item => item.id === work.id)[0]
                                                        old = {...old, start_time: (date) ? date.toISOString() : ""}
                                                        let newArr = [old, ...listWork.filter(item => item.id !== work.id)]
                                                        newArr.sort((a, b) => compareDate(a, b))
                                                        setListWork(newArr)
                                                    }}
                                                />
                                                <br/>
                                                <label htmlFor={`data-end-${work.id}`} className="mt-2 mb-1 w-100">
                                                    <span className="mb-1 form-label me-2">Конец работы:</span>
                                                    <Form.Check
                                                        className="d-inline-block"
                                                        type="switch"
                                                        label="По настоящее время"
                                                        checked={listWork.filter(item => item.id === work.id)[0]?.checked}
                                                        onChange={() => {
                                                            let old = listWork.filter(item => item.id === work.id)[0]
                                                            old.checked = !old.checked
                                                            let newArr = [old, ...listWork.filter(item => item.id !== work.id)]
                                                            newArr.sort((a, b) => compareDate(a, b))
                                                            setListWork(newArr)
                                                        }}
                                                    />
                                                </label>

                                                <div style={{
                                                    display:
                                                        (listWork.filter(item => item.id === work.id)[0]?.checked) ?
                                                            "none" : "block"

                                                }}>
                                                    <DatePicker
                                                        id={`data-end-${work.id}`}
                                                        className="form-control"
                                                        dateFormat="dd.MM.yyyy"
                                                        selected={listWork.filter(item => item.id === work.id)[0]?.end_time}
                                                        onChange={(date) => {
                                                            let old = listWork.filter(item => item.id === work.id)[0]
                                                            old = {...old, end_time: date.toISOString()}
                                                            let newArr = [old, ...listWork.filter(item => item.id !== work.id)]
                                                            newArr.sort((a, b) => compareDate(a, b))
                                                            setListWork(newArr)
                                                        }}
                                                    />
                                                </div>

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
                        dropData()
                        handleClose()
                    }}>
                        Закрыть
                    </Button>

                    {
                        (isCreate)
                            ? <Button variant="primary" onClick={async () => {
                                if (!checkForm()) return

                                await handelSubmitCreate()
                                dropData()
                                updateList()
                                handleClose()
                            }}>
                                Сохранить
                            </Button>
                            : <Button variant="warning" onClick={async () => {
                                if (!checkForm()) return
                                handleClose()
                                await handelSubmitUpdate()
                                // setOldRes({...oldRes, post: res?.post, description: res?.description})
                                //вызов обновления листа опыта работы
                                dropData()
                            }}>
                                Изменить
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}