import {getInfo} from "../services/UserService";
import {useSelector} from "react-redux";
import {defer, useLoaderData, Await} from "react-router-dom"
import {Suspense} from "react"

export const ProfilePage = () => {
    const token = useSelector((state) => state.user.token)
    const user = useLoaderData(token);
    return (
        <Suspense fallback={<h3>Loading...</h3>}>
            <Await resolve={user}>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <p>{user?.telegram}</p>
            </Await>
        </Suspense>
    )
}

export const infoLoader = async (token) => {
    return defer({
        user: getInfo(token)
    })
}