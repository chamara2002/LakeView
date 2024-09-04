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
  const { bookingDetails, setBookingItem, addSeats } =
    useContext(BookingContext);
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
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const confirmSelection = () => {
    addSeats(selectedSeats);
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 50; i++) {
      const seatNumber = `S${i}`;
      seats.push(
        <div
          key={seatNumber}
          style={{
            width: "35px",
            height: "35px",
            lineHeight: "35px",
            border: "1px solid #333",
            cursor: unavailableSeats.includes(seatNumber) ? "not-allowed" : "pointer",
            textAlign: "center",
            backgroundColor: unavailableSeats.includes(seatNumber)
              ? "grey"
              : selectedSeats.includes(seatNumber)
              ? "green"
              : "#fff",
            color: selectedSeats.includes(seatNumber) ? "#fff" : "#000",
            userSelect: "none",
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

    <div>
      
    <div style={{ backgroundColor: "#161E38", minHeight: "80vh" }}>
      <NavBar></NavBar>
    <div style={{ textAlign: "center",  }}>
      <h3>Select Your Seats</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {renderSeats()}
      </div>
      <button
        onClick={confirmSelection}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Confirm Selection
      </button>
      <button
        onClick={() =>
          navigate("/booking-summary")
        }
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginLeft: "10px",
        }}
      >
        Proceed
      </button>
    </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default SeatSelection;
