import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BookingContext } from "../foodManagement/context/BookingContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

// SeatSelection Component
const SeatSelection = ({ movieId, pricePerSeat }) => {
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { bookingDetails, setBookingItem, addSeats } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if itemId is valid before making API requests
    if (!bookingDetails.itemId) {
      console.warn("No itemId set in bookingDetails");
      return;
    }

    const fetchUnavailableSeats = async () => {
      try {
        let response;
        if (bookingDetails.type === "movie") {
          response = await axios.get(
            `http://localhost:3000/api/bkm/bookings/movie/${bookingDetails.itemId}`
          );
        } else if (bookingDetails.type === "game") {
          response = await axios.get(
            `http://localhost:3000/api/bkg/bookings/game/${bookingDetails.itemId}`
          );
        } else {
          console.warn("Invalid booking type:", bookingDetails.type);
          return;
        }

        const bookingsData = response.data || [];
        // Flatten the seatNumbers arrays from all bookings into one array
        const seats = bookingsData.flatMap((booking) => booking.seatNumbers);
        setUnavailableSeats(seats);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUnavailableSeats();
  }, [bookingDetails.itemId, bookingDetails.type]);

  const handleSeatClick = (seatNumber) => {
    if (unavailableSeats.includes(seatNumber)) {
      return; // If the seat is unavailable, do nothing
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        // Check if the selection exceeds the limit of 10 seats
        if (prevSelectedSeats.length >= 10) {
          alert("You can only book a maximum of 10 seats.");
          return prevSelectedSeats; // Return the previous state if limit is reached
        }
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const confirmSelection = () => {
    if (selectedSeats.length > 0) {
      addSeats(selectedSeats);
      navigate("/booking-summary"); // Navigate to booking summary after confirming selection
    } else {
      alert("Please select at least one seat.");
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 50; i++) {
      const seatNumber = `S${i}`;
      seats.push(
        <div
          key={seatNumber}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            border: "1px solid #333",
            cursor: unavailableSeats.includes(seatNumber) ? "not-allowed" : "pointer",
            backgroundColor: unavailableSeats.includes(seatNumber)
              ? "grey"
              : selectedSeats.includes(seatNumber)
              ? "green"
              : "#fff",
            color: selectedSeats.includes(seatNumber) ? "#fff" : "#000",
            fontWeight: "bold",
            userSelect: "none",
            transition: "transform 0.3s, background-color 0.3s",
          }}
          onClick={() => handleSeatClick(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    }
    return seats;
  };

  return (
    <div style={{ backgroundColor: "#161E38", minHeight: "80vh" }}>
      <NavBar />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3 style={{ marginBottom: "20px", color: "#ffffff", fontSize: "1.8rem" }}>
          Select Your Tickets
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 40px)",
            gap: "12px",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          {renderSeats()}
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={confirmSelection}
          style={{
            padding: "12px 30px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            marginRight: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28A745")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Confirm Selection
        </button>
        <button
          onClick={() => navigate("/booking-summary")}
          style={{
            padding: "12px 30px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Proceed
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SeatSelection;
