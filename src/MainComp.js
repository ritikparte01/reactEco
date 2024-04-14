import React, { useState, useEffect } from "react";
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Shop from './Components/Shop';
import Contact from './Components/Contact';
import 'react-loading-skeleton/dist/skeleton.css'
import Cart from './Components/Cart';
import ProdDetail from "./Components/ProdDetail";
import Confirmation from "./Components/Confirmation";
import ConfirmationLs from "./Components/ConfirmationLs";

function MainComp({tokencode, setTokenCode}) {
    // const [token, settoken] = useState(localStorage.getItem("userToken") ?? null );
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        // Redirect to the home page when the user tries to refresh
        event.preventDefault();
        window.location.href = '/';
        
      };
      window.addEventListener('beforeunl;oa*-d', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
  return <div>
    
    <Router>
      <Navbar tokencode={tokencode} setTokenCode={setTokenCode} />

        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/cart' element={<Cart />}/>  
        <Route path='/detail' element={<ProdDetail />}/>  
        <Route path='/confirmation' element={<Confirmation />}/>  
        <Route path='/confirmationls' element={<ConfirmationLs />}/>  
      </Routes>
      </Router>
    
    </div>;
}

export default MainComp;
