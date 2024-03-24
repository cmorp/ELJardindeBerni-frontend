import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Validator from 'validator'
import { Button, Image } from 'react-bootstrap'
import { UserContext } from '../../providers/UserProvider'
import Card from 'react-bootstrap/Card'
import SweetAlertMessage from '../AlertMessage/AlertMessage'
import './Login.css'

const Login = () => {
  const { userLogin, errorType } = useContext(UserContext)
  const navigate = useNavigate()

  const validateForm = (values) => {
    const errors = {}

    if (!Validator.isEmail(values.email)) {
      errors.email = 'Correo electrónico inválido.'
    }

    if (Validator.isEmpty(values.password)) {
      errors.password = 'Contraseña requerida.'
    }

    return errors
  }

  const handleSubmit = async (values) => {
    const isLogedIn = await userLogin(values.email, values.password)
    if (isLogedIn) navigate('/miCuenta')
  }

  return (
    <>
      {errorType && <SweetAlertMessage errorType={errorType} />}
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

                <Button type="submit" className="w-100 mt-3 primary">
                  Iniciar sesión
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
