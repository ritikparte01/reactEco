import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import 'react-loading-skeleton/dist/skeleton.css'
import LoginComp from './Components/LoginComp';
import { useState } from 'react';
import MainComp from './MainComp';


function App() {
  const [tokencode, setTokenCode] = useState("");
  AOS.init();

  // const [token, settoken] = useState(localStorage.getItem("userToken") ?? null );

  return (
    <div className="App">
         {localStorage.getItem("userToken") ? <MainComp tokencode={tokencode} setTokenCode={setTokenCode} /> : <LoginComp tokencode={tokencode} setTokenCode={setTokenCode}  /> }
    </div>
  );
}

export default App;
