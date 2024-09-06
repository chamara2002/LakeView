import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./foodManagement/context/authContext";
import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if the user is not authenticated or doesn't have a role
  if (!user?.user?.role) {
    navigate("/login");
    return null;
  }

  // Button component for reusability
  const Button = ({ onClick, onMouseEnter, onMouseLeave, style, children }) => (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );

  return (
    <div>
      <NavBar />
      <div style={styles.dashboard}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.buttonContainer}>
          <Button
            style={styles.specialButton}
            onClick={() => navigate("/staffmemberdash")}
            onMouseEnter={handleSpecialButtonMouseEnter}
            onMouseLeave={handleSpecialButtonMouseLeave}
          >
            My Dashboard
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/staffdashboard")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Staff Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/gameManagement")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Games Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/manageFoods")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Food Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/movieManagerDashboard")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Movies Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/eventManagement")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Event Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/BookingNavigationPage")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Booking Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/resourceManagerDashboard")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Resource & Maintenance Management
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate("/customerSupportManagerDashboard")}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Customer Support Management
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Styles object
const styles = {
  dashboard: {
    padding: "30px",
    backgroundColor: "#161e38",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "800px",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ffbb00",
    color: "#161e38",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, transform 0.2s",
  },
  specialButton: {
    padding: "12px 24px",
    fontSize: "16px",
    border: "2px solid #ffbb00",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#161e38",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, transform 0.2s",
    fontWeight: "bold",
  },
};

// Hover effect handlers
const handleButtonMouseEnter = (e) => {
  e.target.style.backgroundColor = "#e0a800";
  e.target.style.transform = "scale(1.05)";
};

const handleButtonMouseLeave = (e) => {
  e.target.style.backgroundColor = "#ffbb00";
  e.target.style.transform = "scale(1)";
};

const handleSpecialButtonMouseEnter = (e) => {
  e.target.style.backgroundColor = "#e0e0e0";
  e.target.style.transform = "scale(1.05)";
};

const handleSpecialButtonMouseLeave = (e) => {
  e.target.style.backgroundColor = "#ffffff";
  e.target.style.transform = "scale(1)";
};

export default AdminDashboard;
