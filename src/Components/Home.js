import React from 'react'
import Hero from './Hero';
import Offer from './Offer';
import HomeProducts from './HomeProducts';
import Subscribe from './Subscribe';
import Slider from './Slider';
import Footer from './Footer';

function Home() {
  return (
    <div>
        <Hero />
      <HomeProducts api={"https://api.escuelajs.co/api/v1/products?offset=0&limit=6"} />
      <Offer />
      <Subscribe/>
      <Slider />
      <Footer/>
    </div>
  )
}

export default Home