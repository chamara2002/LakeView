import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";

const LeaveDetails = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/attendance/attendance"
        );
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  const calculateHours = (start, end) => {
    if (!end) return "working";

    const startDate = new Date(start);
    const endDate = new Date(end);
    const hours = Math.round((endDate - startDate) / (1000 * 60 * 60));
    return hours;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/attendance/attendance/${id}`
      );
      setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <div style={containerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Id</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Attendant Time</th>
                <th style={thStyle}>Leave Time</th>
                <th style={thStyle}>Hours</th>
                <th style={thStyle}>Options</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td style={tdStyle}>{leave._id}</td>
                  <td style={tdStyle}>
                    {new Date(leave.start).toLocaleDateString()}
                  </td>
                  <td style={tdStyle}>
                    {new Date(leave.start).toLocaleTimeString()}
                  </td>
                  <td style={tdStyle}>
                    {leave.end
                      ? new Date(leave.end).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td style={tdStyle}>
                    {calculateHours(leave.start, leave.end)}
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(leave._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  backgroundColor: "#161E38", // Changed background color
  color: "#234151", // Changed text color to be readable on dark background
  height: "60vh",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#f4f4f4",
  fontWeight: "bold",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
};

const buttonStyle = {
  padding: "5px 10px",
  margin: "5px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
};

const updateButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f0ad4e",
  color: "white",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#d9534f",
  color: "white",
};

export default LeaveDetails;
