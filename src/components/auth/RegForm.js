import {Form} from "react-router-dom"

export const RegForm = ({action, submitting}) => {

    let flag = true
    function checkPassword() {
        let pass = document.getElementById("password")
        let pass2 = document.getElementById("password2")
        let span = document.getElementById("password2span")
        if ((pass2.value.length < pass.value.length) && flag) return
        flag = false
        if (pass2.value !== pass.value) {
            span.innerHTML = "Пароли не совпадают!"
        } else {
            span.innerHTML = ""
        }
    }

    return (
        <Form action={`${action}`} method="post">
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Имя*:</p>
                <input className="form-control" type="text" placeholder="Иванов Иван Иванович" name="name" />
            </label>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Почта*:</p>
                <input className="form-control" type="email" placeholder="example@mail.ru" name="email" />
            </label>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Телеграм:</p>
                <input className="form-control" type="text" placeholder="@telegram" name="telegram" />
            </label>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Пароль*:</p>
                <input className="form-control" type="password" name="password" id="password" />
            </label>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Повторите пароль*:</p>
                <input className="form-control" type="password" name="password2" id="password2" onChange={checkPassword} />
            </label>
            <span className="text-danger" id="password2span"></span>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">В качестве кого вы хотите зарегистрироваться?</p>
                <select className="form-select" name="role">
                    <option value="APPLICANT">Соискателя</option>
                    <option value="EMPLOYER">Работодателя</option>
                </select>
            </label>
            <p className="text-black-50 mb-3">* - обязательное поле</p>
            <span className="text-danger" id="formspan"></span>
            <input type="submit" value="Зарегистрироваться" className="btn btn-success d-block" disabled={submitting}/>
        </Form>
    )
}

