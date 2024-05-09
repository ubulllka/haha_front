import {Form} from "react-router-dom"

export const LogForm = ({action, submitting}) => {

    return (
        <Form action={`${action}`} method="post">
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Почта:</p>
                <input className="form-control" type="email" placeholder="example@mail.ru" name="email" />
            </label>
            <label className="mb-2 w-100">
                <p className="mb-1 form-label">Пароль:</p>
                <input className="form-control" type="password" name="password" id="password" />
            </label>
            <input type="submit" value="Войти" className="btn btn-success d-block" disabled={submitting}/>
        </Form>
    )
}

