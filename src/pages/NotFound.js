import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export const NotFound = () => {
    return (
        <Alert key={"primary"} variant={"primary"} className="text-center">
            <h1>404</h1>
            <h3>Страница не найдена</h3>
            <p>Страница, на которую вы пытаетесь попасть, не существует или была удалена.</p>
            <p>Перейдите на {' '} <Alert.Link href="/">Главную страницу</Alert.Link></p>
        </Alert>

    )
}