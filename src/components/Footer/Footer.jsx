import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './Footer.css';
import LoginImg from "/src/assets/footer/login.png";
import BuyImg from "/src/assets/footer/compra.png";
import HeartImg from "/src/assets/footer/corazon.png";

function Footer() {
  return (
    <>
      <Container>
        <Row className='py-4'>
          <Col className=''>
            <div className='pre-footer d-flex flex-column align-items-center'>
              <Image className='pre-footer-img' src={LoginImg} alt="LoginImg" />
              <h3>Ingresa a tu cuenta</h3>
            </div>
          </Col>
          <Col className=''>
            <div className=' pre-footer d-flex flex-column align-items-center'>
              <Image className='pre-footer-img' src={BuyImg} alt="BuyImg" />
              <h3>Realiza tu compra</h3>
            </div>
          </Col>
          <Col>
            <div className='pre-footer d-flex flex-column align-items-center'>
              <Image className='pre-footer-img' src={HeartImg} alt="HeartImg" />
              <h3>Prepárate para recibir amor</h3>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className='footer-main w-100 h-100 d-flex justify-content-between align-items-center'>
        <Container>
          <Row xs={1} md={4} lg={6} className='footer-row m-auto'>
            <Col className='m-auto'>
              <div className='h-100 d-flex flex-column align-items-start'>
                <h3 className='h3-footer'>Contáctanos</h3>
                <div className='d-flex flex-column'>
                <a href='' className='m-0 link-to-category-footer'>+56 9 9876 5432</a>
                <a href='' className='m-0 link-to-category-footer'>ventas@eljardindeberni.cl</a>
                </div>
              </div>
            </Col>
            <Col className='m-auto'>
              <div className='d-flex flex-column align-items-start'>
                <h3 className='h3-footer'>Síguenos</h3>
                <div className='d-flex flex-column'>
                  <a href='' className='m-0 link-to-category-footer'>Instagram</a>
                  <a href='' className='m-0 link-to-category-footer'>Facebook</a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className='copyright-footer-end d-flex justify-content-center align-items-center h-100'>
        <p className='text-center h-100 p-0 m-0'>© 2024 El Jardín de Berni. Derechos reservados.</p>
      </Container>
    </>
  )
}

export default Footer;