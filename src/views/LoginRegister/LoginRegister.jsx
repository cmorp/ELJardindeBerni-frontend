import { Container } from "react-bootstrap";
import Login from '../../components/Login/Login'
import Register from '../../components/Registration/Registration'


const LoginRegister = () => {
    return (
        <Container fluid className="d-flex justify-content-around ">
            <Login />
            <Register />
        </Container>
    )
}

export default LoginRegister;