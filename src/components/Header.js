import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

import {setUser} from "../features/user/userSlice";

export const Header = () => {
    const role = useSelector((state) => state.user.role)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const exit = () => {
        dispatch(setUser({
            token: '',
            role: 'ANON',
        }))
        navigate('/')
    }

    return (
        <Navbar expand="lg" className="bg-dark-subtle">
            <Container>
                <Navbar.Brand>
                    <Link className="header__link" to="/">haha.ru</Link>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link>
                            <Link className="header__link" to="/vac">Вакансии</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="header__link" to="/res">Резюме</Link>
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex gap-2">
                        {
                            (role === "ANON") ?
                                <>
                                    <Link className="header__link" to="/reg">
                                        <Button variant="outline-success">Регистрация</Button>
                                    </Link>
                                    <Link className="header__link" to="/log">
                                        <Button variant="outline-primary">Войти</Button>
                                    </Link>
                                </>

                                :
                                <>
                                    <Button variant="outline-success">
                                        <Link className="header__link" to="/prof">Профиль</Link>
                                    </Button>
                                    <Button variant="outline-danger"
                                            onClick={exit}
                                    >Выйти</Button>
                                </>
                        }
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}