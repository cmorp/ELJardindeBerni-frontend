import { useContext, useState } from 'react'
import { UserContext } from '../../providers/UserProvider'
import { Card, Container, Image } from 'react-bootstrap'
import './MyFavs.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { BsCartPlus } from 'react-icons/bs'
import { useEffect } from 'react'

const FavsCard = () => {
  const {
    user,
    cart,
    setCart,
    favs,
    handleToggleFav,
    isProductFav,
    getFavByUser
  } = useContext(UserContext)

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

  useEffect(() => {
    user && user.user_id && getFavByUser(user.user_id)
  }, [])


  const numberFormat = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })


  return (
    <Container className="d-flex ms-4 mt-4 border-0 rounded">
      <Card className="border-0 shadow w-100 text-center">
        <Card.Body>
          <Card.Title>Mis Favoritos</Card.Title>
          {(!favs || favs.length === 0) && <p>No hay productos en favoritos</p>}
          {favs &&
            favs.length > 0 &&
            favs?.map((item) => {
              return (
                <div
                  className="d-flex border my-2 shadow justify-content-between"
                  key={item.product_id}
                >
                  <div className="d-flex align-items-center">
                    <Image className="favs-image" src={item.image} />
                    <div>
                      <p className="product-name m-0 p-0">{item.productname}</p>
                      <p className="product-name m-0 p-0">{numberFormat.format(item.price)}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-4">
                    <div className="me-3 border border-3 rounded p-2 shopping-box">
                      <BsCartPlus
                        className="fav-icons"
                        onClick={() => handleAddCart(item)}
                      />
                    </div>
                    <div className="border border-3 rounded p-2 heart-box">
                      {isProductFav ? (
                        <FaHeart
                          onClick={() =>
                            handleToggleFav(parseInt(item.product_id))
                          }
                          className="fav-icons"
                        />
                      ) : (
                        <FaRegHeart
                          className="fav-icons"
                          onClick={() =>
                            handleToggleFav(parseInt(item.product_id))
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default FavsCard
