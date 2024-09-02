import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";

const StaffTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#161E38",
    color: "#234151",
    height: "60vh",
    overflow: "hidden",
  };

  const tableWrapperStyle = {
    maxHeight: "50vh", // Adjust based on your needs
    overflowY: "auto",
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
    position: "sticky",
    top: 0,
    zIndex: 1,
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStaff = staffData.filter((staff) => {
    const name = staff.name ? staff.name.toLowerCase() : "";
    const nic = staff.nic ? staff.nic.toLowerCase() : "";
    const email = staff.email ? staff.email.toLowerCase() : "";
    const address = staff.address ? staff.address.toLowerCase() : "";
    const jobPosition = staff.jobPosition
      ? staff.jobPosition.toLowerCase()
      : "";

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
      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
          }}
        />
        {loading ? (
          <p>Loading staff data...</p>
        ) : (
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>NIC</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Job Position</th>
                  <th style={thStyle}>Salary for hours</th>
                  <th style={thStyle}>Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff.id}>
                      <td style={tdStyle}>{staff.username}</td>
                      <td style={tdStyle}>{staff.nic}</td>
                      <td style={tdStyle}>{staff.email}</td>
                      <td style={tdStyle}>{staff.address}</td>
                      <td style={tdStyle}>{staff.role}</td>
                      <td style={tdStyle}>{staff.salary}</td>
                      <td style={tdStyle}>
                        <button style={updateButtonStyle}>Update</button>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDelete(staff._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={tdStyle}>
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

export default StaffTable;
