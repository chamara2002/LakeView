import React, { useEffect, useContext, useState } from "react"; // Add useContext import
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";
import CartSummary from "./CartSummery";
import { useCart } from "./context/CartContext";

const FoodPurchase = () => {
  const [movie, setMovie] = React.useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dispatch } = useCart();
  const [cart, setCart] = useState([]);

  const handleCashPay = async () => {
    // Retrieve the cart items and total from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const total = localStorage.getItem("total")
      ? localStorage.getItem("total")
      : 0;

    if (!savedCart || savedCart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setCart(savedCart); // Update the cart state

    // Calculate the meals and total price based on the saved cart
    const meals = savedCart.map((item) => ({
      food: item._id,
      quantity: item.quantity,
    }));

    const totalPrice = savedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    try {
      // Post request to the backend
      await axios.post("http://localhost:3000/api/order/add-order", {
        userId: user.user._id,
        meals,
        totalPrice: total,
        isCompleted: false,
      });

      // Redirect or show a success message
      dispatch({ type: "CLEAR_CART" });
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      navigate("/food/start");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar name="foods" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>{movie.name}</h1>
          <h2 style={styles.subTitle}></h2>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
          <h3 style={{ color: "white", fontSize: "26px" }}>Bill Information</h3>
            <CartSummary />
          </div>
          <div style={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <button
              style={styles.button}
              onClick={() => navigate(`/PayOnlineFood`)}
            >
              Card Payment &rarr;
            </button>
            <button style={styles.button} onClick={handleCashPay}>
              Cash on Arrival &rarr;
            </button>
            <button style={styles.button} onClick={() => navigate("/cart")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#161E38",
    color: "#FFFFFF",
    minHeight: "70vh",
  },
  header: {
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "36px",
    margin: "0",
  },
  subTitle: {
    fontSize: "24px",
    margin: "0",
  },
  body: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "40px",
  },
  billInformation: {
    backgroundColor: "#1D284C",
    color: "#000000",
    padding: "20px",
    borderRadius: "8px",
    width: "40%",
    
  },
  paymentMethod: {
    backgroundColor: "#858DA8",
    color: "#000000",
    padding: "20px",
    borderRadius: "8px",
    width: "40%",
    fontSize: "24px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    margin: "10px 0",
    fontSize: "16px",
    backgroundColor: "#FFBB00",
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  
};

export default FoodPurchase;
