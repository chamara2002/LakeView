import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // You can replace path with actual route paths
    setIsOpen(false); // Close dropdown after selection
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const buttonStyle = {
    backgroundColor: '#c1b213',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  };

  const dropdownContentStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1,
  };

  const dropdownItemStyle = {
    color: 'black',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    cursor: 'pointer',
  };

  return (
    <div style={dropdownStyle}>
      <button style={buttonStyle} onClick={toggleDropdown}>
        Navigate Pages
      </button>
      <div style={dropdownContentStyle}>
        <div style={dropdownItemStyle} onClick={() => handleNavigation('/manageFoods')}>
          Manage foods
        </div>
        <div style={dropdownItemStyle} onClick={() => handleNavigation('/addFoods')}>
         ADD foods
        </div>
        <div style={dropdownItemStyle} onClick={() => handleNavigation('/manage/foodOrder')}>
        Manage Orders
        </div>
      </div>
    </div>
  );
};

export default DropdownNavBar;
