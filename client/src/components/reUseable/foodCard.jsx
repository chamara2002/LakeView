import React, { useState, useEffect } from "react";
import { useCart } from "../../pages/foodManagement/context/CartContext";
import { useAuth } from "../../pages/foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FoodCard = ({ food }) => {
  const { dispatch } = useCart();
  const { authState } = useAuth();
  const navigate = useNavigate();

  const addToCart = () => {
    if (authState.isAuthenticated) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...food, quantity: 1 },
      });

      // Show success toast
      toast.success(`${food.name} has been added to your cart!`, {
        position: "top-right",
        autoClose: 1000, // Toast lasts for 1 seconds
        onClose: () => navigate('/food'), // Redirect after toast closes
      });
    } else {
      // Show warning toast
      toast.warn("Please login to add items to the cart!", {
        position: "top-right",
        autoClose: 1000, // Toast lasts for 1 seconds
        onClose: () => navigate('/login'), // Redirect after toast closes
      });
    }
  };

  return (
    <div style={styles.foodCard}>
      <img src={food.imageUrl} alt={food.name} style={styles.foodImage} />
      <div style={styles.foodDetails}>
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>Rs.{food.price.toFixed(2)}</p>
      </div>
      <div style={styles.favoriteIcon}>💛</div>
      <button style={styles.addToCartBtn} onClick={addToCart}>
        Add to Cart
      </button>
      <ToastContainer /> {/* Ensure the ToastContainer is rendered */}
    </div>
  );
};

const styles = {
  foodCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
  },
  foodImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderBottom: "1px solid #ddd",
  },
  foodDetails: {
    padding: "15px",
    textAlign: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "1.5em",
    color: "#f39c12",
    cursor: "pointer",
  },
  addToCartBtn: {
    backgroundColor: "#FFBB00",
    color: "Black",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    fontSize: "1em",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default FoodCard;
