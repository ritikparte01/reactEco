import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Imgs/logo.png";
import Cart from './Cart'
import { refresh } from "aos";
import axios from "axios";

function Navbar({tokencode, setTokenCode}) {
  // const [localToken, setLocalToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");


  function toggle() {
    var x = document.getElementById("menu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  const Logout = () =>{
    setTokenCode("");
    localStorage.clear('userToken');
    window.refresh();
  }

  const localToken = localStorage.getItem('userToken');

  useEffect(() => {
      axios({
        method: 'GET',
        url: 'https://api.escuelajs.co/api/v1/auth/profile',
        headers:{
          Authorization: `Bearer ${localToken}`,
        }
      }).then((res)=>{
        console.log('Auth log',res);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
        setUserRole(res.data.role);
        setUserId(res.data.id);
      })
  }, [tokencode])
  

  return (
    <div>
      <div className="container navbar">
      {/* <Cart /> */}
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="bars">
          <a onClick={toggle}>
            <i className="uil uil-align-right"></i>
          </a>
        </div>
        <div className="menu" id="menu">
          <ul className="list-unstyled">
            <li>
              <Link className="menu-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/contact">
                Contact
              </Link>
            </li>
            {/* <li>
              <button
                type="button"
                className="btn btn-orange"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
                <i className="uil uil-shopping-bag"></i>
              </button>
            </li> */}
             <li>
              <Link className="menu-link" to="/cart">
              <button
                type="button"
                className="btn btn-orange"
              >
                <i className="uil uil-shopping-bag"></i>
              </button>
              </Link>
            </li>
            <li>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hi ! {userName}
              </button>
              <ul className="dropdown-menu">
                <li><div className="drop_flex"><p>User ID </p><span>{userId}</span></div></li>
                <li><div className="drop_flex"><p>Email </p><span>{userEmail}</span></div></li>
                <li><div className="drop_flex"><p>Role </p><span>{userRole}</span></div></li>
                <li><button className="dropdown-item btn btn-danger logout_btn" onClick={Logout}>Logout</button></li>
              </ul>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
