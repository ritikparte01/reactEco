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
      <Offer />
      <HomeProducts api={"https://fakestoreapi.com/products?limit=6"} />
      <Subscribe/>
      <Slider />
      <Footer/>
    </div>
  )
}

export default Home