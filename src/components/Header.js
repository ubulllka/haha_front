import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {setUser} from "../features/user/userSlice";

export const Header = () => {
    const role = useSelector((state) => state.user.role)
    const dispatch = useDispatch()
    const exit = () => {
        dispatch(setUser({
            username: '',
            token: '',
            role: 'ANON',
        }))
        return redirect('/')
    }
    return (
        <Navbar expand="lg" className="bg-dark-subtle">
            <Container>
                <Navbar.Brand href="/">haha.ru</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="/vac">Вакансии</Nav.Link>
                        <Nav.Link href="/res">Резюме</Nav.Link>
                    </Nav>

                    <Form className="d-flex gap-2">
                        {
                            (role === "ANON") ?
                                <>
                                    <Button variant="outline-success" href="reg">Регистрация</Button>
                                    <Button variant="outline-primary" href="log">Войти</Button>
                                </>

                                :
                                <>
                                    <Button variant="outline-success" href="/prof">Профиль</Button>
                                    <Button variant="outline-danger" onClick={() => exit()}>Выйти</Button>
                                </>
                        }
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}