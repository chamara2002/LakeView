import React, { useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CardPayF = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const { dispatch } = useCart();

  // State for form values and validation errors
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    securityCode: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    securityCode: "",
  });

  // Real-time validation function
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "cardNumber":
        if (!/^\d{16}$/.test(value)) {
          errorMsg = "Card number must be 16 digits.";
        }
        break;
      case "cardName":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMsg = "Name on card must contain only letters.";
        }
        break;
      case "expiryDate":
        const today = new Date();
        const selectedDate = new Date(value);

        // Check if the expiry date is valid and in the future
        if (!value) {
          errorMsg = "Expiry date is required.";
        } else if (selectedDate < today) {
          errorMsg = "Expiry date must be in the future.";
        }
        break;
      case "securityCode":
        if (!/^\d{3,4}$/.test(value)) {
          errorMsg = "Security code must be 3 or 4 digits.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value); // Real-time validation on input change
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const total = localStorage.getItem("total") ? localStorage.getItem("total") : 0;

    try {
      const meals = storedCart.map((item) => ({
        food: item._id,
        quantity: item.quantity,
      }));

      const totalPrice = storedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await axios.post("http://localhost:3000/api/order/add-order", {
        userId: user.user._id,
        meals,
        totalPrice,
        isCompleted: true,
      });

      alert("Order placed successfully!"); 
      localStorage.removeItem("cart");
      localStorage.removeItem("total");   
      navigate("/food/start");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout. Please try again.");
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
                  value={formValues.cardNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
                {errors.cardNumber && (
                  <span style={styles.error}>{errors.cardNumber}</span>
                )}
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
                  value={formValues.cardName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
                {errors.cardName && (
                  <span style={styles.error}>{errors.cardName}</span>
                )}
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
                    value={formValues.expiryDate}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  {errors.expiryDate && (
                    <span style={styles.error}>{errors.expiryDate}</span>
                  )}
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
                    value={formValues.securityCode}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  {errors.securityCode && (
                    <span style={styles.error}>{errors.securityCode}</span>
                  )}
                </div>
              </div>
              <button type="submit" style={styles.submitButton}>
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
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
  error: {
    color: "#FF4136",
    fontSize: "12px",
    marginTop: "8px",
  },
};

export default CardPayF;
