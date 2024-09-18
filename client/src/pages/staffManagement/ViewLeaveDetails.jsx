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
  const [searchTermByStaffId, setSearchTermByStaffId] = useState(""); // New state for Staff ID search

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
    const hours = Math.round((endDate - startDate) / (1000 * 60 * 60));
    return hours;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/attendance/attendance/${id}`);
      setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const handleSearchByDate = (event) => {
    setSearchTermByDate(event.target.value);
  };

  const handleSearchByStaffId = (event) => {
    setSearchTermByStaffId(event.target.value); // Handle Staff ID search term
  };

  // Filter leaves by date and staff ID
  const filteredLeaves = leaves.filter((leave) => {
    const leaveDate = new Date(leave.start).toLocaleDateString();
    const staffId = leave.userId._id;

    return (
      (searchTermByDate ? leaveDate.includes(searchTermByDate) : true) &&
      (searchTermByStaffId ? staffId.includes(searchTermByStaffId) : true)
    );
  });

  // Function to generate the PDF report
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance Details Report", 14, 20);

    const tableData = filteredLeaves.map((leave) => [
      leave._id,
      leave.userId._id,
      new Date(leave.start).toLocaleDateString(),
      new Date(leave.start).toLocaleTimeString(),
      leave.end ? new Date(leave.end).toLocaleTimeString() : "N/A",
      calculateHours(leave.start, leave.end),
    ]);

    doc.autoTable({
      head: [["Attendance ID", "Staff ID", "Date", "Attendant Time", "Leave Time", "OT Hours"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [22, 30, 56] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

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
          type="text"
          placeholder="Search by Date (MM/DD/YYYY)"
          value={searchTermByDate}
          onChange={handleSearchByDate}
          style={styles.searchBar}
        />
        <input
          type="text"
          placeholder="Search by Staff ID" // New search bar for Staff ID
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
              <th style={styles.tableHeaderCell}>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{leave._id}</td>
                <td style={styles.tableCell}>{leave.userId._id}</td>
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
                <td style={styles.tableCell}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(leave._id)}
                  >
                    Delete
                  </button>
                </td>
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
    margin: "20px 0",
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
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
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
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
