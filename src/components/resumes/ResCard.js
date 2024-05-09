import {useEffect, useState} from "react";
import {getUser} from "../../services/UserService";
import {Link, useAsyncValue} from "react-router-dom";

export const ResCard = () => {
    const res = useAsyncValue()
    const [isLoading, setIsLoading] = useState(false);
    const [appl, setAppl] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await getUser(res?.applicant_id);
            setAppl(result);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <h2>Резюме</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mb-2">{res?.post}</h3>
                    <p className="mb-1">{res?.description}</p>
                </div>
                <div className="col-md-6">
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                        <>
                            <h4 className="mb-2">Соискатель:</h4>
                            <p className="mb-1">Имя: {appl?.name}</p>
                            <p className="mb-1">Почта: {appl?.email}</p>
                            <p className="mb-1">Телеграмм: {appl?.telegram}</p>
                            <Link to={`user/${appl?.ID}`}>Подробнее о соискателе...</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}