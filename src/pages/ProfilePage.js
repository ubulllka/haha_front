import UserService from "../services/UserService";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {UserInfo} from "../components/user/UserInfo";
import {UserTabs} from "../components/user/UserTabs";
import {ModalProfile} from "../components/modal/ModalProfile";


export const ProfilePage = () => {
    const token = useSelector((state) => state.user.token)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [show, setShow] = useState(false);

    const fetchDataUser = async () => {
        setIsLoading(true);
        const result = await UserService.getInfo(token)
        setUser(result)
        setIsLoading(false)
    };

    useEffect(() => {
        fetchDataUser();
    }, [token]);
    return (
        <>
            <ModalProfile show={show} setShow={setShow} oldUser={user} setOldUser={setUser} fetchData={fetchDataUser} />
            {(isLoading) ?
                <p>Loading...</p>
                :
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <UserInfo user={user} prof={true}/>
                        </div>
                        <div className="col-md-6">
                            <Button variant={"warning"} className="me-2"
                                    onClick={() => {

                                        setShow(true)
                                    }}
                            >Редактировать профиль</Button>
                        </div>
                    </div>
                    <UserTabs/>
                </>
            }
        </>

    )
}
