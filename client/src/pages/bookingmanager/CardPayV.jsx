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

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 16);
    const formatted = limited.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };
  
  const formatSecurityCode = (value) => {
    return value.replace(/\D/g, '').substring(0, 3);
  };
  
  const validateField = (name, value) => {
    switch (name) {
      case "cardNumber":
        const cardNumberCleaned = value.replace(/\s/g, '');
        return /^\d{16}$/.test(cardNumberCleaned); // Returns true if valid
      case "cardName":
        return /^[A-Za-z\s]*$/.test(value); // Returns true if valid
      case "expiryDate":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        return (
          selectedDate.getFullYear() > currentDate.getFullYear() ||
          (selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() >= currentDate.getMonth())
        ); // Returns true if valid
      case "securityCode":
        return /^\d{3}$/.test(value); // Returns true if valid
      default:
        return true;
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    let formattedValue = value;
  
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "securityCode") {
      formattedValue = formatSecurityCode(value);
    } else if (name === "cardName") {
      // Allow only letters and spaces in card name
      formattedValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === "expiryDate") {
      // Prevent selecting previous months
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (
        selectedDate.getFullYear() < currentDate.getFullYear() ||
        (selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() < currentDate.getMonth())
      ) {
        formattedValue = ''; // Reset to empty if the selected date is invalid
      }
    }
  
    // Update the form data and validate
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  
    // Check for validity without error messages
    const isValid = validateField(name, formattedValue);
    if (!isValid) {
      // Optionally, you can implement logic to indicate invalid input to the user (e.g., UI changes)
    }
  };
  
  const validateForm = () => {
    let formIsValid = true;
  
    Object.keys(formData).forEach((field) => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        formIsValid = false;
      }
    });
  
    return formIsValid;
  };
  

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if the form is invalid
    }

    try {
      let response;
      if (bookingDetails.type === "movie") {
        response = await axios.post("http://localhost:3000/api/bkm/bookings", {
          customer: user.user._id,
          movie: bookingDetails.itemId,
          seatNumbers: bookingDetails.seatNumbers,
          totalPrice: bookingDetails.totalAmount,
          confirmed: true,
          date: bookingDetails.date,
          time: bookingDetails.time
        });
      } else if (bookingDetails.type === "game") {
        response = await axios.post("http://localhost:3000/api/bkg/game-bookings", {
          customer: user.user._id,
          game: bookingDetails.itemId,
          seatNumbers: bookingDetails.seatNumbers,
          totalPrice: bookingDetails.totalAmount,
          confirmed: true,
          date: bookingDetails.date,
          time: bookingDetails.time
        });
      } else {
        throw new Error("Invalid booking type");
      }

      if (response.status === 201) {
        alert("Payment Successful");
        navigate(bookingDetails.type === "movie" ? "/movies" : "/games");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      alert("Payment Failed");
      console.error("Error processing payment:", error);
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
                  placeholder="1234 5678 9123 4567"
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
                    placeholder="•••"
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
                Pay Now
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
