import React from "react";
import { useCart } from "../../pages/foodManagement/context/CartContext";
import { useAuth } from "../../pages/foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { dispatch } = useCart();
  const { user,authState } = useAuth();
  const navigate = useNavigate();

  const addToCart = () => {
    if (authState.isAuthenticated) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...food, quantity: 1 },
      });
    } else {
      alert("Please login to add items to cart!");
      navigate('/login');
    }
  };

  return (
    <div style={styles.foodCard}>
      <img src={food.imageUrl} alt={food.name} style={styles.foodImage} />
      <div style={styles.foodDetails}>
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>Rs.{food.price.toFixed(2)}</p>
        {/* <div style={styles.foodRating}>
          <span>⭐ {Math.floor(Math.random() * 5) + 1}</span>
        </div> */}
      </div>
      <div style={styles.favoriteIcon}>💛</div>
      <button style={styles.addToCartBtn} onClick={addToCart}>
        Add to Cart
      </button>
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
  foodCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
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
  foodRating: {
    marginTop: "10px",
    color: "#f39c12",
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
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    fontSize: "1em",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  addToCartBtnHover: {
    backgroundColor: "#218838",
  },
};

export default FoodCard;
