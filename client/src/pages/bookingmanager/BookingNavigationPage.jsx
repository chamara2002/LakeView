import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

function BookingNavigationPage() {
  const navigate = useNavigate();

  return (
    <div>
        <NavBar></NavBar>
        <div style={containerStyle}>
      <h2 style={headingStyle}>Booking Manager Dashboard</h2>
      <div style={gridStyle}>
        <button
          onClick={() => navigate("/manage/MovieBooking")}
          style={buttonStyle}
        >
          Movie Bookings
        </button>
        <button
          onClick={() => navigate("/manage/GameBooking")}
          style={buttonStyle}
        >
          Game Bookings
        </button>
        <button
          onClick={() => navigate("/bookingManagement")}
          style={buttonStyle}
        >
          Event Bookings
        </button>
       
       
        
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

// Styles
const containerStyle = {
  backgroundColor: "#161E38",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const headingStyle = {
  color: "#fff",
  marginBottom: "40px",
  fontSize: "24px",
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  justifyItems: "center",
  width: "80%",
  maxWidth: "800px",
};

const buttonStyle = {
  padding: "15px 30px",
  backgroundColor: "#e0e0e0",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%", // Make button width responsive
  textAlign: "center",
};

export default BookingNavigationPage;
