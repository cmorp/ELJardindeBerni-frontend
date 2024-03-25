import {useContext} from 'react';
import { UserContext } from '../../providers/UserProvider'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import NavLogin from '../NavLogin/NavLogin'
import './Header.css'
import NavPublic from '../NavPublic/NavPublic';
import Logo from "/images/loguito.png";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Container fluid className='header-bg w-100 h-50 d-flex justify-content-between align-items-center'>
      <Link to="/"> 
        <Image className='logo ms-3 mt-1 mb-2 me-1' src={Logo} alt="Logo"/>
        </Link>
        <div>
        <h1 className="ms-2 d-none d-lg-block">El Jardín de Berni</h1>
        </div>
        {(user)?<div className="d-flex justify-items-end align-content-end"><NavLogin /></div >:<div className="d-flex justify-items-end"><NavPublic /></div>}
      </Container>
      <Container fluid className="subtitle">
      <div>
        <h3> ¡ENVÍO GRATIS EN TUS COMPRAS DURANTE TODO EL MES! </h3>
      </div>
      </Container>
    </>
  )
}

export default Header;