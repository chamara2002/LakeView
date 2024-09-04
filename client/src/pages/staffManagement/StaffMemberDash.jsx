import React,{useState,useEffect} from "react";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";
import axios from "axios";

const StaffmemberDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user ID from Auth context
  const [salaryData, setSalaryData] = useState({});

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
      alert("Attendance marked:");
      localStorage.setItem("attendance", response.data._id);
      localStorage.setItem("start",currentTime);
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
  
      alert(`Attendance ended with OT  :  ${roundedOT} hrs`);
      localStorage.removeItem("attendance");
      localStorage.removeItem("start");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const fetchCurrentMonthData = async () => {
    try {
      const attendanceResponse = await axios.get(
        "http://localhost:3000/api/attendance/attendance"
      );
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
        employeeData.otSalary =
          employeeData.otHours *
          ((employeeData.normalSalary / 160) * 4); // Assuming OT rate is four times the normal rate
        employeeData.finalSalary =
          employeeData.normalSalary + employeeData.otSalary;
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
      setSalaryData(data ? data[user.user._id]  : 'Not authenticated' );
    };

    fetchData();
  }, []);

  

  

  // console.log(salaryData);

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
          <h2>Salary</h2>{user.user.salary}
          <h2>Ot Hours</h2>{salaryData.otHours}
          <h2>Ot salary</h2>{salaryData.otSalary}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffmemberDash;
