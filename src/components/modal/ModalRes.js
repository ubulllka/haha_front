import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResumeService from "../../services/ResumeService";
import {compareDate, compareForm} from "../dateParse";

export const ModalRes = ({show, setShow, isCreate, oldRes, setOldRes, updateList, page}) => {

    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);
    const [res, setRes] = useState({
        id: oldRes?.id,
        post: oldRes?.post,
        description: oldRes?.description
    })
    const [listWork, setListWork] = useState(oldRes?.old_works.map((work, i) => ({
        id: i,
        work_id: work?.work_id,
        post: work?.post,
        description: work?.description,
        start: work?.start_time,
        end: work?.end_time,
        checked: (new Date(work.end_time).getFullYear() === 1)
    })))


    listWork.sort((a, b) => compareDate(a, b))

    const [idCheck, setIdCheck] = useState(listWork.length)

    useEffect(() => {
        setRes({
            id: oldRes?.id,
            post: oldRes?.post,
            description: oldRes?.description
        })
        setListWork(oldRes?.old_works.map((work, i) => ({
            id: i,
            work_id: work?.work_id,
            post: work?.post,
            description: work?.description,
            start_time: work?.start_time,
            end_time: work?.end_time,
            checked: (new Date(work.end_time).getFullYear() === 1)
        })))
        listWork.sort((a, b) => compareDate(a, b))
        setIdCheck(oldRes?.old_works.length)
    }, [oldRes])


    const dropData = () => {
        setRes({
            id: "",
            post: "",
            description: "",
        })
        setListWork([{
            id: 1,
            work_id: 0,
            post: "",
            description: "",
            start_time: null,
            end_time: null,
            checked: false
        }])
        setIdCheck(1)
    }

    const checkForm = (listWork) => {

        let formSpan = document.getElementById("formspan")
        formSpan.innerHTML = ""
        formSpan.classList.remove("mb-3", "d-block")
        let posts = document.getElementsByName(`post`)
        let descrs = document.querySelectorAll("textarea.modal-textarea")
        let starts = document.getElementsByName(`date-start`)
        let ends = document.getElementsByName(`date-end`)

        for (let el of posts) {
            el.classList.remove("border-danger")
        }
        for (let el of descrs) {
            el.classList.remove("border-danger")
        }
        for (let el of starts) {
            el.classList.remove("border-danger")
        }
        for (let el of ends) {
            el.classList.remove("border-danger")
        }

        let flag = false
        for (let el of listWork) {
            if (el.post === "" || el.description === "" ||
                (el.start_time === null) || (!el.checked) && el.end_time === null) {
                flag = true
                break
            }
        }


        if (res.post === "" || res.description === "" || flag) {
            if (res.post === "") {
                posts[0].classList.add("border-danger")
            }
            if (res.description === "") {
                descrs[0].classList.add("border-danger")
            }

            for (let i = 0; i < listWork.length; i++) {
                if (listWork[i].post === "") {
                    posts[i + 1].classList.add("border-danger")
                }
                if (listWork[i].description === "") {
                    descrs[i + 1].classList.add("border-danger")
                }
                if (listWork[i].start_time === null) {
                    starts[i].classList.add("border-danger")
                }
                if ((!listWork[i].checked) && listWork[i].end_time === null) {
                    ends[i].classList.add("border-danger")
                }
            }
            formSpan.innerHTML = "Заполните все поля!"
            formSpan.classList.add("mb-3", "d-block")
            return false
        } else {
            formSpan.innerHTML = ""
            formSpan.classList.remove("mb-3", "d-block")
        }

        flag = false
        for (let el of listWork) {
            if (!el.checked && (compareForm(el, el) === -1)) {
                flag = true
                break
            }
        }
        if (flag) {
            for (let i = 0; i < listWork.length; i++) {
                if (!listWork[i].checked && compareForm(listWork[i], listWork[i]) === -1) {
                    starts[i].classList.add("border-danger")
                    ends[i].classList.add("border-danger")
                }
            }
            formSpan.innerHTML = "Дата начала должна быть раньше даты окончания!"
            formSpan.classList.add("mb-3", "d-block")
            return false
        } else {
            formSpan.innerHTML = ""
            formSpan.classList.remove("mb-3", "d-block")
        }

        flag = false
        const today = new Date()
        for (let el of listWork) {
            if ((!el.checked && (new Date(el.end_time) > today)) || (new Date(el.start_time) > today)) {
                flag = true
                break
            }
        }

        if (flag) {
            for (let i = 0; i < listWork.length; i++) {
                if (new Date(listWork[i].start_time) > today) {
                    starts[i].classList.add("border-danger")
                }
                if (!listWork[i].checked && (new Date(listWork[i].end_time) > today)) {
                    ends[i].classList.add("border-danger")
                }
            }
            formSpan.innerHTML = "Даты не должны быть позже сегодняшнего дня!"
            formSpan.classList.add("mb-3", "d-block")
            return false
        } else {
            formSpan.innerHTML = ""
            formSpan.classList.remove("mb-3", "d-block")
        }

        return true
    }

    const handelSubmitCreate = async () => {
        let saveListWork = listWork.map((item) => ({
            post: item?.post,
            description: item?.description,
            start_time: item?.start_time,
            end_time: (item?.checked) ? null : item?.end_time,
        }))
        let saveRes = {
            post: res?.post,
            description: res?.description,
            old_works: saveListWork
        }
        const result = await ResumeService.createResume(saveRes, token)
        console.log("save resume: ", result?.status)
    }

    const handelSubmitUpdate = async () => {
        let oldUpdateList = oldRes.old_works.map((item, i) => ({
            id: i,
            work_id: item?.work_id,
            post: item?.post,
            description: item?.description,
            start_time: item?.start_time,
            end_time: (item?.checked) ? null : item?.end_time,
        }))

        let newUpdateList = listWork.map((item) => ({
            id: item.id,
            work_id: item?.work_id,
            post: item?.post,
            description: item?.description,
            start_time: item?.start_time,
            end_time: (item?.checked) ? null : item?.end_time,
        }))

        let updateRes = {
            post: res?.post,
            description: res?.description,
            old_works_old: oldUpdateList,
            old_works_new: newUpdateList,
        }


        const result = await ResumeService.updateResume(oldRes?.id, updateRes, token)
        console.log("save resume: ", result?.status)
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
                            <input className="form-control" type="text" name="post"
                                   defaultValue={res.post}
                                   onChange={(e) => setRes(
                                       {...res, post: e.target.value}
                                   )}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Описание:</p>
                            <textarea className="form-control modal-textarea" rows="3" name="description"
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
                                            work_id: 0,
                                            post: "",
                                            description: "",
                                            start_time: null,
                                            end_time: null,
                                            checked: false,
                                        })
                                        setIdCheck(idCheck + 1)
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
                                                <Button className="form__btn" size="sm" variant="danger"
                                                        onClick={() => {
                                                            setListWork([...listWork.filter(item => item.id !== work.id)])
                                                        }}
                                                >
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </Button>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Должность:</p>
                                                    <input className="form-control" type="text" name="post"
                                                           defaultValue={listWork.filter(item => item.id === work.id)[0]?.post}
                                                           onChange={(e) => {
                                                               let old = listWork.filter(item => item.id === work.id)[0]
                                                               old = {...old, post: e.target.value}
                                                               let newArr = listWork.filter(item => item.id !== work.id)
                                                               setListWork([old, ...newArr])
                                                               listWork.sort((a, b) => compareDate(a, b))
                                                           }}
                                                    />
                                                </label>
                                                <label className="mb-2 w-100">
                                                    <p className="mb-1 form-label">Описание:</p>
                                                    <textarea className="form-control modal-textarea" rows="2"
                                                              name="description"
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
                                                <label htmlFor={`date-start-${work.id}`} className="mb-1 form-label ">Начало
                                                    работы:</label>
                                                <br/>
                                                <DatePicker
                                                    id={`date-start-${work.id}`}
                                                    name="date-start"
                                                    className="form-control"
                                                    dateFormat="dd.MM.yyyy"
                                                    selected={listWork.filter(item => item.id === work.id)[0]?.start_time}
                                                    onChange={(date) => {
                                                        let old = listWork.filter(item => item.id === work.id)[0]
                                                        old = {...old, start_time: (date) ? date.toISOString() : null}
                                                        let newArr = [old, ...listWork.filter(item => item.id !== work.id)]
                                                        newArr.sort((a, b) => compareDate(a, b))
                                                        setListWork(newArr)
                                                    }}
                                                />
                                                <br/>
                                                <label htmlFor={`date-end-${work.id}`} className="mt-2 mb-1 w-100">
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
                                                        id={`date-end-${work.id}`}
                                                        name="date-end"
                                                        className="form-control"
                                                        dateFormat="dd.MM.yyyy"
                                                        selected={listWork.filter(item => item.id === work.id)[0]?.end_time}
                                                        onChange={(date) => {
                                                            let old = listWork.filter(item => item.id === work.id)[0]
                                                            old = {...old, end_time: (date) ? date.toISOString() : null}
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
                                if (!checkForm(listWork)) return
                                await handelSubmitCreate()
                                dropData()
                                updateList()
                                setOldRes({
                                    id: "",
                                    post: "",
                                    description: "",
                                    old_works: [{
                                        id: "",
                                        post: "",
                                        description: "",
                                        start_time: null,
                                        end_time: null,
                                    }]
                                })
                                handleClose()
                            }}>
                                Сохранить
                            </Button>
                            : <Button variant="warning" onClick={async () => {
                                if (!checkForm(listWork)) return
                                handleClose()
                                await handelSubmitUpdate()
                                updateList()
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