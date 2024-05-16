import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ResumeService from "../../services/ResumeService";
import VacancyService from "../../services/VacancyService";

export const ModalDelete = ({show, setShow, isVac, oldItem, updateList}) => {

    const token = useSelector((state) => state.user.token)
    const handleClose = () => setShow(false);
    const [item, setItem] = useState(oldItem)

    useEffect(() => {
        setItem(oldItem)
    }, [oldItem])


    const handelRemove = async (id, token) => {
        const res = (isVac)
            ? await VacancyService.deleteVacancy(id, token)
            : await ResumeService.deleteResume(id, token)
        console.log("delete item: ", res?.status)

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            (isVac)
                                ? <>Удаление вакансии</>
                                : <>Удаление резюме</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <p>Вы уверены, что хотите удалить
                            {
                                (isVac)
                                ? <>вакансюю {' '}"{item?.post}"</>
                                : <>резюме {' '}"{item?.post}"</>

                            }
                        </p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="danger" onClick={async () => {
                        handleClose()
                        await handelRemove(item.id, token)
                        updateList()
                    }}>
                        Удалить
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}