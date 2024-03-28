import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import validator from 'validator'
import { UserContext } from '../../providers/UserProvider'
import './Registration.css'

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { userRegister } = useContext(UserContext)

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const user = {
      profile_id: values.profile_id,
      userName: values.userName,
      userEmail: values.userEmail,
      userPhone: values.userPhone,
      password: values.password,
      password2: values.password2,
      userAddress: values.userAddress,
      region: values.region,
      city: values.city
    }

    try {
      const res = await userRegister(user)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(
          data?.message || data?.error || 'Error al crear usuario.'
        )
      }

      // console.log('data del user a la db: ', res)
      resetForm()
      alert('Registro exitoso. Ahora puedes iniciar sesión.')
    } catch (err) {
      alert(err || 'Error al crear usuario.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validate = (values) => {
    const errors = {}

    const isRequired = (value) => (value ? undefined : 'Campo requerido.')
    const maxLength = (max) => (value) =>
      value && value.length > max ? `Máximo ${max} caracteres.` : undefined
    const isValidEmail = (value) =>
      value && !validator.isEmail(value)
        ? 'Correo electrónico inválido.'
        : undefined

    const validateFields = {
      profile_id: [isRequired],
      userName: [isRequired, maxLength(50)],
      userEmail: [isRequired, isValidEmail, maxLength(50)],
      userPhone: [isRequired, maxLength(12)],
      password: [isRequired, maxLength(60)],
      password2: [isRequired, maxLength(60)],
      userAddress: [isRequired, maxLength(25)],
      region: [isRequired, maxLength(25)],
      city: [isRequired, maxLength(25)]
    }

    for (const field in validateFields) {
      const fieldValidators = validateFields[field]
      for (const validatorFn of fieldValidators) {
        const error = validatorFn(values[field])
        if (error) {
          errors[field] = error
          break
        }
      }
    }
    return errors
  }

  return (
    <Card
      style={{ width: '40%' }}
      className="mt-5 mb-5 cardStyle shadow shadow-left border border-0"
    >
      <Card.Body>
        <Card.Title className="text-center mb-4">
          ¿No tienes una cuenta? ¡Regístrate!
        </Card.Title>
        <Formik
          initialValues={{
            profile_id: '',
            userName: '',
            userEmail: '',
            userPhone: '',
            password: '',
            password2: '',
            userAddress: '',
            region: '',
            city: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            <ErrorMessage
              name="profile_id"
              component="div"
              className="text-danger"
            />
            <Field as="select" name="profile_id" className="form-select mb-3">
              <option value="" disabled>
                Selecciona tipo de usuario
              </option>
              <option value="2">Comprador</option>
              <option value="1">Administrador</option>
            </Field>

            <ErrorMessage
              name="userName"
              component="div"
              className="text-danger"
            />
            <Field
              type="text"
              name="userName"
              placeholder="Nombre y Apellido"
              className="mb-3 form-control"
            />
            <ErrorMessage
              name="userEmail"
              component="div"
              className="text-danger"
            />
            <Field
              type="email"
              name="userEmail"
              placeholder="Correo electrónico"
              className="mb-3 form-control"
            />

            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
            <div className="password-field d-flex align-content-center">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                className="mb-3 form-control"
              />
            </div>

            <ErrorMessage
              name="password2"
              component="div"
              className="text-danger"
            />
            <div className="password-field d-flex align-content-center">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password2"
                placeholder="Confirma tu contraseña"
                className="mb-3 form-control"
              />
            </div>

            <ErrorMessage
              name="userPhone"
              component="div"
              className="text-danger"
            />
            <Field
              type="text"
              name="userPhone"
              placeholder="Teléfono"
              className="mb-3 form-control"
            />

            <ErrorMessage
              name="userAddress"
              component="div"
              className="text-danger"
            />
            <Field
              type="text"
              name="userAddress"
              placeholder="Dirección"
              className="mb-3 form-control"
            />

            <ErrorMessage
              name="region"
              component="div"
              className="text-danger"
            />
            <Field
              type="text"
              name="region"
              placeholder="Región"
              className="mb-3 form-control"
            />

            <ErrorMessage name="city" component="div" className="text-danger" />
            <Field
              type="text"
              name="city"
              placeholder="Ciudad"
              className="mb-3 form-control"
            />

            <Button type="submit" className="w-100 primary">
              Crear cuenta
            </Button>
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default Registration
