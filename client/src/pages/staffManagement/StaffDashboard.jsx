import React from 'react';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';
import { useAuth } from '../foodManagement/context/authContext';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  let isManager = false;

  user.user.role
    ? user.user.role === "Manager"
      ? (isManager = true)
      : navigate('/staffmemberdash')
    : navigate('/');

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          backgroundColor: "#1b1f38",
          color: "white",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          STAFF MANAGER DASHBOARD
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth <= 768 && window.innerWidth > 480
                ? "repeat(2, 1fr)"
                : window.innerWidth <= 480
                ? "1fr"
                : "repeat(3, 1fr)",
            gridGap: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/staffregistrationform')}
          >
            Add Staff Member
          </button>
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/stafftable')}
          >
            View Staff Member Details
          </button>
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/leaverequests')}
          >
            View Leave Requests
          </button>
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/leavedetails')}
          >
            View Attendance
          </button>
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/salarytable')}
          >
            View Salary
          </button>
          <button
            style={{
              padding: "35px 55px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#eae85b",
              color: "#000000",
              width: "100%",
            }}
            onClick={() => navigate('/salarycalculator')}
          >
            Calculate Salary
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
