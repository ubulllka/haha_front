import {useState} from "react";
import {ButtonEdit} from "./ButtonEdit";

export const StatusBlock = ({status, prof}) => {

    //active - активно ищу работу
    //passive - рассматриваю предложения
    //no - не ищу работу

    const [isSwap, setIsSwap] = useState(true)
    const getStatus = () => {
        switch (status) {
            case "ACTIVE":
                return "Активно ищу работу"
            case "PASSIVE":
                return "Рассматриваю предложения"
            default:
                return "Не ищу работу"
        }
    }
    const SwapField = ({flag}) => {
        return (flag)
            ? <input className="form-control" value={getStatus()} disabled={true}/>
            : <select className="form-select" name="status">
                <option value="ACTIVE" selected={status === "ACTIVE"}>Активно ищу работу</option>
                <option value="PASSIVE" selected={status === "PASSIVE"}>Рассматриваю предложения</option>
                <option value="NO" selected={status === "NO"}>Не ищу работу</option>
            </select>
    }

    return (
        <p className="mb-2 d-flex align-items-center">
            <span className="fw-medium me-1">Статус:</span>
            <div className="d-flex align-items-start">
                {(prof)
                    ? <SwapField flag={isSwap}/>
                    : getStatus()
                }
                {
                    (prof) &&
                    <ButtonEdit isSwap={isSwap} setIsSwap={setIsSwap} />
                }
            </div>
        </p>
    )
}