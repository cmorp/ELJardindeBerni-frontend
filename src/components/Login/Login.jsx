import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../../providers/UserProvider'
import './Login.css'

const Login = () => {
  const { userLogin, loading, setToken, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const validateForm = (values) => {}

  const handleSubmit = async (values) => {
    const res = await userLogin(values.email, values.password)

    if (!res.ok) {
      const data = await res.json()

      Swal.fire({
        title: 'Error',
        text: data?.message || 'Error al iniciar sesión.',
        icon: 'error'
      })
    }

    try {
      const data = await res.json()

      setToken(data?.token || null)
      setUser(data?.usuario || null)

      localStorage.setItem('token', data?.token || null)
      localStorage.setItem('userLogin', JSON.stringify(data?.usuario || null))

      navigate('/miCuenta')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      Swal.fire({
        title: 'Error',
        text: 'Error al iniciar sesión.',
        icon: 'error'
      })
    }
  }

  return (
    <>
      {/* errorType && <AlertMessage errorType={errorType} /> */}
      <Card
        style={{ width: '40%', height: '50%' }}
        className="mt-5 cardStyle shadow shadow-left border border-0"
      >
        <Card.Body>
          <Card.Title className="text-center mb-2 fs-1">Hola :)</Card.Title>
          <Card.Text className="text-center mb-4">
            Inicia tu sesión para continuar
          </Card.Text>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="form-control mb-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mb-3"
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mb-3"
                />

                <Button
                  type="submit"
                  className="w-100 mt-3 primary"
                  disabled={loading.login}
                >
                  {loading.login ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </div>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </>
  )
}

export default Login
