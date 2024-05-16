import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserService from "../../services/UserService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const ModalProfile = ({show, setShow, oldUser, fetchData, setOldUser}) => {

    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);

    const [user, setUser] = useState({
        name: oldUser?.name,
        email: oldUser?.email,
        telegram: oldUser?.telegram,
        status: oldUser?.status,
        description: oldUser?.description,
    })

    useEffect(() => {
        setUser(oldUser)
    }, [oldUser])
    const checkForm = () => {
        let newUser = user
        let formSpan = document.getElementById("formspan")
        let inputs = document.getElementsByTagName("input")
        for (let el of inputs)
            el.classList.remove("border-danger")
        if (newUser.name === "" || newUser.email === "" || newUser.password === "") {
            if (newUser.name === "") {
                let inp = document.getElementsByName("name")[0]
                inp.classList.add("border-danger")
            }
            if (newUser.email === "") {
                let inp = document.getElementsByName("email")[0]
                inp.classList.add("border-danger")
            }
            formSpan.innerHTML = "Заполните обязательные поля!"
            formSpan.classList.add("mb-3", "d-block")
            return false
        } else {
            formSpan.innerHTML = ""
            formSpan.classList.remove("mb-3", "d-block")
        }

        return true
    }

    const handleUpdate = async () => {
        let res = await UserService.updateInfo({
            name: user?.name,
            email: user?.email,
            telegram: user?.telegram,
            status: user?.status,
            description: user?.description,
        }, token)
        console.log("update user:", res?.status)
    }

    return (
        <>
            <Modal show={show} onHide={() => {
                setUser(oldUser)
                handleClose()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение профиля</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Имя:</p>
                            <input className="form-control" type="text" name="name"
                                   defaultValue={user?.name}
                                   onChange={(e) => {
                                       setUser({
                                           ...user, name: e.target.value,
                                       })
                                   }}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Почта:</p>
                            <input className="form-control" type="email" name="email"
                                   defaultValue={user?.email}
                                   onChange={(e) => {
                                       setUser({
                                           ...user, email: e.target.value,
                                       })
                                   }}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Телеграм:</p>
                            <input className="form-control" type="text" name="telegram"
                                   defaultValue={user?.telegram}
                                   onChange={(e) => {
                                       setUser({
                                           ...user, telegram: e.target.value,
                                       })
                                   }}
                            />
                        </label>
                        <label className="mb-2 w-100">
                            <p className="mb-1 form-label">Описание:</p>
                            <textarea name="desc" className="form-control" rows="3"
                                      defaultValue={user?.description}
                                      onChange={(e) => {
                                          setUser({
                                              ...user, description: e.target.value,
                                          })
                                      }}/>
                        </label>
                        {

                            (role === "APPLICANT") &&
                            <label className="mb-2 w-100">
                                <p className="mb-1 form-label">Выберите свой статус:</p>
                                <select className="form-select"
                                        onChange={(e) => {
                                            const index = e.target.selectedIndex
                                            const attr = e.target.childNodes[index]
                                            const title = attr.getAttribute('data-title')
                                            setUser({
                                                ...user, status: title,
                                            })
                                        }}>

                                    <option data-title="ACTIVE" defaultValue={user?.status === "ACTIVE"}>Активно ищу работу
                                    </option>
                                    <option data-title="PASSIVE" defaultValue={user?.status === "PASSIVE"}>Рассматриваю
                                        предложения
                                    </option>
                                    <option data-title="NO" defaultValue={user?.status === "NO"}>Не ищу работу</option>
                                </select>
                            </label>
                        }
                        <span className="text-danger" id="formspan"></span>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setUser(oldUser)
                        handleClose()
                    }}>
                        Закрыть
                    </Button>
                    <Button variant="warning" onClick={() => {
                        if (!checkForm()) return
                        handleUpdate()
                        setOldUser(user)
                        fetchData()
                        handleClose()
                    }}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
