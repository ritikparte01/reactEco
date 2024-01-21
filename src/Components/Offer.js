import React from 'react'
import offerImg from '../Imgs/offerImg.jpg'
import imgThumb1 from '../Imgs/imgThumb1.jpg'
import imgThumb2 from '../Imgs/imgThumb2.jpg'
import { Player, Controls } from "@lottiefiles/react-lottie-player";


function Offer() {
  return (
    <div>
        <div className="container offer d-flex justify-content-between">
            <div className="offer-section-left w-50">
                <div className="offer-text d-flex justify-content-between">
                    <div className="discount">
                        <h4 className='lh-base'>SPECIAL DISCOUNT <span>UP TO 50% OFF</span> FOR ALL ITEMS</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad incidunt molestiae sunt, atque laborum saepe?</p>
                    </div>
                    <div className="date">
                        <h4 className='lh-base'>AVAILABLE AT <span>31ST DEC</span> CHECK OUR WEBSITE.!!</h4>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad incidunt molestiae sunt, atque laborum saepe?</p>
                    </div>
                </div>
                {/* <img className='img-fluid offer-img-main' data-aos="fade-right"  src={offerImg} alt="" /> */}
                <Player className='mt-5 pt-4'
          autoplay
          loop
          src={"https://assets2.lottiefiles.com/packages/lf20_PaPXUtTEjr.json"}
          style={{width:'400px'}}
        ></Player>
            </div>
            <div className="offer-section-right w-50">
                <div className="thumb-images" data-aos="fade-left">
                    <img className='layer' data-h="0.3" src={imgThumb1} alt="" />
                    <img className='layer' data-h="0.3" src={imgThumb2} alt="" />
                </div>
                <h1 className='sale-main display-3'><span>SELLING</span> ONLY THE BEST THINGS <span>ONLINE</span></h1>
            </div>
        </div>
    </div>
  )
}

export default Offer