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
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    securityCode: '',
  });
  const [errors, setErrors] = useState({});

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

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "cardNumber":
        // Allow 16 digits with spaces after every 4 digits
        if (!/^(?:\d{4} ){3}\d{4}$/.test(value) && value.length < 19) {
          error = "Card number must be in the format 2222 3333 4444 5555.";
        }
        break;

      case "cardName":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Name on card must only contain letters.";
        }
        break;

      case "expiryDate":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate <= currentDate) {
          error = "Expiry date must be in the future.";
        }
        break;

      case "securityCode":
        // Allow exactly 3 positive digits
        if (!/^\d{3}$/.test(value)) {
          error = "Security code must be 3 digits.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        formErrors[field] = error;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return; // Exit if the form is invalid
    }

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field in real-time
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Function to format card number input
  const formatCardNumber = (value) => {
    // Remove non-digit characters and format
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = cleanedValue
      .replace(/(\d{4})(?=\d)/g, "$1 ") // Add space after every 4 digits
      .trim(); // Remove trailing space
    return formattedValue;
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCardNumber(value);
    
    // Limit the card number length to 19 (16 digits + 3 spaces)
    if (formattedValue.replace(/\s/g, "").length <= 16) {
      setFormData({ ...formData, cardNumber: formattedValue });

      // Validate the formatted value
      const error = validateField("cardNumber", formattedValue);
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: error }));
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
                  placeholder="2222 3333 4444 5555"
                  style={styles.input}
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                {errors.cardNumber && <span style={styles.error}>{errors.cardNumber}</span>}
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
                  onChange={handleChange}
                  required
                />
                {errors.cardName && <span style={styles.error}>{errors.cardName}</span>}
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
                    onChange={handleChange}
                    required
                  />
                  {errors.expiryDate && <span style={styles.error}>{errors.expiryDate}</span>}
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
                    onChange={handleChange}
                    required
                  />
                  {errors.securityCode && <span style={styles.error}>{errors.securityCode}</span>}
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
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  paymentSection: {
    background: "linear-gradient(145deg, #2A2A2A, #1C1C1C)",
    color: "#FFFFFF",
    padding: "40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.3s ease-in-out",
  },
  sectionTitle: {
    fontSize: "26px",
    marginBottom: "25px",
    color: "#00C0FF",
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
    color: "#BBBBBB",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#2F2F2F",
    color: "#FFFFFF",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s, background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  submitButton: {
    padding: "15px 20px",
    fontSize: "18px",
    backgroundColor: "#00C0FF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
  },
};

export default CardPay;
