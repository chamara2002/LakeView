import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./foodManagement/context/authContext";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || !user.user.role) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <NavBar></NavBar>
      <div style={dashboardStyle}>
        <h1 style={headerStyle}>Admin Dashboard</h1>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onClick={() => navigate("/BookingNavigationPage")}
          >
            Booking Management
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/customerSupportManagerDashboard")}
          >
            Customer Support Management
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/eventManagement")}
          >
            Event Management
          </button>
          <button style={buttonStyle} onClick={() => navigate("/manageFoods")}>
            Food Management
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/gameManagement")}
          >
            Games Management
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/movieManagerDashboard")}
          >
            Movies Management
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/resourceManagerDashboard")}
          >
            Resource Management
          </button>

          <button
            style={buttonStyle}
            onClick={() => navigate("/staffdashboard")}
          >
            Staff Management
          </button>

          <button
            style={buttonStyle}
            onClick={() => navigate("/staffmemberdash")}
          >
            My dashboard
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

// Styles for the dashboard
const dashboardStyle = {
  padding: "20px",
  backgroundColor: "#161E38", // Updated background color
  minHeight: "100vh",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#ffffff",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default AdminDashboard;
