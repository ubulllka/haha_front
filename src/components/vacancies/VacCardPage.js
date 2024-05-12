import {useEffect, useState} from "react";
import {getList, getUser} from "../../services/UserService";
import {Link} from "react-router-dom";
import {getVacancy} from "../../services/VacancyService";
import {ModalBlock} from "../ModalBlock";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";

export const VacCardPage = ({id}) => {
    const [vac, setVac] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [empl, setEmpl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const vacRes = await getVacancy(id)
            setVac(vacRes)
            const result = await getUser(vacRes?.employer_id);
            setEmpl(result);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const [show, setShow] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [isLoadListRes, setIsLoadListRes] = useState(true)
    const [listRes, setListRes] = useState(null)
    const role = useSelector((state) => state.user.role)
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadListRes(true);
            if (role === "APPLICANT") {
                const result = await getList(token)
                setListRes(result)
            }
            setIsLoadListRes(false);
        };
        fetchData();
    }, [])

    return (
        <>
            {
                (!isLoadListRes && role === "APPLICANT") &&
                <ModalBlock
                    list={listRes}
                    show={show}
                    setShow={setShow}
                    modalId={modalId}
                    head={"Отклик на вакансию"}
                    head1={"Выберите резюме, которое хотите отправить работодателю"}
                    not={"У вас нет еще ни одного резюме ;-(. Но вы легко можете его создать в своём профиле!"}
                />
            }
            <h2>Вакансия</h2>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="mb-2">{vac?.post}</h3>
                        <p className="mb-1">{vac?.description}</p>
                        {
                            (role === "APPLICANT") &&
                            <Button className="mt-2" onClick={() => {
                                setShow(true)
                                setModalId(vac?.ID)
                            }}>Откликнуться</Button>
                        }
                    </div>
                    {

                    }
                    <div className="col-md-6">
                        <h4 className="mb-2">{empl?.name}</h4>
                        <p className="mb-1">{empl?.description}</p>
                        <p className="mb-1">
                            <span className="fw-medium me-1">Почта:</span>
                            {empl?.email}
                        </p>
                        <p className="mb-1">
                            <span className="fw-medium me-1">Телеграмм:</span>
                            {empl?.telegram}
                        </p>
                        <Link to={`/user/${empl?.ID}`}>Подробнее о работодателе...</Link>
                    </div>
                </div>
            )}
        </>
    )
}