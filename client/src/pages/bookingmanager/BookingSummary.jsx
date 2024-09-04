import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from "axios";
import { useAuth } from "../foodManagement/context/authContext";
import { BookingContext } from "../foodManagement/context/BookingContext";

const BookingSummary = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [item, setItem] = useState({}); // Unified state for movie or game
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      // Save the selected date or perform any necessary action
      alert(`Booking confirmed for ${selectedDate}`);
      bookingDetails.type === "movie" ? navigate('/movieBillinfo') : navigate('/gameBillInfo')
    }
  };

  return (
    <>
      <NavBar name="Booking" />
      <div style={styles.container}>
        <h2 style={styles.title}>Booking Summary</h2>
        <h3>Bill Information</h3>
        <p>{`${item.name} booking fee = R.S.${item.price} X ${bookingDetails.seatNumbers.length} seats `}</p>
        <p>{`Total amount = R.S.${bookingDetails.total}`}</p>
        <h3>User information</h3>
        <p>{`Name: ${user.user.name}`}</p>
        <p>{`Email: ${user.user.email}`}</p>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="date">
            Select a Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={styles.input}
          />
        </div>
        <button
          style={styles.button}
          onClick={handleConfirm}
          disabled={!selectedDate}
        >
          OK
        </button>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    minHeight: "70vh",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "18px",
    marginRight: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#333333",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    maxWidth: "200px",
  },
};

export default BookingSummary;
