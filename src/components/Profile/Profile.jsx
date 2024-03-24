import { ErrorMessage, Field, Formik } from 'formik'
import { useContext, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import UserProvider, { UserContext } from '../../providers/UserProvider'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import './Profile.css'

const EditProfileCard = () => {
  const { user, setUser, updateUser } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const validationSchema = Yup.object().shape({
    formEmail: Yup.string()
      .email('Correo inválido.')
      .required('Campo requerido.'),
    formPhone: Yup.string().required('Campo requerido.'),
    formAddress: Yup.string().required('Campo requerido.'),
    formCity: Yup.string().required('Campo requerido.'),
    formRegion: Yup.string().required('Campo requerido.')
  })

  const handleSubmit = (values, { resetForm }) => {
    if (user) {
      const updateUser = {
        ...user,
        useremail: values.formEmail,
        userphone: values.formPhone,
        useraddress: values.formAddress,
        city: values.formCity,
        region: values.formRegion
      }
      updateUser(updateUser).then(() => {
        console.log('Enviar a backend', updateUser)
        setIsFormSubmitted(true)
        setIsEditing(false)

        localStorage.removeItem(user)
        localStorage.setItem(user, JSON.stringify(updateUser))
        setUser(updateUser)
      })
    }

    resetForm()
  }

  return (
    <Container>
      <h3 className="text-center mt-4">Mi Cuenta</h3>

      <Card className="d-flex ms-4 mt-5 mb-5 border-0 rounded border-0 shadow w-100">
        <Card.Body>
          <Card.Title>Información</Card.Title>
          <Formik
            initialValues={{
              formEmail: user?.useremail ?? '',
              formPhone: user?.userphone ?? '',
              formAddress: user?.useraddress ?? '',
              formCity: user?.city ?? '',
              formRegion: user?.region ?? ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting, submitForm }) => (
              <Form className="d-flex flex-wrap" onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="w-100">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Field
                    type="email"
                    name="formEmail"
                    placeholder="Enter email"
                    as={Form.Control}
                    disabled={!isEditing}
                  />
                  <ErrorMessage
                    name="formEmail"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="w-100 mt-2">
                  <Form.Label>Teléfono</Form.Label>
                  <Field
                    type="text"
                    name="formPhone"
                    placeholder="Enter phone number"
                    as={Form.Control}
                    disabled={!isEditing}
                  />
                  <ErrorMessage
                    name="formPhone"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <div className="d-flex w-100 gap-2 mt-2 justify-content-between">
                  <Form.Group controlId="formAddress" className="custom-width">
                    <Form.Label>Dirección</Form.Label>
                    <Field
                      type="text"
                      name="formAddress"
                      placeholder="Enter address"
                      as={Form.Control}
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name="formAddress"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>

                  <Form.Group controlId="formCity" className="custom-width">
                    <Form.Label>Ciudad</Form.Label>
                    <Field
                      type="text"
                      name="formCity"
                      placeholder="Enter city"
                      as={Form.Control}
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name="formCity"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>

                  <Form.Group controlId="formRegion" className="custom-width">
                    <Form.Label>Región</Form.Label>
                    <Field
                      type="text"
                      name="formRegion"
                      placeholder="Enter region"
                      as={Form.Control}
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name="formRegion"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </div>

                {isEditing ? (
                  <Button
                    variant="primary"
                    type="button"
                    className="mt-4 buttonCustom"
                    onClick={() => {
                      setIsEditing(false)
                      submitForm()
                    }}
                  >
                    Guardar
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="mt-4 buttonCustom"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EditProfileCard
