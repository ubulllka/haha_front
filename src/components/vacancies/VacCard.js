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
    }, []);

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
                            <h4 className="mb-2">Работодатель:</h4>
                            <p className="mb-1">Имя: {empl?.name}</p>
                            <p className="mb-1">Почта: {empl?.email}</p>
                            <p className="mb-1">Телеграмм: {empl?.telegram}</p>
                            <Link to={`user/${empl?.ID}`}>Подробнее о работодателе...</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}