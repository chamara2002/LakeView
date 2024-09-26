import React, { useState, useContext } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../foodManagement/context/BookingContext";

const CardPayV = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookingDetails } = useContext(BookingContext);

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    securityCode: ''
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    securityCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate card number (12 digits only)
    if (!/^\d{12}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 12 digits";
      formIsValid = false;
    }

    // Validate card name (letters only)
    if (!/^[A-Za-z\s]+$/.test(formData.cardName)) {
      newErrors.cardName = "Name on card must contain only letters";
      formIsValid = false;
    }

    // Validate expiry date (month after current month)
    const currentDate = new Date();
    const selectedDate = new Date(formData.expiryDate);
    if (selectedDate <= currentDate) {
      newErrors.expiryDate = "Expiry date must be a future month";
      formIsValid = false;
    }

    // Validate security code (4 digits only)
    if (!/^\d{4}$/.test(formData.securityCode)) {
      newErrors.securityCode = "Security code must be exactly 4 digits";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if the form is invalid
    }

    if (bookingDetails.type === "movie") {
      try {
        await axios.post("http://localhost:3000/api/bkm/bookings", {
          customer: user.user._id,
          movie: bookingDetails.itemId,
          seatNumbers: bookingDetails.seatNumbers,
          totalPrice: bookingDetails.total,
          confirmed: true,
        });
        alert("Payment Successful");
        navigate(`/movies`);
      } catch (e) {
        alert("Payment Failed");
        console.error("Error paying for event:", e);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/api/bkg/game-bookings", {
          customer: user.user._id,
          game: bookingDetails.itemId,
          seatNumbers: bookingDetails.seatNumbers,
          totalPrice: bookingDetails.total,
          confirmed: true,
        });
        alert("Payment Successful");
        navigate(`/games`);
      } catch (e) {
        alert("Payment Failed");
        console.error("Error paying for event:", e);
      }
    }
  };

  return (
    <>
      <NavBar name="" />
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
                  placeholder="1234 5678 9123"
                  style={styles.input}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.cardNumber && (
                  <span style={styles.errorText}>{errors.cardNumber}</span>
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
                  style={styles.input}
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
                {errors.cardName && (
                  <span style={styles.errorText}>{errors.cardName}</span>
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
                    style={styles.input}
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.expiryDate && (
                    <span style={styles.errorText}>{errors.expiryDate}</span>
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
                    style={styles.input}
                    value={formData.securityCode}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.securityCode && (
                    <span style={styles.errorText}>{errors.securityCode}</span>
                  )}
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
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  paymentSection: {
    backgroundColor: "#2B2B2B",
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
    color: "#00C0FF",
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
    color: "#CCCCCC",
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
    backgroundColor: "#00C0FF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default CardPayV;
