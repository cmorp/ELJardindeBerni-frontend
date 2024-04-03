import { React, useContext, useState } from 'react'
import { Button, Col, Container, Image, Modal, Row } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../../providers/UserProvider'
import './MyCart.css'

function MyCart() {
  const { cart, setCart, loading } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const convertStringToNumber = (str) => {
    const numberStr = str.replace(/\$|,|\./g, '')
    return parseInt(numberStr)
  }

  const numberFormat = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + parseInt(item.price) * item.cantidad,
      0
    )
  }

  const calculateTotal = (subtotal) => {
    return subtotal
  }

  const handleRemoveProduct = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.product_id === productId) {
        return { ...product, cantidad: 0 }
      }
      return product
    })
    setCart(updatedCart)
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((product) => {
      if (product.product_id === productId) {
        return { ...product, cantidad: newQuantity }
      }
      return product
    })
    setCart(updatedCart)
  }

  const handlePagoClick = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: 'Agrega productos a tu carrito para proceder al pago.'
      })
    } else {
      setShowModal(false)
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu compra!',
        text: 'Recibirás un correo electrónico con el link de seguimiento de tu compra.'
      }).then(() => {
        navigate('/')
        const updatedCart = cart.map((product) => {
          return { ...product, cantidad: 0 }
        })

        setCart(updatedCart)
      })
    }
  }

  return (
    <div>
      <Container>
        <h3 className="text-center mt-4">Mi Carrito </h3>
        <Row className="cart-box mt-5">
          <Col lg={8} md={8} className="mt-4 ms-4">
            <div className="bg-cart py-3 d-flex flex-column align-items-center">
              <div className="d-flex justify-content-between w-100 px-3 border-bottom mb-4">
                <h5 className="fw-italic">Producto</h5>
                <h5 className="fw-italic">Precio</h5>
                <h5 className="fw-italic">Cantidad</h5>
                <h5 className="fw-italic"></h5>
              </div>
              {loading.carts && <p>Cargando productos...</p>}
              {!cart ||
                (cart.length === 0 && !loading.carts && (
                  <p>No hay productos en el carrito</p>
                ))}
              {cart &&
                cart.length > 0 &&
                cart.map((product) => {
                  if (product.cantidad === 0) return null
                  return (
                    <div
                      key={product.product_id}
                      className="d-flex justify-content-between w-100 px-4 align-items-center"
                    >
                      <Image
                        className="m-0 p-0 cart-img-product"
                        src={product.image}
                      />
                      <p className="me-5">
                        {numberFormat.format(product.price)}
                      </p>
                      <input
                        className="quantity"
                        type="number"
                        min="1"
                        value={product.cantidad}
                        onChange={(e) => {
                          handleUpdateQuantity(
                            product.product_id,
                            parseInt(e.target.value)
                          )
                        }}
                      />
                      <Button
                        variant="white"
                        onClick={() => handleRemoveProduct(product.product_id)}
                      >
                        <FaTrashAlt size={25} />
                      </Button>
                    </div>
                  )
                })}
            </div>
          </Col>
          <Col className="my-5 ms-5 me-5 border p-4 bg-light shadow">
            <h4>RESUMEN</h4>
            <div>
              <div>
                <p className="m-0 d-flex justify-content-between align-items-center">
                  <span>SUBTOTAL</span>
                  <span>${calculateSubtotal().toLocaleString()}</span>
                </p>
                <p className="d-flex justify-content-between align-items-center">
                  <span>ENVÍO</span>
                  <span>GRATIS</span>
                </p>
                <p className="d-flex justify-content-between align-items-center">
                  <strong>TOTAL</strong>
                  <strong>
                    ${calculateTotal(calculateSubtotal()).toLocaleString()}
                  </strong>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex m-5 border-0 rounded border-0 w-80 justify-content-center">
          <Button variant="dark mb-4 mb-3" onClick={() => setShowModal(true)}>
            IR A PAGAR
          </Button>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>¿Confirmas tu pago?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, confirma tu pago para proceder con la compra.</p>
            Total a pagar: $
            {calculateTotal(calculateSubtotal()).toLocaleString()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handlePagoClick}>
              Pagar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default MyCart
