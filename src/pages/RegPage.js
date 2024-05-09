import {useActionData, useNavigation, redirect} from "react-router-dom"
import {RegForm} from "../components/auth/RegForm"
import {singUp} from "../services/AuthService";

export const RegPage = () => {
    const navigation = useNavigation()
    useActionData()
    return (
        <>
            <h2 className="mb-3">Регистрация</h2>
            <RegForm submitting={navigation.state === 'submitting'}/>
            <span className="text-danger mt-3" id="emailspan"></span>
        </>
    )
}


export const regAction = async ({request}) => {
    const formData = await request.formData();
    const newUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        telegram: formData.get('telegram'),
        password: formData.get('password'),
        role: formData.get('role'),
    }
    let formSpan = document.getElementById("formspan")
    let emailSpan = document.getElementById("emailspan")
    let inputs = document.getElementsByTagName("input")
    for (let el of inputs)
        el.classList.remove("border-danger")
    if (newUser.name === "" || newUser.email === "" || newUser.password === "") {
        if (newUser.name === "") {
            let inp = document.getElementsByName("name")[0]
            inp.classList.add("border-danger")
        }
        if (newUser.email === "") {
            let inp = document.getElementsByName("email")[0]
            inp.classList.add("border-danger")
        }
        if (newUser.password === "") {
            let inp = document.getElementsByName("password")[0]
            inp.classList.add("border-danger")
        }
        formSpan.innerHTML = "Заполните обязательные поля!"
        formSpan.classList.add("mb-3", "d-block")
        return null
    } else {
        formSpan.innerHTML = ""
        formSpan.classList.remove("mb-3", "d-block")
    }
    const pas = {
        password: formData.get('password'),
        password2: formData.get('password2')
    }
    if (pas.password !== pas.password2) {
        let span = document.getElementById("password2span")
        span.innerHTML = "Пароли не совпадают!"
        return null
    }
    const res = await singUp(newUser)
    if (!res) {
        emailSpan.innerHTML = "Аккаунт с такой почтой уже существует"
        return null
    }
    return redirect('/log')
}