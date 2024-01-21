import React from 'react'

import { Player } from "@lottiefiles/react-lottie-player";
import Footer from './Footer';

function Contact() {
  return (
    <div>
    <div className='container'>
      <div className="contact">
      <div className="contact-left">
        <h1>Let's chat.<br/>Tell us about your issue or feedback</h1>
        <p>Let's create something together✌️</p>

        <div className="mail-box">
          <div className="icon">
          <i class="uil uil-envelope-check"></i>
          </div>
          <div className="mail-text">
              <p>Mail us at</p>
              <a href="gmail.com">connect@shoppmy.com</a>
          </div>
        </div>
      </div>
      <div className="contact-right">
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_GTuUknTpTI.json"
        ></Player>
      </div>
      </div>
      <div className="contact-form">
        <div className="contact-form-left">
        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/packages/lf20_akvycwlq.json"
        ></Player>
        </div>
        <div className="contact-form-right">
          <form>
          <h1>Send us a message🚀</h1>
          <input type="text" placeholder='Full name*' />
          <input type="email" name="email" id="email" placeholder='Email address*' />
          <input type="text" name="subject" id="subject" placeholder='Subject' />
          <label htmlFor="Tell">Tell us more about your issue or feedback*</label>
          <textarea name="main-msg" id="msg" cols="30" rows="5"></textarea>
          <button className="btn send">Send message</button>
          </form>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default Contact