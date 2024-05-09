import {LogForm} from "../components/auth/LogForm"
import {useActionData, useNavigation, redirect} from "react-router-dom"
import {singIn} from "../services/AuthService"
import {setUser} from "../features/user/userSlice";


export const LogPage = () => {
    const navigation = useNavigation()
    useActionData()
    return (
        <>
            <h2>Вход</h2>
            <LogForm submitting={navigation.state === 'submitting'}/>
            <span className="text-danger mt-2 d-block" id="formspan"></span>
        </>
    )
}

export const logAction = async (request, dispatch) => {
    const formData = await request.formData();
    const newUser = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    let formSpan = document.getElementById("formspan")
    let inputs = document.getElementsByTagName("input")
    for (let el of inputs)
        el.classList.remove("border-danger")
    if (newUser.email === "" || newUser.password === "") {
        if (newUser.email === "") {
            let inp = document.getElementsByName("email")[0]
            inp.classList.add("border-danger")
        }
        if (newUser.password === "") {
            let inp = document.getElementsByName("password")[0]
            inp.classList.add("border-danger")
        }
        formSpan.innerHTML = "Заполните все поля!"
        return null
    } else {
        formSpan.innerHTML = ""
    }
    const user = await singIn(newUser)
    if (user) {
        dispatch(setUser(user))
        return redirect('/')
    } else {
        formSpan.innerHTML = "Пользователь не найден!"
        return null
    }
}


