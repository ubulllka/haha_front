import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom"
import {useEffect, useState} from "react";
import RespondService from "../../services/RespondService";
import {useSelector} from "react-redux";


const ModalSelect = ({list, respondModel, setRespondModel}) => {
    const selectId = list[0].id
    return (
        <select className="form-select" name="my_id"
                onChange={(e) => {
                    const index = e.target.selectedIndex
                    const attr = e.target.childNodes[index]
                    const id = attr.getAttribute('data-title')
                    setRespondModel({...respondModel, my_id: +id})
                }}>
            {
                list.map(item => (
                    <option key={item?.id} data-title={item?.id} defaultValue={selectId === item?.id}>
                        {item?.post}
                    </option>
                ))
            }
        </select>
    )
}

export const ModalBlock = ({list, show, setShow, modalId, fetchData, head, head1, not}) => {

    const token = useSelector((state) => state.user.token)
    const [respondModel, setRespondModel] = useState({
        modal_id: +modalId,
        my_id: list && list[0]?.id,
        letter: ""
    })


    const handleSubmit = async () => {
        const res = await RespondService.createRespond(respondModel, token)
        console.log("save respond: ", res?.status)
    }
    const handleClose = () => {
        setShow(false);
        setRespondModel({
            modal_id: +modalId,
            my_id: list && list[0]?.id,
            letter: ""
        })
    }

    useEffect(() => {
        setRespondModel({
            ...respondModel,
            modal_id: +modalId
        })
    }, [modalId])
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{head}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    {
                        (list && list?.length)
                            ?
                            <>
                                <label className="mb-2 w-100">
                                    <p className="mb-1 form-label">{head1}</p>
                                    <ModalSelect list={list} respondModel={respondModel}
                                                 setRespondModel={setRespondModel}/>
                                </label>
                                <label className="mb-2 w-100">
                                    <p className="mb-1 form-label">Напишите сопроводительное письмо:</p>
                                    <textarea className="form-control" rows="3" name="letter"
                                              onChange={(e) => setRespondModel({
                                                  ...respondModel,
                                                  letter: e.target.value
                                              })}/>
                                </label>

                            </>
                            :
                            <>
                                <p className="m-auto">{not}</p>

                                <Link to="/prof" className="mt-1 d-block m-auto btn btn-outline-success">
                                    Перейти в профиль
                                </Link>

                            </>
                    }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!(list && list?.length)} onClick={async () => {
                    await handleSubmit()
                    handleClose()
                    fetchData()
                }}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
