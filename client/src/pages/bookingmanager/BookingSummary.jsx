import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from "axios";
import { useAuth } from "../foodManagement/context/authContext";
import { BookingContext } from "../foodManagement/context/BookingContext";
import { FaCalendarAlt, FaUser, FaEnvelope, FaClock } from "react-icons/fa"; // Icons

const BookingSummary = () => {
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingDetails } = useContext(BookingContext);

  useEffect(() => {
    if (!bookingDetails.itemId) {
      console.warn("No itemId set in bookingDetails");
      return;
    }

    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          bookingDetails.type === "movie"
            ? `http://localhost:3000/api/movies/movies/${bookingDetails.itemId}`
            : `http://localhost:3000/api/games/games/${bookingDetails.itemId}`
        );
        setItem(response.data);
      } catch (error) {
        console.error(`Error fetching ${bookingDetails.type} details:`, error);
      }
    };

    fetchItemDetails();
  }, [bookingDetails.itemId, bookingDetails.type]);

  const handleConfirm = () => {
    alert(`Booking confirmed for ${bookingDetails.date} at ${bookingDetails.time}`);
    bookingDetails.type === "movie" ? navigate("/movieBillinfo") : navigate("/gameBillInfo");
  };

  return (
    <>
      <NavBar name="Booking" />
      <div style={styles.container}>
        {/* Booking Summary Title centered at the top */}
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Booking Summary</h2>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          <div style={styles.card}>
            <h3>Bill Information</h3>
            <p>{`${item.name || 'Item'} booking fee = RS${bookingDetails.price} X ${bookingDetails.seatNumbers.length} seats`}</p>
            <p>{`Total amount = RS${bookingDetails.totalAmount}`}</p>
          </div>

          <div style={styles.card}>
            <h3>User Information</h3>
            <p>
              <FaUser /> {`Name: ${user.user.name}`}
            </p>
            <p>
              <FaEnvelope /> {`Email: ${user.user.email}`}
            </p>
          </div>

          <div style={styles.card}>
            <h3>Booking Details</h3>
            <p>
              <FaCalendarAlt /> {`Date: ${bookingDetails.date}`}
            </p>
            <p>
              <FaClock /> {`Time: ${bookingDetails.time}`}
            </p>
            <p>{`Selected Seats: ${bookingDetails.seatNumbers.join(', ')}`}</p>
          </div>

          <button
            style={styles.button}
            onClick={handleConfirm}
          >
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "40px 20px", // Adjusted padding
    textAlign: "center",
    background: "#161E38",
    color: "#333333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column", // Stack the title and content vertically
    justifyContent: "flex-start", // Align content from the top
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: "20px", // Space between title and content
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#e3e8ec",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    paddingBottom: "10px", // Additional space below the title
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "30px", // Reduced padding to adjust height
    width: "60%", // Increased width to fit content better
    borderRadius: "20px",
    backdropFilter: "blur(10px)", // Frosted glass effect
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", // Neumorphism shadow
    transition: "box-shadow 0.3s ease",
    textAlign: "left", // Left-align content
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "15px", // Reduced padding to fit more content
    borderRadius: "12px",
    marginBottom: "15px", // Reduced margin between cards
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", // Shadow for card
    transition: "transform 0.3s ease",
  },
  formGroup: {
    marginBottom: "20px", // Reduced space before the date input
  },
  label: {
    fontSize: "18px",
    marginRight: "10px",
    fontWeight: "600",
    color: "#495057",
    display: "block",
    marginBottom: "10px",
  },
  input: {
    padding: "12px", // Reduced padding for the input field
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #ced4da",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.05)",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px 24px", // Reduced padding for button
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    maxWidth: "300px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  error: {
    color: "#dc3545",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default BookingSummary;
