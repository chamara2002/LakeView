import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useCart } from "./context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../foodManagement/context/BookingContext";

const CardPayF = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const {dispatch} = useCart();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Loaded cart:", storedCart); // Check if the cart data is correct
    setCart(storedCart);

    const total = localStorage.getItem("total")
      ? localStorage.getItem("total")
      : 0;

    try {
      // Collect cart items
      const meals = storedCart.map((item) => ({
        food: item._id,
        quantity: item.quantity,
      }));
      console.log("Meals to be sent:", meals); // Verify that meals data is correct

      // Calculate total price
      const totalPrice = storedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      console.log("Total price:", totalPrice); // Verify total price calculation

      // Post request to the backend
      await axios.post("http://localhost:3000/api/order/add-order", {
        userId: user.user._id,
        meals,
        totalPrice: totalPrice, // Use calculated totalPrice
        isCompleted: true,
      });

      // Redirect or show a success message
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      navigate("/food/start");
      dispatch({ type: "CLEAR_CART" }); // Clear cart in the context
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <NavBar name="foods" />
      <div style={styles.container}>
       
        <div style={styles.body}>
          <div style={styles.paymentSection}>
            <h3 style={styles.sectionTitle}>Card Payment</h3>
            <form style={styles.form} onSubmit={handlePayment}>
              <div style={styles.inputGroup}>
                <label htmlFor="cardNumber" style={styles.label}>
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9123 4567"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="cardName" style={styles.label}>
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroupRow}>
                <div style={styles.inputGroupSmall}>
                  <label htmlFor="expiryDate" style={styles.label}>
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    id="expiryDate"
                    name="expiryDate"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroupSmall}>
                  <label htmlFor="securityCode" style={styles.label}>
                    Security Code
                  </label>
                  <input
                    type="password"
                    id="securityCode"
                    name="securityCode"
                    placeholder="••••"
                    style={styles.input}
                    required
                  />
                </div>
              </div>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#161E38",
    color: "#FFFFFF",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginBottom: "30px",
  },
  mainTitle: {
    fontSize: "42px",
    margin: "0",
    color: "#00C0FF",
  },
  subTitle: {
    fontSize: "28px",
    margin: "10px 0 0 0",
    color: "#CCCCCC",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  paymentSection: {
    backgroundColor: "#1D284C",
    color: "#FFFFFF",
    padding: "40px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#FFFFFF",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  inputGroupRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
  },
  inputGroupSmall: {
    flex: "1",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#ffffff",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#333333",
    color: "#FFFFFF",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "15px 20px",
    fontSize: "18px",
    backgroundColor: "#FFBB00",
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  },
};

export default CardPayF;
