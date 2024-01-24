import React, { useState } from "react";
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Shop from './Components/Shop';
import Contact from './Components/Contact';
import 'react-loading-skeleton/dist/skeleton.css'
import Cart from './Components/Cart';

function MainComp({tokencode, setTokenCode}) {
    // const [token, settoken] = useState(localStorage.getItem("userToken") ?? null );
  return <div>
    
    <Router>
      <Navbar tokencode={tokencode} setTokenCode={setTokenCode} />

        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/cart' element={<Cart />}/>  
      </Routes>
      </Router>
    
    </div>;
}

export default MainComp;
