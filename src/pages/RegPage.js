import {useActionData, useNavigation, redirect} from "react-router-dom"
import {RegForm} from "../components/auth/RegForm"

export const RegPage = () => {
    const navigation = useNavigation()
    const message = useActionData()

    return (
        <>
            <h2 className="mb-3">Регистрация</h2>
            <RegForm action={"/reg"} submitting={navigation.state === 'submitting'}/>
            {(message) && <p>Аккаунт с такой почтой уже существует</p>}
        </>
    )
}


export const regUserAction = async ({request}) => {
    const formData = await request.formData();
    const newUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        telegram: formData.get('telegram'),
        password: formData.get('password'),
        role: formData.get('role'),

    }
    let span = document.getElementById("formspan")
    let inputs = document.getElementsByTagName("input")
    for (let el of inputs)
        el.classList.remove("border-danger")
    if (newUser.name === "" || newUser.email === "" || newUser.password === "") {

        if (newUser.name === "") {
            let inp= document.getElementsByName("name")[0]
            inp.classList.add("border-danger")
        }
        if (newUser.email === "") {
            let inp= document.getElementsByName("email")[0]
            inp.classList.add("border-danger")
        }
        if (newUser.password === "") {
            let inp= document.getElementsByName("password")[0]
            inp.classList.add("border-danger")
        }

        span.innerHTML = "Заполните обязательные поля!"
        span.classList.add("mb-3", "d-block")
    } else {
        span.innerHTML = ""
        span.classList.remove("mb-3", "d-block")
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
    return null
    // const result = await registerStudent(newPerson)
    // return (result !== 409) ? redirect('/log') : true
}