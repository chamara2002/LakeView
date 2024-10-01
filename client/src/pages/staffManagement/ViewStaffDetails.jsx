import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";

const StaffTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState(""); 
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
    color: "white", 
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
  searchBar2: {
    marginBottom: "40px", 
    padding: "10px",
    width: "40%", 
    borderRadius: "5px", 
    border: "1px solid #2C3354", 
    backgroundColor: "#243055", 
    color: "#fff", 
  },
  tableWrapper: {
    maxHeight: "80vh", 
    overflowY: "auto", 
    width: "100%",
    display: "flex", 
    justifyContent: "center",
  },
  table: {
    width: "80%", 
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
  updateButton: {
    padding: "6px 12px", 
    backgroundColor: "#f0ad4e", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer", 
    marginRight: "5px", 
  },
  deleteButton: {
    padding: "6px 12px", 
    backgroundColor: "#FF6347", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer", 
  },
};

export default StaffTable;
