import {StatusBlock} from "./StatusBlock";
import {DescribeBlock} from "./DescribeBlock";

export const UserInfo = ({user, prof}) => {
    return(
        <>
            <h4 className="mb-2">{user?.name}</h4>
            {
                (user?.role === "APPLICANT") &&
                <StatusBlock status={user?.status} prof={prof}/>
            }
            <DescribeBlock description={user?.description} prof={prof}/>
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