import React from "react";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";
import axios from "axios";

const StaffmemberDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user ID from Auth context

  const handleMarkAttendance = async () => {
    if (!user.user || !user.user._id) {
      console.error("User not authenticated");
      return;
    }

    try {
      const currentTime = new Date().toISOString();
      const response = await axios.post("http://localhost:3000/api/attendance/attendance", {
        userId: user.user._id,
        start: currentTime,
        end: null, 
        ot: 0 
      });
      console.log("Attendance marked:", response.data);
      localStorage.setItem("attendance", response.data._id);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleEndAttendance = async () => {
    var attendanceId = localStorage.getItem("attendance");
    if (!user || !user.user._id || !attendanceId) {
      console.error("User not authenticated or no attendance record found");
      return;
    }

    try {
      const endTime = new Date().toISOString();
      await axios.put(`http://localhost:3000/api/attendance/attendance/${attendanceId}`, {
        end: endTime,
      });
      console.log("Attendance ended");
      localStorage.removeItem("attendance");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "#404267",
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Dashboard Content */}
        <div
          style={{
            width: "80%",
            maxWidth: "900px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ color: "white", marginBottom: "30px" }}>
            STAFF MEMBER DASHBOARD
          </h1>

          {/* Button Groups */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "50px",
                backgroundColor: "#1e2e4f",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <button
                onClick={handleMarkAttendance}
                style={{
                  backgroundColor: "#ffcc00",
                  color: "white",
                  border: "none",
                  padding: "15px 30px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Mark Attendance
              </button>
              <button
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                  border: "none",
                  padding: "15px 30px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={handleEndAttendance}
              >
                Leave
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#e3e3e3",
                  color: "black",
                  border: "none",
                  padding: "15px 30px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() => navigate("/LeaveRequestForm")}
              >
                Apply Leaves
              </button>
              <button
                style={{
                  backgroundColor: "#e3e3e3",
                  color: "black",
                  border: "none",
                  padding: "15px 30px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() => navigate("/myleaves")}
              >
                View Leaves
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffmemberDash;
