import React from 'react'

import { Player, Controls } from "@lottiefiles/react-lottie-player";

function AboutComp(props) {
  return (
            <div className="container about" style={props.style}>
      <div className="about-left">
        <div dangerouslySetInnerHTML={{ __html: props.heading }}></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          accusantium repellendus qui illo inventore pariatur aut, eveniet
          dolores dignissimos quia voluptatum nihil blanditiis iure, debitis
          tempore. Esse ad similique reiciendis.
        </p>
        <a href="#">
          Learn More <i className="uil uil-arrow-from-right"></i>
        </a>
      </div>

      <div className="about-right" data-aos="fade-left">
        <Player
          autoplay
          loop
          src={props.link}
        ></Player>
      </div>
    </div>
  )
}

export default AboutComp