import React from 'react';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';
import { useAuth } from '../foodManagement/context/authContext';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const containerStyle = {
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
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  };

  const buttonGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "20px",
    width: "100%",
    maxWidth: "800px",
  };

  const buttonStyle = {
    padding: "35px 55px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "100%",
  };

  const responsiveButtonGridStyle = {
    ...buttonGridStyle,
    gridTemplateColumns: "repeat(2, 1fr)",
  };

  const mobileButtonGridStyle = {
    ...buttonGridStyle,
    gridTemplateColumns: "1fr",
  };

  const {user} =useAuth();
  const navigate = useNavigate();
  var isManager = false;

  user.user.role? user.user.role === "Manager" ? isManager=true : navigate('/staffmemberdash') : navigate('/');


  return (
    <div>
      <NavBar></NavBar>
    <div style={containerStyle}>
      <h1 style={titleStyle}>STAFF MANAGER DASHBOARD</h1>
      <div
        style={{
          ...buttonGridStyle,
          ...(window.innerWidth <= 768 && window.innerWidth > 480
            ? responsiveButtonGridStyle
            : window.innerWidth <= 480
            ? mobileButtonGridStyle
            : {}),
        }}
      >
        <button style={buttonStyle} onClick={()=>navigate('/staffregistrationform')}>Add Staff Member</button>
        <button style={buttonStyle} onClick={()=>navigate('/stafftable')} >View Staff Member Details</button>
        <button style={buttonStyle} onClick={()=>navigate('/leaverequests')} >View Leave Requests</button>
        <button style={buttonStyle} onClick={()=>navigate('/leavedetails')}>View Attendance</button>
        <button style={buttonStyle} onClick={()=>navigate('/salarytable')}>View Salary</button>
        <button style={buttonStyle} onClick={()=>navigate('/salarycalculator')}>Calculate Salary</button>
      </div>
    </div>
<Footer></Footer>
    </div>
  );
};

export default StaffDashboard;
