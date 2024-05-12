import {StatusBlock} from "./StatusBlock";

export const UserInfo = ({user}) => {
    return(
        <>
            <h4 className="mb-2">{user?.name}</h4>
            {
                (user?.role === "APPLICANT") &&
                <StatusBlock status={user?.status}/>
            }
            <p className="mb-2">{user?.description}</p>
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