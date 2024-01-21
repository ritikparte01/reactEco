import React from "react";
import AboutComp from "./AboutComp";
import Footer from "./Footer";


function About() {
  return (
    <div>
      <AboutComp style={{flexDirection: 'row', '@media only screen and (max-width: 450px)': {
    background: 'red' }}}  heading="<h1>We Keep Our <span>Customers </span>Always Happy & Connected</h1>" link={"https://assets4.lottiefiles.com/packages/lf20_D1FcUL.json"} />

      <AboutComp style={{flexDirection: 'row-reverse'}} heading="<h1>We Always Delivers <span>Best Quality</span> Products</h1>" link={"https://assets4.lottiefiles.com/packages/lf20_7jp89prg.json"} />

      <AboutComp style={{flexDirection: 'row'}} heading="<h1>You'll find <span>Best Discounts</span> on our Store</h1>" link={"https://assets7.lottiefiles.com/packages/lf20_4ja25j0z.json"}  />

      <AboutComp style={{flexDirection: 'row-reverse'}} heading="<h1>We Provide Instant <span>One Day</span> Delivery</h1>" link={"https://assets5.lottiefiles.com/packages/lf20_rrw4rw07.json"} />

      <AboutComp style={{flexDirection: 'row'}} heading="<h1>You'll Get <span>7 Days Easy</span> Return Policy</h1>" link={"https://assets7.lottiefiles.com/packages/lf20_3tryizhw.json"}  />

  <Footer/>
    </div>

  );
}

export default About;
