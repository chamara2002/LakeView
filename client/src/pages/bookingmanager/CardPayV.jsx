import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../foodManagement/context/BookingContext";

const CardPayV = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookingDetails } = useContext(BookingContext);

  const handlePayment = async (e) => {
    e.preventDefault(); 

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
      <NavBar name="events" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Victory Arena</h1>
          <h2 style={styles.subTitle}>Booking Form</h2>
        </div>
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
    backgroundColor: "#1E1E1E",
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
};

export default CardPayV;
