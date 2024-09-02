import React from 'react'
import { useState } from 'react';

const FoodNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item"><a href="#home">Home</a></li>
        <li className="navbar-item" onClick={toggleMenu}>
          Menu
          {menuOpen && (
            <ul className="dropdown">
              <li><a href="#item1">Item 1</a></li>
              <li><a href="#item2">Item 2</a></li>
              <li><a href="#item3">Item 3</a></li>
            </ul>
          )}
        </li>
        <li className="navbar-item" onClick={toggleServices}>
          Services
          {servicesOpen && (
            <ul className="dropdown">
              <li><a href="#service1">Service 1</a></li>
              <li><a href="#service2">Service 2</a></li>
              <li><a href="#service3">Service 3</a></li>
            </ul>
          )}
        </li>
        <li className="navbar-item"><a href="#offer">Offer</a></li>
      </ul>
    </nav>
  );
}

export default FoodNavBar;
