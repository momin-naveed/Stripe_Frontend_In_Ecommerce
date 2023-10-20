import React, { useEffect, useState } from 'react';
import logo from '../../components/assets/images/log.png';
import { Link } from 'react-router-dom';
import './search.css';
const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    search.classList.toggle('active', window.scrollY > 100);
  });

  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    const localEmail = localStorage.getItem('token');
    if (localEmail) {
      setIslogin(true);
    }
  }, []);

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <Link to="/">
            <div className="logo width ">
              <img src={logo} alt="" />
            </div>
          </Link>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>All Category</span>
          </div>

          <div className="icon f_flex width">
            <Link to="/sign-in">
              <i className="fa fa-user icon-circle"></i>
            </Link>

            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? '' : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
