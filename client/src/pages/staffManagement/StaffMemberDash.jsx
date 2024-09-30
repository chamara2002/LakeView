import React, { useState, useEffect } from "react"; 
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";
import axios from "axios";

const StaffmemberDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user ID from Auth context
  const [salaryData, setSalaryData] = useState({}); // Initialize with an empty object
  const [attendanceMarked, setAttendanceMarked] = useState(false); // Track attendance status

  // Unique identifier for the allowed laptop (example: based on user agent)
  const allowedUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"; // Replace with actual user agent string

  const isAllowedDevice = () => {
    return navigator.userAgent === allowedUserAgent; // Check if the current device matches the allowed device
  };

  const handleMarkAttendance = async () => {
    if (!user.user || !user.user._id) {
      console.error("User not authenticated");
      return;
    }

    if (!isAllowedDevice()) {
      alert("Attendance can only be marked from the authorized laptop.");
      return;
    }

    if (attendanceMarked) {
      alert("Attendance already marked. Please end your current attendance before marking again.");
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
      alert("Attendance marked.");
      localStorage.setItem("attendance", response.data._id);
      localStorage.setItem("start", currentTime);
      setAttendanceMarked(true); // Update status
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleEndAttendance = async () => {
    const attendanceId = localStorage.getItem("attendance");
    const startTime = localStorage.getItem("start");

    if (!user || !user.user._id || !attendanceId || !startTime) {
      console.error("User not authenticated or no attendance record found");
      return;
    }

    try {
      const endTime = new Date().toISOString();
      const startTimeDate = new Date(startTime);
      const endTimeDate = new Date(endTime);

      const diffInMs = endTimeDate - startTimeDate;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      const roundedOT = Math.round(diffInHours); // Round off to the nearest whole number

      // Update the attendance with end time and OT hours
      await axios.put(`http://localhost:3000/api/attendance/attendance/${attendanceId}`, {
        end: endTime,
        ot: roundedOT,
      });

      alert(`Attendance ended with OT: ${roundedOT} hrs`);
      localStorage.removeItem("attendance");
      localStorage.removeItem("start");
      setAttendanceMarked(false); // Reset status
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const fetchCurrentMonthData = async () => {
    try {
      const attendanceResponse = await axios.get("http://localhost:3000/api/attendance/attendance");
      const staffResponse = await axios.get("http://localhost:3000/api/staff/");

      const attendanceData = attendanceResponse.data;
      const staffData = staffResponse.data;

      const currentMonthYear = getCurrentMonthYear();
      const groupedData = {};

      attendanceData.forEach((attendance) => {
        const staffMember = staffData.find(
          (staff) => staff._id === attendance?.userId?._id
        );
        if (!staffMember) return;

        const date = new Date(attendance.start);
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format: MM-YYYY

        if (monthYear !== currentMonthYear) return; // Filter by current month

        if (!groupedData[staffMember._id]) {
          groupedData[staffMember._id] = {
            username: staffMember.username,
            id: staffMember._id,
            otHours: 0,
            normalSalary: staffMember.salary,
            otSalary: 0,
            finalSalary: 0,
          };
        }

        groupedData[staffMember._id].otHours += attendance.ot || 0;
      });

      // Calculate OT and final salaries for each employee for the current month
      Object.keys(groupedData).forEach((employeeId) => {
        const employeeData = groupedData[employeeId];
        
        // Adjust OT hours if more than 8
        const otHours = employeeData.otHours > 8 
          ? employeeData.otHours - 8 
          : employeeData.otHours;
        
        // Calculate OT salary (assuming OT rate is twice the normal rate)
        employeeData.otSalary = otHours * ((employeeData.normalSalary / 160) * 1.5);
        
        // Calculate final salary
        employeeData.finalSalary = employeeData.normalSalary + employeeData.otSalary;
        
        // Store the adjusted OT hours
        employeeData.OT = otHours;
      });

      return groupedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getMonth() + 1}-${now.getFullYear()}`; // Format: MM-YYYY
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentMonthData();
      setSalaryData(data ? data[user.user._id] : {}); // Default to empty object if not authenticated

      // Check if there's an ongoing attendance
      const attendanceId = localStorage.getItem("attendance");
      setAttendanceMarked(!!attendanceId); // Set status based on if there's an ongoing attendance
    };

    fetchData();
  }, [user.user._id]);

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "#404267",
          height: "100vh",
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
          <br />
          <br />
          <br />

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
                  backgroundColor: "#DAA520",
                  color: "black",
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
                End Attendance
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
        <br />
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '20px',
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#f9f9f9'
        }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '10px 0'
          }}>
            Name : {user.user.username}
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '10px 0'
          }}>
            Salary : {user.user.salary}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '10px 0'
          }}>
            OT Hours : {salaryData ? salaryData.OT : 'N/A'}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '10px 0'
          }}>
            OT Salary : {salaryData ? salaryData.otSalary : 'N/A'}
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '10px 0'
          }}>
            Final Salary : {salaryData ? salaryData.finalSalary : 'N/A'}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffmemberDash;
