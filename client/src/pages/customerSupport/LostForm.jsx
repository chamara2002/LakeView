import React, { useState, useEffect } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";
import axios from "axios";

const LostItemsForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.user) {
    return null; 
  }

  const userId = user.user ? user.user._id : "";
  const userName = user.user ? user.user.name ? user.user.name :user.user.username  : "";
  const userEmail = user.user ? user.user.email : "";

  const [formData, setFormData] = useState({
    userName: userName,
    userId: userId,
    email: userEmail,
    contactNumber: "",
    foundItem: "",
    lostPlace: "",
    foundItemsCategory: "Sport",
  });

  // Validation states
  const [contactNumberError, setContactNumberError] = useState("");
  const [foundItemError, setFoundItemError] = useState("");
  const [lostPlaceError, setLostPlaceError] = useState("");

  // Real-time validation useEffect hooks
  useEffect(() => {
    const contactNumberPattern = /^[0-9]{10}$/;
    if (formData.contactNumber && !contactNumberPattern.test(formData.contactNumber)) {
      setContactNumberError("Contact number must be exactly 10 digits.");
    } else {
      setContactNumberError("");
    }
  }, [formData.contactNumber]);

  useEffect(() => {
    const itemPlacePattern = /^[A-Za-z\s]+$/;
    if (formData.foundItem && !itemPlacePattern.test(formData.foundItem)) {
      setFoundItemError("Lost item name can only contain letters and spaces.");
    } else {
      setFoundItemError("");
    }
  }, [formData.foundItem]);

  useEffect(() => {
    const itemPlacePattern = /^[A-Za-z\s]+$/;
    if (formData.lostPlace && !itemPlacePattern.test(formData.lostPlace)) {
      setLostPlaceError("Lost place can only contain letters and spaces.");
    } else {
      setLostPlaceError("");
    }
  }, [formData.lostPlace]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (contactNumberError || foundItemError || lostPlaceError) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/lostNFound/add-lost-and-found",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/lostitems");
      } else {
        console.error("Form submission failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <button style={styles.dashboardButton}>Dashboard</button>
          <h2 style={styles.title}>Lost Items Form</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formRow}>
            <input
              type="text"
              name="userName"
              value={userName}
              readOnly
              style={styles.input}
            />
            <select
              name="foundItemsCategory"
              value={formData.foundItemsCategory}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Sport">Sport</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div style={styles.formRow}>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              style={styles.input}
            />
            <input
              type="text"
              name="foundItem"
              value={formData.foundItem}
              onChange={handleChange}
              placeholder="Lost Item"
              style={styles.input}
            />
            {foundItemError && <p style={styles.errorText}>{foundItemError}</p>}
          </div>
          <div style={styles.formRow}>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              style={styles.input}
            />
            {contactNumberError && <p style={styles.errorText}>{contactNumberError}</p>}
            <input
              type="text"
              name="lostPlace"
              value={formData.lostPlace}
              onChange={handleChange}
              placeholder="Lost Place"
              style={styles.input}
            />
            {lostPlaceError && <p style={styles.errorText}>{lostPlaceError}</p>}
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        <div style={styles.buttonContainer}>
          <button style={styles.editButton}>Edit</button>
          <button style={styles.deleteButton}>Delete</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#161E38",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dashboard: {
    marginBottom: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dashboardButton: {
    backgroundColor: "#1E2A47",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  title: {
    fontSize: "24px",
    color: "#ffffff",
    marginBottom: "20px",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    width: "500px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  input: {
    width: "48%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#FFA800",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  editButton: {
    backgroundColor: "#FFA800",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteButton: {
    backgroundColor: "#FFA800",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "#FF6347",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default LostItemsForm;
