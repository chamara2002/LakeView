import React, { useState, useContext } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const LeaveRequestForm = () => {
  const { user } = useAuth(); // Assuming user object contains employeeId
  const [employeeId, setemployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/leaves/leaves", {
        startDate,
        endDate,
        leaveReason: reason,
        employeeId: user.user._id, // Assuming user._id is the employeeId
      });
      console.log("Leave request submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  // Inline CSS styles
  const containerStyle = {
    padding: "20px",
    backgroundColor: "#4a5472", // Background similar to the image
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    backgroundColor: "#dcdcdc", // Light gray background for form
    padding: "30px",
    borderRadius: "15px",
    width: "400px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#e0e0e0", // Gray input background
  };

  const buttonStyle = {
    width: "130px",
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f0ad4e", // Yellow button
    color: "white",
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#000000", // Black button
    color: "white",
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={formStyle}>
          <h3>Leave Request Form</h3>
          <form onSubmit={handleSubmit}>
          
            <input
              style={inputStyle}
              type="date"
              placeholder="Leave Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              style={inputStyle}
              type="date"
              placeholder="Leave End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <textarea
              style={inputStyle}
              rows="3"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <div>
              <button type="submit" style={submitButtonStyle} onClick={()=>navigate("/myleaves")}>
                Submit
              </button>
              <button
                type="button"
                style={clearButtonStyle}
                onClick={() => {
                  setemployeeId("");
                  setStartDate("");
                  setEndDate("");
                  setReason("");
                  
                  
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaveRequestForm;
