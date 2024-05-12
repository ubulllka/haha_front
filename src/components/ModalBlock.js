import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"

const ModalSelect = ({list}) => {
    return (
        <select className="form-select" name="my_id">
            {
                list.map(item => (
                    <option key={item?.id} value={item?.id}>
                        {item?.post}
                    </option>
                ))
            }
        </select>
    )
}

export const ModalBlock = ({list, show, setShow, modalId, head, head1, not}) => {

    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{head}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <input hidden={true} defaultValue={modalId} type="text" name="modal_id"/>
                    {
                        (list && list?.length)
                            ?
                            <>
                                <label className="mb-2 w-100">
                                    <p className="mb-1 form-label">{head1}</p>
                                    <ModalSelect list={list}/>
                                </label>
                                <label className="mb-2 w-100">
                                    <p className="mb-1 form-label">Напишите сопроводительное письмо:</p>
                                    <textarea className="form-control" rows="3" name="letter"/>
                                </label>
                            </>
                            :
                            <>
                                <p className="m-auto">{not}</p>
                                <Button className="mt-1 d-block m-auto" variant="outline-success">
                                    <Link to="/prof" className="text-decoration-none">Перейти в профиль</Link>
                                </Button>
                            </>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!(list && list?.length)} onClick={handleClose}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
