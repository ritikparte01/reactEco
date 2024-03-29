import React from "react";
import './Footer.css'
import logo from '../Imgs/logo.png'

function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-lg-3 about-footer">
                {/* <h3>Lorem Ipsum dummy text </h3> */}
                <img src={logo} alt="" />
                <ul>
                  <li>
                    <a href="tel:(010) 1234 4321">
                    <i className="uil uil-phone-pause"></i>(010) 1234
                      4321
                    </a>
                  </li>
                  <li>
                  <i className="uil uil-map-marker"></i>
                    1 / 105 Bay Lights,
                    <br />
                    Lorem Ipsum,
                    <br />
                    LIC 3201
                  </li>
                </ul>
                <a href="" className="f-btn red-btn">
                  Book Now
                </a>
              </div>
              <div className="col-md-6 col-lg-2 page-more-info">
                <div className="footer-title">
                  <h4>Page links</h4>
                </div>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Shop</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-6 col-lg-3 page-more-info">
                <div className="footer-title">
                  <h4>More Info</h4>
                </div>
                <ul>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Free Coupens</a>
                  </li>
                  <li>
                    <a href="#">Special Discounts</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 open-hours">
                <div className="footer-title">
                  <h4>Open hours</h4>
                  <ul className="footer-social">
                    <li>
                      <a href="" target="_blank">
                      <i className="uil uil-facebook-f px-2 py-1"></i>
                      </a>
                    </li>
                    <li>
                      <a href="" target="_blank">
                      <i className="uil uil-instagram px-2 py-1"></i>
                      </a>
                    </li>
                    <li>
                      <a href="" target="_blank">
                      <i className="uil uil-linkedin-alt px-2 py-1"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Monday Thursday
                      </td>
                      <td>9:00am - 5:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Friday
                      </td>
                      <td>9:00am - 4:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Sturday
                      </td>
                      <td>9:00am - 1:30pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Sunday
                      </td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div className="footer-logo">
                  <table>
                    <tbody>
                      <tr />
                      <td>
                        <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                      </td>
                      <td>
                        <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                      </td>
                      <td>
                        <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                      </td>
                      <td>
                        <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                      </td>
                      <td>
                        <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                      </td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <div className="row">
              <div className="col-sm-4">
                <a href="">Design & Developed By Team Snappify</a>
              </div>
              <div className="col-sm-8">
                <p>Shop.My @ 2022 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
