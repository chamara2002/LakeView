import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the chosen path
    setIsOpen(false); // Close dropdown after selection
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#FFD700', // Gold background
    color: '#000', // Black text
    border: 'none',
    minWidth: '200px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const dropdownContentStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#1E2749', // Dark blue background
    minWidth: '200px',
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    borderRadius: '5px',
  };

  const dropdownItemStyle = {
    padding: '12px 16px',
    backgroundColor: '#1E2749', // Dark blue
    color: '#FFD700', // Gold text
    textAlign: 'left',
    textDecoration: 'none',
    display: 'block',
    border: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#2A3559', // Lighter blue on hover
  };

  return (
    <div style={dropdownStyle}>
      <button style={buttonStyle} onClick={toggleDropdown}>
        Navigate Options
      </button>
      <div style={dropdownContentStyle}>
        <div
          style={{ ...dropdownItemStyle, ...(isOpen ? dropdownItemHoverStyle : {}) }}
          onClick={() => handleNavigation('/manageFoods')}
        >
          Manage Food Items
        </div>
        <div
          style={{ ...dropdownItemStyle, ...(isOpen ? dropdownItemHoverStyle : {}) }}
          onClick={() => handleNavigation('/addFoods')}
        >
          ADD Menu
        </div>
        <div
          style={{ ...dropdownItemStyle, ...(isOpen ? dropdownItemHoverStyle : {}) }}
          onClick={() => handleNavigation('/manage/foodOrder')}
        >
          Manage Orders
        </div>
      </div>
    </div>
  );
};

export default DropdownNavBar;
