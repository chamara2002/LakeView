import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate, useParams } from "react-router-dom";

const EditInquiryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the inquiry ID from the URL params
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    inquiryCategory: "",
    inquiryMessage: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
    inquiryMessage: ""
  });

  const [categories] = useState(["Food", "Games", "Movies"]);

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }

    // Fetch the inquiry details using the ID
    axios.get(`http://localhost:3000/api/inquiry/inquiries/${id}`)
      .then(response => {
        const inquiry = response.data;
        setFormData({
          userName: inquiry.userName || 'Staff',
          email: inquiry.email,
          contactNumber: inquiry.contactNumber,
          inquiryCategory: inquiry.inquiryCategory,
          inquiryMessage: inquiry.inquiryMessage,
        });
      })
      .catch(error => {
        console.error("Error fetching inquiry details:", error);
      });
  }, [id, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
      valid = false;
    }

    // Validate contact number (example for numeric validation)
    if (!/^\d+$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact number must be numeric.";
      valid = false;
    }

    // Ensure inquiry message is not empty
    if (!formData.inquiryMessage) {
      errors.inquiryMessage = "Inquiry message cannot be empty.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return; // Do not submit the form if validation fails
    }

    try {
      await axios.put(`http://localhost:3000/api/inquiry/inquiries/${id}`, formData); // Adjust the URL as necessary
      navigate("/customerInquiries"); // Redirect to the customer inquiries page
    } catch (error) {
      console.error("Error updating the form:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.background}>
        <div style={styles.container}>
          <div style={styles.sidebar}>
            <h2 style={styles.sidebarHeading}>Dashboard</h2>
            <button style={styles.sidebarButton}>Edit Inquiry Form</button>
          </div>
          <div style={styles.formContainer}>
            <h2 style={styles.formHeading}>Edit Inquiry Form</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="userName"
                  placeholder="Name"
                  value={formData.userName}
                  readOnly
                  style={styles.inputField}
                />
                <select
                  name="inquiryCategory"
                  value={formData.inquiryCategory}
                  onChange={handleChange}
                  style={styles.inputField}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  readOnly
                  style={styles.inputField}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>
              <div style={styles.formGroup}>
                <textarea
                  name="inquiryMessage"
                  placeholder="Inquiry"
                  value={formData.inquiryMessage}
                  onChange={handleChange}
                  style={{ ...styles.inputField, height: "100px" }}
                ></textarea>
                {errors.inquiryMessage && <span style={styles.errorText}>{errors.inquiryMessage}</span>}
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={styles.inputField}
                />
                {errors.contactNumber && <span style={styles.errorText}>{errors.contactNumber}</span>}
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  Save Changes
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => navigate("/customerInquiries")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  background: {
    height: "80vh",
    backgroundColor: "#161E38",
  },
  container: {
    display: "flex",
    padding: "50px",
    backgroundColor: "#161E38",
    color: "#fff",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#1a243b",
    padding: "20px",
    borderRadius: "10px",
  },
  sidebarHeading: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#fff",
  },
  sidebarButton: {
    backgroundColor: "#17abf9",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    cursor: "pointer",
  },
  formContainer: {
    flex: 1,
    paddingLeft: "20px",
  },
  formHeading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  inputField: {
    width: "48%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#eef0f3",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#f8b619",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#f8b619",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default EditInquiryForm
