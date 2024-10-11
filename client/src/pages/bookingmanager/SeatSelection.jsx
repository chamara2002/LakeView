import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BookingContext } from "../foodManagement/context/BookingContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

// SeatSelection Component
const SeatSelection = ({ movieId, pricePerSeat }) => {
  const [unavailableSeats, setUnavailableSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { bookingDetails, setBookingItem, addSeats } = useContext(BookingContext);
  const navigate = useNavigate();

  const timeSlots = [
    "6.00am - 9.00am",
    "9.00am - 12.00pm",
    "12.00pm - 3.00pm"
  ];

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
        const unavailableSeatsMap = {};
        
        bookingsData.forEach(booking => {
          const key = `${booking.date}_${booking.time}`;
          if (!unavailableSeatsMap[key]) {
            unavailableSeatsMap[key] = [];
          }
          unavailableSeatsMap[key].push(...booking.seatNumbers);
        });

        setUnavailableSeats(unavailableSeatsMap);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUnavailableSeats();
  }, [bookingDetails.itemId, bookingDetails.type]);

  const handleSeatClick = (seatNumber) => {
    const currentUnavailableSeats = unavailableSeats[`${selectedDate}_${selectedTime}`] || [];
    if (currentUnavailableSeats.includes(seatNumber)) {
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
    if (selectedSeats.length > 0 && selectedDate && selectedTime) {
      const totalAmount = selectedSeats.length * bookingDetails.price;
      setBookingItem(
        bookingDetails.type,
        bookingDetails.itemId,
        bookingDetails.price,
        selectedDate,
        selectedTime,
        selectedSeats,
        totalAmount
      );
      navigate("/booking-summary");
    } else {
      alert("Please select at least one seat, a date, and a time.");
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const renderSeats = () => {
    const seats = [];
    const currentUnavailableSeats = unavailableSeats[`${selectedDate}_${selectedTime}`] || [];

    for (let i = 1; i <= 50; i++) {
      const seatNumber = `S${i}`;
      const isUnavailable = currentUnavailableSeats.includes(seatNumber);
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
            cursor: isUnavailable || !selectedDate || !selectedTime ? "not-allowed" : "pointer",
            backgroundColor: isUnavailable
              ? "grey"
              : selectedSeats.includes(seatNumber)
              ? "green"
              : "#fff",
            color: selectedSeats.includes(seatNumber) ? "#fff" : "#000",
            fontWeight: "bold",
            userSelect: "none",
            transition: "transform 0.3s, background-color 0.3s",
            opacity: !selectedDate || !selectedTime ? 0.5 : 1,
          }}
          onClick={() => {
            if (selectedDate && selectedTime && !isUnavailable) {
              handleSeatClick(seatNumber);
            }
          }}
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
        
        {/* Date and Time Selection */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#ffffff",
            }}
          />
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Select Time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default SeatSelection;