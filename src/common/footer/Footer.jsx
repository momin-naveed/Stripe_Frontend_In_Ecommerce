import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container grid2">
          <div className="box">
            <h1>DigiTech</h1>
            <p>
              Digitech is an ecommerce website that offers a wide variety of
              digital products, including electronics, gadgets, software, and
              online courses.
            </p>
            <div className="icon d_flex">
              <div className="img d_flex">
                <i class="fa-brands fa-google-play"></i>
                <span>Google Play</span>
              </div>
              <div className="img d_flex">
                <i class="fa-brands fa-app-store-ios"></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className="box">
            <h2>About Us</h2>
            <ul>
              <li>
                <a href="/career">Careers</a>
              </li>
              <li>
                <a href="/x">Our Stores</a>
              </li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="box">
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>
                Islamia University Of Bahawalpur, Baghdad-ul-Jadeed, Ali Hall,
                Pakistan{' '}
              </li>
              <li>Email: momin@iub.edu.pk</li>
              <li>Phone: +92 307 8169353</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
