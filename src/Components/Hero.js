import React from 'react'
import Navbar from './Navbar'
import play from '../Imgs/play-button.png'
import monitor from '../Imgs/monitor.png'
import men from '../Imgs/menb.png'

function Hero() {
    document.addEventListener("mousemove", anim);
    function anim(e){
        this.querySelectorAll('.layer').forEach(layer =>{
            const speed = layer.getAttribute('data-h')
            const x = (window.innerWidth - e.pageX*speed)/100
            const y = (window.innerWidth - e.pageY*speed)/100

            layer.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }
  return (
        <div className="container home d-flex">
            <div className="section-left w-50">
                <div className="hero-text">
                    <h4>The Best Online Store</h4>
                    <h1 className='fw-bolder display-3'>Ecommerce.</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores odio ea neque
                    </p>
                </div>
                <div className="hero-vid">
                <img src={play} alt="" />
                </div>
            </div>
            <div className="section-right w-50">
            <div className="product-box1 layer" data-h="3" data-aos="fade-left">
                <img src={monitor} alt="" />
                <h3>01.</h3>
                <h2>43" UltraWide Monitor</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing </p>
            </div>
            <div className="product-box2 layer" data-h="2"  data-aos="fade-down-left" >
            <h3>02.</h3>
                <h2>Mens Fashion</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing </p>
            <img src={men} alt="" />
            </div>
            </div>
        </div>
  )
}

export default Hero