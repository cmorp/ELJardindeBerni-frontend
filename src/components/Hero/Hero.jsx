import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'
import './Hero.css'
import Bg1 from '/src/assets/hero/bg1.jpg'
import Bg2 from '/src/assets/hero/bg2.jpg'
import Bg3 from '/src/assets/hero/bg3.jpg'

function Hero() {
  // console.log('Función autoScrollCarousel')

  useEffect(() => {
    autoScrollCarousel()
  }, [])

  let scrollPosition = 0

  function animateScroll() {
    const carousel = document.querySelector('.carousel-container')
    const carouselWidth = carousel?.offsetWidth
    const slideWidth = carousel.querySelector('.slide-mobile').offsetWidth
    const scrollAmount = slideWidth + 10

    if (scrollPosition >= carousel.scrollWidth - carouselWidth) {
      scrollPosition = 0
    } else {
      scrollPosition += scrollAmount
    }

    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    setTimeout(animateScroll, 5000)
  }

  function autoScrollCarousel() {
    animateScroll()
  }

  return (
    <Container
      fluid
      className="hero-bg d-flex justify-content-between align-items-center"
    >
      <div className="carousel-container">
        <div className="carousel-inner-mobile">
          <div className="bgHeroImg slide-mobile">
            <Image src={Bg1} />
          </div>
          <div className="bgHeroImg slide-mobile">
            <Image src={Bg2} />
          </div>
          <div className="bgHeroImg slide-mobile">
            <Image src={Bg3} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Hero
