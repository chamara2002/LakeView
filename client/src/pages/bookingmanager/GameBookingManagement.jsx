import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";

const GameBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bkg/game-bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching game bookings:", error));
  }, []);

  const handleConfirm = (bookingId) => {
    axios
      .put(`http://localhost:3000/api/bkg/game-bookings/${bookingId}`)
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, confirmed: true }
              : booking
          )
        );
      })
      .catch((error) => console.error("Error confirming booking:", error));
  };

  const handleDelete = (bookingId) => {
    axios
      .delete(`http://localhost:3000/api/bkg/game-bookings/${bookingId}`)
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.game?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "#161E38",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by game name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#000",
          }}
        />
        
        <div style={cardGridStyle}>
          {filteredBookings.map((booking) => (
            <div key={booking._id} style={cardStyle}>
              <h3 style={cardTitleStyle}>
                {booking.game?.name || "Unknown Game"}
              </h3>
              <p style={cardDetailStyle}>
                <strong>Customer Email:</strong> {booking.customer?.email || "Unknown Customer"}
              </p>
              <p style={cardDetailStyle}>
                <strong>Seats:</strong> {booking.seatNumbers ? booking.seatNumbers.length : 0}
              </p>
              <p style={cardDetailStyle}>
                <strong>Price:</strong> ${booking.totalPrice.toFixed(2)}
              </p>
              <p style={cardDetailStyle}>
                <strong>Booking Status:</strong> {booking.confirmed ? "Paid" : "Not paid"}
              </p>
              <div style={cardButtonContainerStyle}>
                <button
                  onClick={() => handleConfirm(booking._id)}
                  disabled={booking.confirmed}
                  style={{
                    ...cardButtonStyle,
                    backgroundColor: booking.confirmed ? "#28a745" : "#007bff",
                    cursor: booking.confirmed ? "default" : "pointer",
                  }}
                >
                  {booking.confirmed ? "Payment confirmed" : "Confirm Payment"}
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  style={{
                    ...cardButtonStyle,
                    backgroundColor: "#dc3545",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "#1b1f38",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  color: "#fff",
};

const cardTitleStyle = {
  marginBottom: "15px",
  fontSize: "20px",
  color: "#f0f0f0",
};

const cardDetailStyle = {
  marginBottom: "10px",
  fontSize: "16px",
};

const cardButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const cardButtonStyle = {
  padding: "8px 16px",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default GameBookingManagement;
