import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Imgs/logo.png";
import Cart from './Cart'

function Navbar({tokencode, setTokenCode}) {
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
    localStorage.clear();
  }

  return (
    <div>
      <div className="container navbar">
      {/* <Cart /> */}
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="bars">
          <a onClick={toggle}>
            <i class="uil uil-align-right"></i>
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
                <i class="uil uil-shopping-bag"></i>
              </button>
            </li> */}
             <li>
              <Link className="menu-link" to="/cart">
              <button
                type="button"
                className="btn btn-orange"
              >
                <i class="uil uil-shopping-bag"></i>
              </button>
              </Link>
            </li>
            <li>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item">Action</a></li>
                <li><a class="dropdown-item">Another action</a></li>
                <li><a class="dropdown-item" onClick={Logout}>Logout</a></li>
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
