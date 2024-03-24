import { useContext, useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { BsCartCheck } from 'react-icons/bs'
import { IoHomeOutline } from 'react-icons/io5'
import { RiLogoutCircleFill } from 'react-icons/ri'
import { VscAccount } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { UserContext } from '../../providers/UserProvider'
import './NavLogin.css'

const NavLogin = () => {
  const [productsInCart, setProductsInCart] = useState(0)
  const { cart, logout } = useContext(UserContext)

  useEffect(() => {
    const totalProducts = cart.reduce(
      (total, product) => total + product.cantidad,
      0
    )
    setProductsInCart(totalProducts)
  }, [cart])

  return (
    <div className="mb-5 d-flex justify-content-center align-items-center">
      <Nav
        defaultActiveKey="/home"
        className="d-flex justify-content-center align-items-center"
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/" className="colorButton mb-1 me-2">
            <IoHomeOutline size={25} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/miCuenta" className="colorButton mb-1 me-2">
            <VscAccount size={25} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/"
            className="colorButton mb-1 me-2"
            onClick={logout}
          >
            <RiLogoutCircleFill size={25} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/miCarrito"
            className="colorButton mb-1 me-2 d-flex"
          >
            <BsCartCheck size={25} />{' '}
            <span className="fs-5"> {productsInCart} </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default NavLogin
