import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const URL_BASE = import.meta.env.VITE_BASE_URL

const initialStateToken = localStorage.getItem('token') || null
const initialStateLogin = JSON.parse(localStorage.getItem('userLogin')) || null

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(initialStateToken)
    const [user, setUser] = useState(initialStateLogin)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [favs, setFavs] = useState([])
    const [errorType, setErrorType] = useState(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState({
        login: false,
        register: false,
        products: false,
        carts: false,
        favs: false
    })

    const userRegister = async (userRegister) => {
        return await fetch(`${URL_BASE}/public/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userRegister)
        })
    }

    const userLogin = async (email, contraseña) => {
        setLoading({ ...loading, login: true })
        const response = await fetch(`${URL_BASE}/public/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: email, password: contraseña })
        })
        setLoading({ ...loading, login: false })

        return response
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        setFavs([])
    }

    //LECTURA DE PRODUCTOS
    const getProducts = async (id) => {
        setLoading({ ...loading, products: true })
        const URL = `${URL_BASE}/public/products/`
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { results } = await response.json()
        setProducts(results)
        setLoading({ ...loading, products: false })
        return results
    }

    const getFavByUser = async (user_id) => {
        setLoading({ ...loading, favs: true })
        const response = await fetch(
            `${URL_BASE}/private/users/favs/?user_id=${user_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const data = await response.json()

        setFavs(data.results)
        setLoading({ ...loading, favs: false })
        return data.results
    }

    const handleToggleFav = async (productId) => {
        try {
            if (isProductFav(`${productId}`)) {
                console.log('entre a eliminar el fav')
                const userId = user.user_id
                deleteFav(userId, productId).then(() => {
                    const newFavs = favs.filter(
                        (fav) => fav.product_id !== `${productId}`
                    )
                    console.log('newFavs: ', newFavs)
                    setFavs(newFavs)
                })
            } else {
                console.log('entre a agregar a fav')
                const userId = user.user_id
                console.log('addtofav func userid: ', userId)
                addToFav(userId, productId).then(() => {
                    const newFavs = [...favs, { product_id: productId }]
                    setFavs(newFavs)
                })
            }
        } catch (error) {
            console.error('Error al agregar/eliminar de favoritos:', error)
        }
    }

    const addToFav = async (userId, productId) => {
        const response = await fetch(`${URL_BASE}/private/users/favs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId, product_id: productId })
        })
        const data = await response.json()

        return data
    }

    const deleteFav = async (userId, productId) => {
        const response = await fetch(`${URL_BASE}/private/users/favs`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId, product_id: productId })
        })
        const data = await response.json()

        return data
    }

    const isProductFav = (productId) => {
        return favs && favs.some((fav) => fav.product_id === productId)
    }

    const addProduct = async (productId) => {
        const response = await fetch(`${URL_BASE}/private/users/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(productId)
        })
        const data = await response.json()

        return data
    }

    const deleteProduct = async (productId) => {
        const response = await fetch(`${URL_BASE}/private/users/products`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        })
        const data = await response.json()

        return data
    }

    const updateUser = async (userId) => {
        const response = await fetch(`${URL_BASE}/private/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userId)
        })
        const data = await response.json()

        return data
    }

    const getCart = async (userId) => {
        try {
            setLoading({ ...loading, carts: true })
            const response = await fetch(`${URL_BASE}/private/users/cart/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error('Error al obtener el carrito.')
            }
            const data = await response.json()

            setCart(data)
            return data
        } catch (error) {
            console.error(error)
            setErrorType('Error al obtener el carrito desde DB')
        } finally {
            setLoading({ ...loading, carts: false })
        }
    }

    useEffect(() => {
        const saveCart = setTimeout(async () => {
            if (cart.length === 0) return
            if (!user) return

            try {
                const response = await fetch(`${URL_BASE}/private/users/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId: user.user_id,
                        products: cart
                    })
                })

                if (!response.ok) {
                    throw new Error('Error al guardar el carrito.')
                }
                await response.json()
            } catch (error) {
                console.error(error)
                setCart([])
            }
        }, 2000)

        return () => clearTimeout(saveCart)
    }, [cart])

    useEffect(() => {
        const getBasicDataUser = () => {
            if (user && user.user_id) {
                getCart(user.user_id)
                getFavByUser(user.user_id)
            }
        }

        return () => getBasicDataUser()
    }, [user])

    useEffect(() => {
        if (token && user) {
            localStorage.setItem('token', token)
            localStorage.setItem('userLogin', JSON.stringify(user))
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('userLogin')
        }
    }, [token, user])

    return (
        <UserContext.Provider
            value={{
                userLogin,
                userRegister,
                token,
                setToken,
                user,
                setUser,
                logout,
                getProducts,
                products,
                setProducts,
                cart,
                setCart,
                addProduct,
                deleteProduct,
                favs,
                getFavByUser,
                handleToggleFav,
                addToFav,
                deleteFav,
                isProductFav,
                errorType,
                setErrorType,
                setSuccess,
                updateUser,
                getCart,
                loading,
                setLoading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider