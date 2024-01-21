import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Shop from './Components/Shop';
import Contact from './Components/Contact';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Cart from './Components/Cart';


function App() {
  AOS.init();

  return (
    <div className="App">
      
      <Router>
      <Navbar />

        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
