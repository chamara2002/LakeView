import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";

const StaffTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState(""); // New state for ID search
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStaffData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/staff");
      setStaffData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleIdSearchChange = (e) => {
    setIdSearchQuery(e.target.value);
  };

  const filteredStaff = staffData.filter((staff) => {
    const id = "SID" + staff._id.slice(-4);
    const name = staff.name ? staff.name : "";
    const nic = staff.nic ? staff.nic : "";
    const email = staff.email ? staff.email : "";
    const address = staff.address ? staff.address : "";
    const jobPosition = staff.jobPosition ? staff.jobPosition : "";

    if (idSearchQuery) {
      return id.includes(idSearchQuery);
    }

    return (
      name.includes(searchQuery) ||
      nic.includes(searchQuery) ||
      email.includes(searchQuery) ||
      address.includes(searchQuery) ||
      jobPosition.includes(searchQuery)
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/api/staff/delete/${id}`);
        fetchStaffData();
      } catch (error) {
        console.error("Error deleting staff:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Staff Details</h2>
        <input
          type="text"
          placeholder="Search staff by name, NIC, email..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchBar}
        />
        <br />
        <input
          type="text"
          placeholder="Search by ID..."
          value={idSearchQuery}
          onChange={handleIdSearchChange}
          style={styles.searchBar2}
        />
        {loading ? (
          <p>Loading staff data...</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>ID</th>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>NIC</th>
                  <th style={styles.tableHeaderCell}>Email</th>
                  <th style={styles.tableHeaderCell}>Address</th>
                  <th style={styles.tableHeaderCell}>Job Position</th>
                  <th style={styles.tableHeaderCell}>Salary</th>
                  <th style={styles.tableHeaderCell}>Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{"SID" + staff._id.slice(-4)}</td>
                      <td style={styles.tableCell}>{staff.username}</td>
                      <td style={styles.tableCell}>{staff.nic}</td>
                      <td style={styles.tableCell}>{staff.email}</td>
                      <td style={styles.tableCell}>{staff.address}</td>
                      <td style={styles.tableCell}>{staff.role}</td>
                      <td style={styles.tableCell}>{staff.salary}</td>
                      <td style={styles.tableCell}>
                        <button
                          style={styles.updateButton}
                          onClick={() => navigate(`/StaffManagmentUpdate/${staff._id}`)}
                        >
                          Update
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(staff._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={styles.tableCell}>
                      No staff data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#161E38", // Dark background similar to LeaveDetails
    color: "#fff", // White text for visibility
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "30px", // Large font for the heading
    fontWeight: "bold",
    color: "white", // Bright color for heading
    textAlign: "center",
  },
  searchBar: {
    marginBottom: "10px", // Consistent spacing
    padding: "10px", // Padding for input
    width: "40%", // Set width to 40% to be consistent with LeaveDetails
    borderRadius: "5px", // Rounded corners
    border: "1px solid #2C3354", // Border with dark blue shade
    backgroundColor: "#243055", // Dark input background
    color: "#fff", // White text inside input
  },
  searchBar2: {
    marginBottom: "40px", // Consistent spacing
    padding: "10px", // Padding for input
    width: "40%", // Set width to 40% to be consistent with LeaveDetails
    borderRadius: "5px", // Rounded corners
    border: "1px solid #2C3354", // Border with dark blue shade
    backgroundColor: "#243055", // Dark input background
    color: "#fff", // White text inside input
  },
  tableWrapper: {
    maxHeight: "80vh", // Limit table height for scrolling if needed
    overflowY: "auto", // Vertical scroll if content exceeds
    width: "100%",
    display: "flex", // Flexbox for centering
    justifyContent: "center", // Horizontally center the table
  },
  table: {
    width: "80%", // Set table width to 80% of the container
    maxWidth: "1200px", // Maximum width for better readability
    borderCollapse: "collapse", // Remove spacing between cells
  },
  tableHeader: {
    backgroundColor: "#2E3A59", // Darker background for the header
  },
  tableHeaderCell: {
    padding: "12px", // Padding inside each header cell
    borderBottom: "1px solid #444", // Gray border below header cells
    textAlign: "left", // Align text to the left
  },
  tableRow: {
    borderBottom: "1px solid #444", // Gray border between rows
  },
  tableCell: {
    padding: "12px", // Padding inside regular cells
    textAlign: "left", // Left-aligned text
  },
  updateButton: {
    padding: "6px 12px", // Padding for the update button
    backgroundColor: "#f0ad4e", // Amber color for update button
    color: "#fff", // White text for contrast
    border: "none", // Remove default button border
    borderRadius: "4px", // Rounded corners for button
    cursor: "pointer", // Pointer cursor on hover
    marginRight: "5px", // Small space between buttons
  },
  deleteButton: {
    padding: "6px 12px", // Padding for the delete button
    backgroundColor: "#FF6347", // Red color for delete
    color: "#fff", // White text for contrast
    border: "none", // Remove default border
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
  },
};

export default StaffTable;
