import React, { useEffect, useState } from "react";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import axios from "axios";

const SalaryTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

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

  const groupByEmployeeAndMonth = () => {
    const groupedData = {};

    attendanceData.forEach((attendance) => {
      const staffMember = staffData.find(
        (staff) => staff._id === attendance?.userId?._id
      );
      if (!staffMember) return;

      const date = new Date(attendance.start);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format: MM-YYYY

      if (!groupedData[staffMember._id]) {
        groupedData[staffMember._id] = {
          username: staffMember.username,
          id: staffMember._id,
          months: {},
        };
      }

      if (!groupedData[staffMember._id].months[monthYear]) {
        groupedData[staffMember._id].months[monthYear] = {
          totalHours: 0,
          otHours: 0,
          normalSalary: staffMember.salary,
          otSalary: 0,
          finalSalary: 0,
        };
      }

      const totalHours = calculateTotalHours(attendance.start, attendance.end);
      groupedData[staffMember._id].months[monthYear].totalHours += totalHours;
      groupedData[staffMember._id].months[monthYear].otHours +=
        attendance.ot || 0;
    });

    // Calculate OT and final salaries for each employee for each month
    Object.keys(groupedData).forEach((employeeId) => {
      Object.keys(groupedData[employeeId].months).forEach((monthYear) => {
        const employeeMonthData = groupedData[employeeId].months[monthYear];
        employeeMonthData.otSalary =
          employeeMonthData.otHours *
          ((employeeMonthData.normalSalary / 160) * 4); // Assuming OT rate is four times the normal rate
        employeeMonthData.finalSalary =
          employeeMonthData.normalSalary + employeeMonthData.otSalary;
      });
    });

    return groupedData;
  };

  const salaryDetails = groupByEmployeeAndMonth();

  const filteredSalaryDetails = Object.keys(salaryDetails)
    .filter((employeeId) =>
      salaryDetails[employeeId].username
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .reduce((acc, employeeId) => {
      acc[employeeId] = {
        ...salaryDetails[employeeId],
        months: Object.keys(salaryDetails[employeeId].months)
          .filter((monthYear) =>
            filterMonth ? monthYear.includes(filterMonth) : true
          )
          .reduce((monthAcc, monthYear) => {
            monthAcc[monthYear] = salaryDetails[employeeId].months[monthYear];
            return monthAcc;
          }, {}),
      };
      return acc;
    }, {});

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#161E38",
    color: "#ffffff",
  };

  const tableContainerStyle = {
    marginTop: "20px",
    overflowX: "auto", // Adds horizontal scrolling for small screens
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1b1f38",
  };

  const thStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    color: "#ffffff",
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "left",
    color: "#e0e0e0",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "250px",
    backgroundColor: "#2c3e50",
    color: "#ffffff",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={inputContainerStyle}>
          <input
            type="text"
            style={inputStyle}
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Filter by month (MM-YYYY)"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </div>
        {Object.keys(filteredSalaryDetails).map((employeeId) => (
          <div key={employeeId}>
            <h2 style={headingStyle}>
              {filteredSalaryDetails[employeeId].username} (ID: {employeeId})
            </h2>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Month-Year</th>
                    <th style={thStyle}>Total Hours</th>
                    <th style={thStyle}>OT Hours</th>
                    <th style={thStyle}>Normal Salary</th>
                    <th style={thStyle}>OT Salary</th>
                    <th style={thStyle}>Final Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(filteredSalaryDetails[employeeId].months).map(
                    (monthYear) => (
                      <tr key={monthYear}>
                        <td style={tdStyle}>{monthYear}</td>
                        <td style={tdStyle}>
                          {filteredSalaryDetails[employeeId].months[
                            monthYear
                          ].totalHours.toFixed(2)}
                        </td>
                        <td style={tdStyle}>
                          {filteredSalaryDetails[employeeId].months[
                            monthYear
                          ].otHours.toFixed(2)}
                        </td>
                        <td style={tdStyle}>
                          {filteredSalaryDetails[employeeId].months[
                            monthYear
                          ].normalSalary.toFixed(2)}
                        </td>
                        <td style={tdStyle}>
                          {filteredSalaryDetails[employeeId].months[
                            monthYear
                          ].otSalary.toFixed(2)}
                        </td>
                        <td style={tdStyle}>
                          {filteredSalaryDetails[employeeId].months[
                            monthYear
                          ].finalSalary.toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SalaryTable;
