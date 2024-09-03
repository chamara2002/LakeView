import React, { useEffect, useState } from "react";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import axios from "axios";

const SalaryTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceResponse = await axios.get(
          "http://localhost:3000/api/attendance/attendance"
        );
        const staffResponse = await axios.get(
          "http://localhost:3000/api/staff/"
        );

        if (Array.isArray(attendanceResponse.data)) {
          setAttendanceData(attendanceResponse.data);
        } else {
          console.error(
            "Attendance data is not an array:",
            attendanceResponse.data
          );
        }

        if (Array.isArray(staffResponse.data)) {
          setStaffData(staffResponse.data);
        } else {
          console.error("Staff data is not an array:", staffResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffInMs = endTime - startTime;
    return diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  // Compute salary details
  const salaryDetails = attendanceData
    .map((attendance) => {
      const staffMember = staffData.find(
        (staff) => staff._id === attendance?.userId?._id
      );
      if (!staffMember) return null;

      const totalHours = calculateTotalHours(attendance.start, attendance.end);
      const otHours = attendance.ot || 0;
      const normalSalary = staffMember.salary;
      const otSalary = otHours * ((staffMember.salary / 160) * 4); // Assuming OT rate is four times the normal rate
      const finalSalary = normalSalary + otSalary;

      return {
        _id: attendance._id,
        username: attendance?.userId?.username || "Unknown",
        totalHours,
        otHours,
        normalSalary,
        otSalary,
        finalSalary,
      };
    })
    .filter(Boolean); // Remove null entries

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#161E38",
    color: "#ffffff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#000000",
    fontWeight: "bold",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>SalaryId</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Total Hours</th>
              <th style={thStyle}>OT Hours</th>
              <th style={thStyle}>Normal Salary</th>
              <th style={thStyle}>OT Salary</th>
              <th style={thStyle}>Final Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaryDetails.map((detail) => (
              <tr key={detail._id}>
                <td style={tdStyle}>{detail._id}</td>
                <td style={tdStyle}>{detail.username}</td>
                <td style={tdStyle}>{detail.totalHours.toFixed(2)}</td>
                <td style={tdStyle}>{detail.otHours}</td>
                <td style={tdStyle}>{detail.normalSalary.toFixed(2)}</td>
                <td style={tdStyle}>{detail.otSalary.toFixed(2)}</td>
                <td style={tdStyle}>{detail.finalSalary.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default SalaryTable;
