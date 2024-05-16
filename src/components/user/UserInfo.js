const getStatus = (user) => {
    switch (user?.status) {
        case "ACTIVE":
            return "Активно ищу работу"
        case "PASSIVE":
            return "Рассматриваю предложения"
        default:
            return "Не ищу работу"
    }
    return (
        <span>
            {
                (user?.status === "ACTIVE")
                    ? "Активно ищу работу"
                    : (user?.status === "PASSIVE")
                        ? "Рассматриваю предложения"
                        : "Не ищу работу"
            }


        </span>
    )
}

export const UserInfo = ({user, prof}) => {
    return (
        <>
            <h4 className="mb-2">{user?.name}</h4>
            {
                (user?.role === "APPLICANT") &&
                <p className="mb-2">
                    <span className="fw-medium me-1">Статус:</span>
                    {getStatus(user)}
                </p>

            }
            <p className="mb-2 mt-2">
                {user?.description}
            </p>
            <p className="mb-1">
                <span className="fw-medium me-1">Почта:</span>
                {user?.email}
            </p>
            <p className="mb-1">
                <span className="fw-medium me-1">Телеграмм:</span>
                {user?.telegram}
            </p>
        </>
    )
}