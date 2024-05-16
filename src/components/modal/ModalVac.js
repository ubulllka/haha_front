import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import VacancyService from "../../services/VacancyService";

export const ModalVac = ({show, setShow, isCreate, oldVac, setOldVac, updateList}) => {

    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);
    const [vac, setVac] = useState(oldVac)

    useEffect(() => {
        setVac(oldVac)
    }, [oldVac])


    const checkForm = () => {
        let formSpan = document.getElementById("formspan")
        let input = document.getElementById(`inp-${isCreate}`)
        let textarea = document.getElementById(`txt-${isCreate}`)
        input.classList.remove("border-danger")
        textarea.classList.remove("border-danger")
        if (vac.post === "" || vac.description === "") {
            if (vac.post === "") {
                input.classList.add("border-danger")
            }
            if (vac.description === "") {
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
        const res = await VacancyService.createVacancy({post: vac?.post, description: vac?.description}, token)
        console.log("save vacancy: ", res?.status)
    }

    const handelSubmitUpdate = async () => {
        const res = await VacancyService.updateVacancy(vac?.id, {post: vac?.post, description: vac?.description}, token)
        console.log("update vacancy: ", res?.status)
    }
    return (
        <>
            <Modal show={show} onHide={() => {
                setVac({
                    id: "",
                    post: "",
                    description: ""
                })
                handleClose()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            (isCreate)
                                ? <>Создание вакансии </>
                                : <>Изменение вакансии</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Должность:</p>
                            <input id={`inp-${isCreate}`} className="form-control" type="text" name="post"
                                   defaultValue={vac?.post}
                                   onChange={(e) => setVac(
                                       {...vac, post: e.target.value}
                                   )}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Описание:</p>
                            <textarea id={`txt-${isCreate}`} className="form-control" rows="3" name="description"
                                      defaultValue={vac.description}
                                      onChange={(e) => setVac(
                                          {...vac, description: e.target.value}
                                      )}
                            />
                        </label>
                        <span id="formspan"></span>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setVac({
                            id: "",
                            post: "",
                            description: ""
                        })
                        handleClose()
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
                                setVac({
                                    id: "",
                                    post: "",
                                    description: ""
                                })
                            }}>
                                Сохранить
                            </Button>
                            : <Button variant="warning" onClick={async () => {
                                if (!checkForm()) return
                                handleClose()
                                await handelSubmitUpdate()
                                updateList()
                                setVac({
                                    id: "",
                                    post: "",
                                    description: ""
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