import {getInfo} from "../services/UserService";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {UserInfo} from "../components/user/UserInfo";
import {UserTabs} from "../components/user/UserTabs";


export const ProfilePage = () => {
    const token = useSelector((state) => state.user.token)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await getInfo(token)
            setUser(result)
            setIsLoading(false)
        };
        fetchData();
    }, []);
    return (
        <>
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <UserInfo user={user} prof={true}/>
                        </div>
                        <div className="col-md-6">
                            <Button variant={"warning"} className="me-2">Редактировать</Button>
                            {
                                (user?.role === "APPLICANT") ?
                                    <Button variant={"success"}>Добавить резюме</Button>
                                    :
                                    <Button variant={"success"}>Добавить вакансию</Button>
                            }

                        </div>
                    </div>
                    <UserTabs/>
                </>
            }
        </>

    )
}
