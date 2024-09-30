import React from 'react';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';
import { useAuth } from '../foodManagement/context/authContext';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if the user is not authenticated or doesn't have a role
  if (!user?.user?.role || user.user.role !== "Manager") {
    navigate(user?.user?.role ? '/staffmemberdash' : '/');
    return null;
  }

  // Button component for reusability
  const Button = ({ onClick, style, children }) => (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
    >
      {children}
    </button>
  );

  return (
    <div>
      <NavBar />
      <div style={styles.dashboard}>
        <h1 style={styles.header}>Staff Manager Dashboard</h1>
        <div style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onClick={() => navigate('/staffregistrationform')}
          >
            Add Staff Member
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate('/stafftable')}
          >
            View Staff Member Details
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate('/leaverequests')}
          >
            View Leave Requests
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate('/leavedetails')}
          >
            View Attendance
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate('/salarytable')}
          >
            View Salary
          </Button>
          <Button
            style={styles.button}
            onClick={() => navigate('/salarycalculator')}
          >
            Calculate Salary
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
    marginBottom: "40px",
    marginTop: "-200px",
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
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

export default StaffDashboard;
