import { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsCartPlus } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../providers/UserProvider'
import './Cards.css'

function Cards() {
  const navigate = useNavigate()

  const {
    cart,
    setCart,
    productsNumberInCart,
    user,
    handleToggleFav,
    isProductFav,
    getProducts,
    products,
    setProducts
  } = useContext(UserContext)

  useEffect(() => {
    const { results } = getProducts()
    setProducts(results)
  }, [])

  const handleNavigateLoginRegister = () => {
    navigate('/loginRegister')
  }

  const handleAddCart = (item) => {
    const existingProduct = cart.find(
      (cartItem) => cartItem.product_id === item.product_id
    )
    if (existingProduct) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.product_id === item.product_id
          ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
          : cartItem
      )
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, cantidad: 1 }])
    }
  }


  const numberFormat = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })


  return (
    <Container>
      <Row lg={4} md={1} sm={1} xs={1} className="row-gap-5">
        {(!products || products.length === 0) && (
          <h2>¡Lo sentimos! <br/> 
          En estos momentos no hay productos disponibles :( </h2>
        )}
        {products &&
          products.length > 0 &&
          products?.map((item) => {
            return (
              <Col key={item.product_id}>
                <Card className="card-container d-flex align-item-center m-auto shadow">
                  <Card.Img
                    className="card-image"
                    variant="top"
                    src={item?.image}
                  />
                  <Card.Body>
                    <Card.Title className="m-2">{item?.productname}</Card.Title>
                    <Card.Text className="m-2">{numberFormat.format(item.price)}</Card.Text>
                    <Card.Text className="m-2 description">{item?.description}</Card.Text>
                    <div className="button-cards m-4 d-flex align-items-center">
                      <Button
                        className="button-add-cart"
                        onClick={
                          user
                            ? () => handleAddCart(item)
                            : handleNavigateLoginRegister
                        }
                      >
                        {' '}
                        AGREGAR <BsCartPlus size={20} />
                      </Button>
                      <button
                        onClick={
                          user
                            ? () => handleToggleFav(item.product_id)
                            : handleNavigateLoginRegister
                        }
                        className="like-button bg-light d-flex align-items-center"
                      >
                        {isProductFav(item.product_id) ? (
                          <FaHeart  size={25} className="text-dark" />
                        ) : (
                          <FaRegHeart size={25} />
                        )}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}

export default Cards
