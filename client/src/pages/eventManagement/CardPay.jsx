import React, { useEffect, useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CardPay = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/event/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await axios.post("http://localhost:3000/api/payment/add-payment", {
        participant: user.user._id,
        event: id,
        amount: event.price,
        status: "accepted",
      });
      alert("Payment Successful");
      navigate(`/eventdashboard`);
    } catch (e) {
      alert("Payment Failed");
      console.error("Error paying for event:", e);
    }
  };

  return (
    <>
      <NavBar name="" />
      <div style={styles.container}>
        <div style={styles.header}></div>
        <div style={styles.body}>
          <div
            style={styles.paymentSection}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
              <button
                type="submit"
                style={styles.submitButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0090C7";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 192, 255, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#00C0FF";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
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
    justifyContent: "center",
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
    background: "linear-gradient(145deg, #2A2A2A, #1C1C1C)", // Gradient for a modern, sleek look
    color: "#FFFFFF",
    padding: "40px",
    borderRadius: "15px", // Increased border-radius for a smoother card shape
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)", // Stronger shadow for depth
    transition: "transform 0.3s ease-in-out",
  },
  paymentSectionHover: {
    transform: "scale(1.02)", // Slight scale on hover for interactivity
  },
  sectionTitle: {
    fontSize: "26px",
    marginBottom: "25px",
    color: "#00C0FF", // Bright color for title
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
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
    color: "#BBBBBB", // Softer color for the label
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "14px 16px", // Increased padding for comfort
    borderRadius: "8px", // Smoother rounded edges
    border: "1px solid #444",
    backgroundColor: "#2F2F2F", // Slightly lighter background for contrast
    color: "#FFFFFF",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s, background-color 0.3s", // Smooth transition for interactive feel
  },
  inputFocus: {
    borderColor: "#00C0FF", // Blue border when input is focused
    backgroundColor: "#3A3A3A", // Lighter background on focus
  },
  submitButton: {
    padding: "15px 20px",
    fontSize: "18px",
    backgroundColor: "#00C0FF", // Bright CTA color
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Interactive feel
  },
  submitButtonHover: {
    backgroundColor: "#0090C7", // Darker shade on hover
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 192, 255, 0.3)", // Softer glow effect
  },
};

export default CardPay;
