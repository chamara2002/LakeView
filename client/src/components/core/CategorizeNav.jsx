import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const CategorizeNav = ({
  onCategoryClick,
  onIndoorClick,
  onOutdoorClick,
  onWaterClick,
  onTodayClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (category, callback) => {
    setActiveCategory(category);
    callback();
  };

  const sidebarStyle = {
    backgroundColor: '#1d284c',
    color: '#fff',
    padding: isOpen ? '20px' : '10px',
    borderRadius: '8px',
    width: '300px',
    height: '45vh',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '55px',
  };

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const toggleButtonStyle = {
    display: isOpen ? 'none' : 'block',
    fontSize: '2rem',
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
  };

  const headingStyle = {
    display: isOpen ? 'block' : 'none',
    cursor: 'pointer',
    fontSize: '20px',
    marginBottom: '30px',
  };

  const listStyle = {
    display: isOpen ? 'block' : 'none',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const listItemStyle = (category) => ({
    fontSize: '13px',
    width: '150px',
    height: '10px',
    backgroundColor: activeCategory === category ? '#FFD700' : '#fff',
    color: activeCategory === category ? '#000' : '#000',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
  });

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <h2 style={headingStyle}>Categorize</h2>
        <ul style={listStyle}>
          <li
            style={listItemStyle('all')}
            onClick={() => handleClick('all', onCategoryClick)}
          >
            All Games
          </li>
          <li
            style={listItemStyle('indoor')}
            onClick={() => handleClick('indoor', onIndoorClick)}
          >
            Indoor Games
          </li>
          <li
            style={listItemStyle('outdoor')}
            onClick={() => handleClick('outdoor', onOutdoorClick)}
          >
            Outdoor Games
          </li>
          <li
            style={listItemStyle('water')}
            onClick={() => handleClick('water', onWaterClick)}
          >
            Water Games
          </li><br></br><br></br><br></br><br></br>
          <li
            style={listItemStyle('today')}
            onClick={() => handleClick('today', onTodayClick)}
          >
            Today Available
          </li>
        </ul>
      </div>
      <div style={toggleButtonStyle} onClick={toggleSidebar}>
        <FaBars />
      </div>
    </div>
  );
};

export default CategorizeNav;
