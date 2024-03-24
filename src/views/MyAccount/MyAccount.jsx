import { Container } from 'react-bootstrap'
import { UserContext } from '../../providers/UserProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import Profile from '../../components/Profile/Profile'
import MyFavs from '../../components/MyFavs/MyFavs'

const MyAccount = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  if (!user) {
    return navigate('/')
  }

  const handleFavOptionClick = (option) => {
    setSelectedComponent(option)
  }

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Profile />
        <MyFavs onOptionClick={handleFavOptionClick} />
      </Container>
      {user?.profile_id === 1 ? <AddProduct /> : null}
    </>
  )
}

export default MyAccount
