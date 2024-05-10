import {useEffect, useState} from "react";
import {getUser} from "../../services/UserService";
import {Link, useAsyncValue} from "react-router-dom";

export const VacCard = () => {
    const vac = useAsyncValue()
    const [isLoading, setIsLoading] = useState(false);
    const [empl, setEmpl] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await getUser(vac?.employer_id);
            setEmpl(result);
            setIsLoading(false);
        };
        fetchData();
    });

    return (
        <>
            <h2>Вакансия</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mb-2">{vac?.post}</h3>
                    <p className="mb-1">{vac?.description}</p>
                </div>
                <div className="col-md-6">
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                        <>
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
                            <Link to={`user/${empl?.ID}`}>Подробнее о работодателе...</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}