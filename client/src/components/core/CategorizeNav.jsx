import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const CategorizeNav = ({
  onCategoryClick,
  onIndoorClick,
  onOutdoorClick,
  onWaterClick,
  onTodayClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    backgroundColor: "#1b1f38",
    color: "white",
    padding: isOpen ? "20px" : "10px",
    borderRadius: "10px",
    width: isOpen ? "300px" : "60px",
    height: "30vh",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const containerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const toggleButtonStyle = {
    display: isOpen ? "none" : "block",
    fontSize: "2rem",
    cursor: "pointer",
    position: "absolute",
    top: "15px",
    right: "15px",
  };

  const headingStyle = {
    display: isOpen ? "block" : "none",
    cursor: "pointer",
  };

  const listStyle = {
    display: isOpen ? "block" : "none",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    marginBottom: "15px",
    fontSize: "18px",
    cursor: "pointer",
    padding: "10px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <h2 style={headingStyle} onClick={onCategoryClick}>
          Categorize
        </h2>
        <ul style={listStyle}>
          <li style={listItemStyle} onClick={onIndoorClick}>
            Indoor Games
          </li>
          <li style={listItemStyle} onClick={onOutdoorClick}>
            Outdoor Games
          </li>
          <li style={listItemStyle} onClick={onWaterClick}>
            Water Games
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
