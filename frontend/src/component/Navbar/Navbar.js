import React from 'react';
import './navbar.css';
import logo from '../../items/clozet_logo.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping, faUser, faSearch} from "@fortawesome/free-solid-svg-icons"


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li className="navbar-link">Lehenga</li>
        <li className="navbar-link">Gowns</li>
        <li className="navbar-link">Dresses</li>
      </ul>
      <div className="navbar-right">
        <form>
          <input type="text" placeholder="Search..." className="search-input" />
          <button type="submit" className="search-button"></button>
        </form>
        <div className="navbar-icons">
        <FontAwesomeIcon className='search-icon' icon={faSearch} ></FontAwesomeIcon>
        <FontAwesomeIcon className='login-icon' icon={faUser} ></FontAwesomeIcon>
        <FontAwesomeIcon className='cart-icon' icon={faCartShopping} ></FontAwesomeIcon>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;