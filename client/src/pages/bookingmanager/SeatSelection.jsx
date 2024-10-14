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
        if (prevSelectedSeats.length >= 10) {
          alert("You can only book a maximum of 10 seats.");
          return prevSelectedSeats;
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
    const today = new Date();
    const selected = new Date(e.target.value);

    if (selected < today.setHours(0, 0, 0, 0)) {
      alert("You cannot select a past date.");
      return;
    }

    setSelectedDate(e.target.value);
    setSelectedTime("");
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
            borderRadius: "8px",
            border: "2px solid #444",
            cursor: isUnavailable || !selectedDate || !selectedTime ? "not-allowed" : "pointer",
            backgroundColor: isUnavailable
              ? "grey"
              : selectedSeats.includes(seatNumber)
              ? "#17a2b8"
              : "#ffffff",
            color: selectedSeats.includes(seatNumber) ? "#fff" : "#000",
            fontWeight: "600",
            userSelect: "none",
            transition: "transform 0.3s, background-color 0.3s",
            opacity: !selectedDate || !selectedTime ? 0.5 : 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
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
        <h3 style={{ marginBottom: "20px", color: "#ffffff", fontSize: "2rem", letterSpacing: "1px" }}>
          Select Your Tickets
        </h3>
        
        {/* Date and Time Selection */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #ddd",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #ddd",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
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
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: "10px",
            maxWidth: "600px",
            margin: "0 auto"
          }}
        >
          {renderSeats()}
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={confirmSelection}
          style={{
            padding: "14px 40px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.2s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28A745")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
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
