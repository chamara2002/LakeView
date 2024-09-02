import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";

const CustomerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false); // State to control the visibility of the "Options" column

  const navigate = useNavigate();

  var { user } = useAuth();

  useEffect(() => {
    if (user.user.role){
      setShowOptions(true);
    }else{
      setShowOptions(false);
    }
  }, [user.user.role]);
  console.log(user.user.role);

  // Function to fetch inquiries
  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/inquiry/inquiries"
      );
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setError("Error fetching inquiries. Please try again later.");
    }
  };

  useEffect(() => {
    // Fetch all inquiries on component mount
    fetchInquiries();
  }, []);

  const handleEdit = (id) => {
    navigate(`/inquiry/edit-inquiry/${id}`);
    console.log("Edit button clicked for ID:", id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`http://localhost:3000/api/inquiry/inquiries/${id}`);
        alert("Inquiry deleted successfully.");
        fetchInquiries(); // Refresh inquiries list after deletion
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("Error deleting inquiry. Please try again later.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard} />
        <div style={styles.inquiriesContainer}>
          <h2 style={styles.title}>Customer Inquiries</h2>
          {error && <p style={styles.error}>{error}</p>}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Inquiry Category</th>
                <th style={styles.th}>Inquiry</th>
                {showOptions && <th style={styles.th}>Options</th>}
                {/* Conditionally render the Options column */}
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td style={styles.td}>{inquiry.userName?.name || "N/A"}</td>
                    <td style={styles.td}>{inquiry.email}</td>
                    <td style={styles.td}>{inquiry.contactNumber}</td>
                    <td style={styles.td}>{inquiry.inquiryCategory}</td>
                    <td style={styles.td}>{inquiry.inquiryMessage}</td>
                    {showOptions && (
                      <td style={styles.td}>
                        <button
                          style={styles.optionButton}
                          onClick={() => handleEdit(inquiry._id)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.optionButton}
                          onClick={() => handleDelete(inquiry._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showOptions ? "6" : "5"} style={styles.td}>
                    No inquiries available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0D1B2A",
    color: "#FFFFFF",
    padding: "20px",
    minHeight: "70vh",
  },
  inquiriesContainer: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  title: {
    color: "#000000",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  optionButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    display: "block",
    margin: "5px 0",
  },
  toggleButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
  },
  error: {
    color: "#FF0000",
    marginBottom: "20px",
  },
};

export default CustomerInquiries;
