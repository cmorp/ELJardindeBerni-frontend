import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Row, Col } from 'react-bootstrap';
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import './AddProduct.css';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';

function AddProduct() {
  const { addProduct } = useContext(UserContext)
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Campo requerido.'),
    image: Yup.string().required('Campo requerido.'),
    price: Yup.number().required('Campo requerido.'),
    description: Yup.string().required('Campo requerido.')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    addProduct(values)
.then(()=> {
    Swal.fire({
      icon: 'success',
      title: '¡Producto publicado!',
      text: 'El producto se ha publicado exitosamente en la página.',
    })

    setSubmitting(false)
    navigate('/')
  })
  . catch (() => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'No se ha podido publicar el producto.',
    })
  })
  .finally (() => {
    setSubmitting(false)
  })
}

  return (
    <div>
      <Formik
        initialValues={{ productName: '',  image: '', price: '', description: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='border d-flex p-5 form-box m-auto mt-5 mb-5 justify-content-center shadow flex-wrap'>
            <Row className='w-50'>
              <Col xs={{ order: 'last' }}>
                <div className=''>
                  <div className='mb-2'>
                    <h4> NUEVO PRODUCTO <MdOutlineSell /> </h4>

                    <label className='form-label' htmlFor="productName">Nombre:</label>
                    <Field className='form-control' type="text" id="productName" name="productName" />
                    <ErrorMessage name="productName" component="div" className="error text-danger" />
                  </div>

                  <div className='mb-2'>
                    <label className='form-label' htmlFor="image">Imagen:</label>
                    <Field className='form-control' type="text" id="image" name="image" />
                    <ErrorMessage name="image" component="div" className="error text-danger" />
                  </div>

                  <div className='mb-2'>
                    <label className='form-label' htmlFor="price">Precio:</label>
                    <Field className='form-control' type="number" id="price" name="price" />
                    <ErrorMessage name="price" component="div" className="error text-danger" />
                  </div>

                  <div className='mb-2'>
                    <label className='form-label' htmlFor="description">Descripción:</label>
                    <Field className='form-control' type="text" id="description" name="description" />
                    <ErrorMessage name="description" component="div" className="error text-danger" />
                  </div>

                  <button className='publicar-button mt-3 px-4 py-2' type="submit" disabled={isSubmitting}>
                    Publicar
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='m-auto' xs={{ order: 'first' }} md={{ order: 'last' }} lg={{ order: 'last' }}>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddProduct;