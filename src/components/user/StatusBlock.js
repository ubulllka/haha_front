export const StatusBlock = ({status}) => {
//active - активно ищу работу
//passive - рассматриваю предложения
//no - не ищу работу
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
    return (
        <p className="mb-2">Статус: {getStatus()}</p>
    )
}