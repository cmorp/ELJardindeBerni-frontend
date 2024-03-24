import './NavPublic.css'
import Nav from 'react-bootstrap/Nav';
import { RiLoginCircleFill } from "react-icons/ri";
import {Link} from 'react-router-dom';


const NavPublic = () => {
    return(
            <div className='p-4 mb-4 d-flex justify-content-center align-items-center'>
                <Nav justify>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/loginRegister" className='colorButton'><RiLoginCircleFill size={40} color='#ffafde'/> INGRESAR</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
    );
};

export default NavPublic;