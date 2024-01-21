import React from "react";
import { Link } from "react-router-dom";
import logo from "../Imgs/logo.png";
import Cart from './Cart'

function Navbar() {
  function toggle() {
    var x = document.getElementById("menu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


  // function cartShow() {
  //   var c = document.getElementById("exampleModal");
  //   if (c.style.display === "none") {
  //     c.style.display = "block";
  //   } else {
  //     c.style.display = "none";
  //   }
  // }

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
            <li>
              <button
                type="button"
                className="btn btn-orange"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
                <i class="uil uil-shopping-bag"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
