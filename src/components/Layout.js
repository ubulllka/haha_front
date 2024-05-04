import {Outlet} from 'react-router-dom';
import {Header} from './Header';
import Container from "react-bootstrap/Container";


export const Layout = () => {
    return (
        <>
            <Header/>
            <main className='main'>
                <Container>
                    <Outlet/>
                </Container>
            </main>
            <footer className='bg-dark-subtle p-3'>
                <Container className="d-flex justify-content-end">
                    <p className="m-0">РТУ МИРЭА. ИКБО-01-21 Булгакова У.И. 2024г</p>
                </Container>
            </footer>
        </>
    )
}