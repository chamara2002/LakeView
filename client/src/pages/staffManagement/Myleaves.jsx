import React, { useEffect, useState } from "react";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useAuth } from "../foodManagement/context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Myleaves = () => {
  const [leaves, setLeaves] = useState([]);
  const { user } = useAuth(); // Get user ID from Auth context
  const navigate = useNavigate();

  console.log(user.user._id);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/leaves/leaves"
        ); // Adjust endpoint as needed
        const allLeaves = response.data;

        // Filter leaves based on the authenticated user ID
        const userLeaves = allLeaves.filter(
          (leave) =>
            leave.employeeId && // Ensure employeeId exists
            leave.employeeId._id === user.user._id
        );
        
        setLeaves(userLeaves);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, [user]);

  

  const containerStyle = {
    backgroundColor: "#161E38", // Updated background color for the container
    padding: "20px",
    minHeight: "100vh",
  };

  const tableStyle = {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#A0AFC1",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  };

  const headerStyle = {
    backgroundColor: "#A0AFC1",
    padding: "20px 10px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "white",
  };

  const rowStyle = {
    backgroundColor: "#e0e0e0",
  };

  const statusAcceptedStyle = {
    backgroundColor: "#FFA500",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
  };

  const statusRejectedStyle = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
  };

  const dashboardButtonStyle = {
    backgroundColor: "#44DFF6",
    color: "#000",
    padding: "10px 20px",
    borderRadius: "20px",
    textAlign: "center",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    margin: "20px",
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <button
          style={dashboardButtonStyle}
          onClick={() => navigate("/staffmemberdash")}
        >
          {" "}
          My Dashboard{" "}
        </button>
        <div style={headerStyle}>MY LEAVE REQUESTS</div>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thTdStyle}>Leave ID</th>
              <th style={thTdStyle}>Staff ID</th>
              <th style={thTdStyle}>Start</th>
              <th style={thTdStyle}>End</th>
              <th style={thTdStyle}>Reason</th>
              <th style={thTdStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td style={thTdStyle}>{leave._id}</td>
                <td style={thTdStyle}>{leave.employeeId._id}</td>
                <td style={thTdStyle}>
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td style={thTdStyle}>
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td style={thTdStyle}>{leave.leaveReason}</td>
                <td style={thTdStyle}>
                  <div
                    style={
                      leave.leaveStatus
                        ? statusAcceptedStyle
                        : statusRejectedStyle
                    }
                  >
                    {leave.leaveStatus}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Myleaves;
