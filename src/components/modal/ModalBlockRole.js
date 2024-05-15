import {useSelector} from "react-redux";
import {ModalBlock} from "./ModalBlock";


export const ModalBlockRole = ({list, show, setShow, modalId, fetchData}) => {
    const role = useSelector((state) => state.user.role)
    return (
        <>
            {(role === "EMPLOYER")
                ? <ModalBlock
                    list={list}
                    show={show}
                    setShow={setShow}
                    modalId={modalId}
                    fetchData={fetchData}
                    head={"Отклик на вакансию"}
                    head1={"Выберите резюме, которое хотите отправить работодателю"}
                    not={"У вас нет еще ни одного резюме ;-(. Но вы легко можете его создать в своём профиле!"}
                />
                : <ModalBlock
                    list={list}
                    show={show}
                    setShow={setShow}
                    modalId={modalId}
                    fetchData={fetchData}
                    head={"Отклик на резюме"}
                    head1={"Выберите вакансию, которую хотите отправить соискателю"}
                    not={"У вас нет еще ни одной вакансии ;-(. Но вы легко можете её создать в своём профиле!"}
                />

            }
        </>
    )
}