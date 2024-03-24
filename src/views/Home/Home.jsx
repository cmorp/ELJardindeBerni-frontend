import React from 'react'
import './Home.css';
import { Container } from 'react-bootstrap';
import Hero from '../../components/Hero/Hero'
import Cards from '../../components/Cards/Cards';


function Home() {
  return (
    <>
      <Hero />
      <Container className='my-4'>
        <Cards />
      </Container>
      <div className='text d-flex justify-content-center align-items-center'>
        <h2>Regala(te) vida. Regala(te) plantas</h2></div> 
    </>
  )
}

export default Home;