import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {PagBlock} from "../Pag";
import {RespondCard} from "../RespondCard";

export const FilterTab = ({funcForGetData, type}) => {
    const token = useSelector((state) => state.user.token)
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)

    const arr = [
        {label: "Ожидание", value: "WAIT"},
        {label: "Принято", value: "ACCEPT"},
        {label: "Отклонено", value: "DECLINE"}
    ]

    const [selectedOptions, setSelectedOptions] = useState(["WAIT", "ACCEPT", "DECLINE"]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedOptions((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((option) => option !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await funcForGetData(token, page, selectedOptions)
            setList(result?.list)
            setPagination(result?.pag)
            setIsLoading(false);
        };
        fetchData();
    }, [page, selectedOptions, funcForGetData, token]);


    return (
        <div className="row">
            <div className="col-lg-2">
                <form action="">
                    <h5>Статусы:</h5>
                    {arr.map((item) => (
                        <label key={item.value} className="d-flex align-items-center">
                            <input className="form-check me-1"
                                   name={`status-${type}`}
                                   type="checkbox"
                                   title={item.label}
                                   value={item.value}
                                   checked={selectedOptions.includes(item.value)}
                                   onChange={handleCheckboxChange}
                            />
                            <p className="mb-0">{item.label}</p>
                        </label>
                    ))}
                </form>
            </div>
            <div className="col-lg-10">
                {(isLoading) ?
                    <p>Loading...</p>
                    :
                    <ul className="list-unstyled">
                        {
                            (list && list?.length)
                                ?
                                list.map(item => (
                                    <li key={item?.id} className="mb-3">
                                        <RespondCard item={item} type={type}/>
                                    </li>
                                ))

                                :
                                <li>Список пуст ;-(</li>
                        }
                    </ul>
                }
                {
                    (!isLoading && list && list?.length) ?
                        <PagBlock pag={pagination} setPage={setPage}/>
                        : ""
                }
            </div>
        </div>
    )
}