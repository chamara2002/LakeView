import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import ReportButton from "../../components/reUseable/ReportButton";

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
      .then(() => {
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
      .then(() => {
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
      <div style={{ backgroundColor: "#161E38", minHeight: "100vh", padding: "20px" }}>
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
        
        <div style={tableGridStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Game Name</th>
                <th style={thStyle}>Customer Email</th>
                <th style={thStyle}>Seats</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Booking Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id} style={trStyle}>
                  <td style={tdStyle}>{booking.game?.name || "Unknown Game"}</td>
                  <td style={tdStyle}>{booking.customer?.email || "Unknown Customer"}</td>
                  <td style={tdStyle}>{booking.seatNumbers ? booking.seatNumbers.length : 0}</td>
                  <td style={tdStyle}>${booking.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>{booking.confirmed ? "Paid" : "Not paid"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      disabled={booking.confirmed}
                      style={{
                        ...cardButtonStyle,
                        backgroundColor: booking.confirmed ? "#28a745" : "#007bff",
                        cursor: booking.confirmed ? "default" : "pointer",
                        marginRight: "10px",
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <center>
          <ReportButton 
            bookings={filteredBookings} 
            title="Game Bookings" 
            fileName="game_bookings_report.pdf" 
          />
        </center>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const tableGridStyle = {
  display: "block",
  width: "100%",
  overflowX: "auto",
  whiteSpace: "nowrap",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#1b1f38",
  color: "#fff",
};

const thStyle = {
  padding: "12px",
  backgroundColor: "#2a2f55",
  textAlign: "left",
  fontSize: "16px",
  borderBottom: "2px solid #444",
};

const trStyle = {
  borderBottom: "1px solid #444",
};

const tdStyle = {
  padding: "12px",
  fontSize: "16px",
};

const cardButtonStyle = {
  padding: "8px 16px",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default GameBookingManagement;
