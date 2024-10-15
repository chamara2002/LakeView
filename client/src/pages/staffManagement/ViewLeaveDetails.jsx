import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable plugin for jsPDF
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import ReportButton from "../../components/reUseable/ReportButton";

const LeaveDetails = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTermByDate, setSearchTermByDate] = useState("");
  const [searchTermByStaffId, setSearchTermByStaffId] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/attendance/attendance"
        );
        const filteredData = response.data.filter((leave) => leave.userId !== null);
        setLeaves(filteredData);
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
    const totalHours = Math.round((endDate - startDate) / (1000 * 60 * 60));
    
    return totalHours <= 8 ? 0 : totalHours - 8; // Return overtime hours
  };

  const calculatewHours = (start, end) => {
    if (!end) return "working"; 
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.round((endDate - startDate) / (1000 * 60 * 60));
  };

  const handleSearchByDate = (event) => {
    setSearchTermByDate(event.target.value);
  };

  const handleSearchByStaffId = (event) => {
    setSearchTermByStaffId(event.target.value);
  };

  const filteredLeaves = leaves.filter((leave) => {
    const leaveDate = new Date(leave.start).toISOString().slice(0, 10);
    const staffId = "SID" + leave.userId._id.slice(-4);

    return (
      (searchTermByDate ? leaveDate.includes(searchTermByDate) : true) &&
      (searchTermByStaffId ? staffId.includes(searchTermByStaffId) : true)
    );
  });

  // Function to generate the PDF report
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Company Information
    const companyName = "LakeView Gaming Zone"; 
    const companyAddress = "Gampaha, Sri Lanka"; 
    const companyPhone = "+9433-7628316"; 
    const companyEmail = "lakeviewgaming01@gmail.com";

    // Logo (Replace with your actual base64 string or image URL)
    const logo = "reportLogo.png"; 

    // Add the logo to the PDF
    doc.addImage(logo, "PNG", 150, 10, 40, 35); 

    // Add company information to the PDF
    doc.setFontSize(14);
    doc.setTextColor(30, 39, 73); // Set text color to #1E2749 (RGB: 30, 39, 73)
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text(companyName, 20, 20);
    
    // Reset text color and font for the rest of the text
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFont("Helvetica", "normal"); // Set font to normal for the rest
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    
    // Add a line for separation
    doc.line(20, 45, 190, 45); 

    // Add the report title
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold"); // Set font to bold for title
    doc.text("Attendance Details Report", 65, 60);
    doc.setFont("Helvetica", "normal"); // Set font back to normal for rest of content

    // Generate the table data
    const tableData = filteredLeaves.map((leave) => [
      "AID" + leave._id.slice(-4),
      "SID" + leave.userId._id.slice(-4),
      new Date(leave.start).toLocaleDateString(),
      new Date(leave.start).toLocaleTimeString(),
      leave.end ? new Date(leave.end).toLocaleTimeString() : "N/A",
      calculateHours(leave.start, leave.end),
      calculatewHours(leave.start, leave.end),
    ]);

    // Create the table with autoTable
    doc.autoTable({
      head: [["Attendance ID", "Staff ID", "Date", "Attendant Time", "Leave Time", "OT Hours", "Working Hours"]],
      body: tableData,
      startY: 70, 
      theme: "grid",
      headStyles: { fillColor: [22, 30, 56] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

    // Save the PDF
    doc.save("attendance_details_report.pdf");
  };

  return (
    <div>
      <NavBar />
      <div style={styles.pageContainer}>
        <br />
        <br />
        <h2 style={styles.heading}>Attendance Details</h2>
        <input
          type="date" 
          placeholder="Search by Date (YYYY-MM-DD)"
          value={searchTermByDate}
          onChange={handleSearchByDate}
          style={styles.searchBar}
        />
        <input
          type="text"
          placeholder="Search by Staff ID" 
          value={searchTermByStaffId}
          onChange={handleSearchByStaffId}
          style={styles.searchBar}
        />
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Attendance ID</th>
              <th style={styles.tableHeaderCell}>Staff ID</th>
              <th style={styles.tableHeaderCell}>Date</th>
              <th style={styles.tableHeaderCell}>Attendant Time</th>
              <th style={styles.tableHeaderCell}>Leave Time</th>
              <th style={styles.tableHeaderCell}>OT Hours</th>
              <th style={styles.tableHeaderCell}>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{"AID" + leave._id.slice(-4)}</td>
                <td style={styles.tableCell}>{"SID" + leave.userId._id.slice(-4)}</td>
                <td style={styles.tableCell}>
                  {new Date(leave.start).toLocaleDateString()}
                </td>
                <td style={styles.tableCell}>
                  {new Date(leave.start).toLocaleTimeString()}
                </td>
                <td style={styles.tableCell}>
                  {leave.end ? new Date(leave.end).toLocaleTimeString() : "N/A"}
                </td>
                <td style={styles.tableCell}>{calculateHours(leave.start, leave.end)}</td>
                <td style={styles.tableCell}>{calculatewHours(leave.start, leave.end)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <button style={styles.exportButton} onClick={handleExportPDF}>
          Export Report as PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#161E38",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "yellow",
    marginBottom: "30px",
    textAlign: "center",
  },
  searchBar: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  table: {
    width: "100%",
    maxWidth: "1200px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#2E3A59",
  },
  tableHeaderCell: {
    padding: "12px",
    borderBottom: "1px solid #444",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
  },
  exportButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LeaveDetails;
