import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodDropDown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyle = {
    position: "relative",
    display: "inline-block",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const dropdownContentStyle = {
    display: isOpen ? "block" : "none",
    position: "absolute",
    backgroundColor: "#1E2749",
    minWidth: "200px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    borderRadius: "5px",
  };

  const dropdownItemStyle = {
    padding: "12px 16px",
    backgroundColor: "#1E2749",
    color: "#FFD700",
    textAlign: "left",
    textDecoration: "none",
    display: "block",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={dropdownStyle}>
      <button onClick={toggleDropdown} style={buttonStyle}>
        Manage Food Options
      </button>
      <div style={dropdownContentStyle}>
        <button
          onClick={() => navigate("/addFoods")}
          style={dropdownItemStyle}
        >
          Add Food
        </button>
        <button
          onClick={() => navigate('/manage/foodOrder')}
          style={dropdownItemStyle}
        >
          Manage Orders
        </button>
      </div>
    </div>
  );
};

export default FoodDropDown;
