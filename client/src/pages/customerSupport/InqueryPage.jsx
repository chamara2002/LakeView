import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";

const InquiryForm = () => {
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

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    inquiryCategory: "",
    inquiryMessage: "",
  });

  const [errors, setErrors] = useState({});
  const [categories] = useState(["Food", "Games", "Movies"]);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.user._id, 
        userName: user.user.name,
        email: user.user.email,
      }));
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits.";
    }
    if (!formData.inquiryCategory) {
      newErrors.inquiryCategory = "Inquiry category is required.";
    }
    if (!formData.inquiryMessage) {
      newErrors.inquiryMessage = "Inquiry message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:3000/api/inquiry/inquiries", formData);
        navigate("/customerInquiries");
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.background}>
        <div style={styles.container}>
          <div style={styles.sidebar}>
            <h2 style={styles.sidebarHeading}>Dashboard</h2>
            <button style={styles.sidebarButton}>Inquiry Form</button>
          </div>
          <div style={styles.formContainer}>
            <h2 style={styles.formHeading}>Inquiry Form</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="userName"
                  placeholder="Name"
                  value={user ? user.user.name : ""}
                  readOnly
                  style={styles.inputField}
                />
                <select
                  name="inquiryCategory"
                  value={formData.inquiryCategory}
                  onChange={handleChange}
                  style={styles.inputField}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.inquiryCategory && (
                <p style={styles.errorText}>{errors.inquiryCategory}</p>
              )}
              <div style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user ? user.user.email : ""}
                  readOnly
                  style={styles.inputField}
                />
                <textarea
                  name="inquiryMessage"
                  placeholder="Inquiry"
                  value={formData.inquiryMessage}
                  onChange={handleChange}
                  style={{ ...styles.inputField, height: "100px" }}
                ></textarea>
              </div>
              {errors.inquiryMessage && (
                <p style={styles.errorText}>{errors.inquiryMessage}</p>
              )}
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={styles.inputField}
                />
              </div>
              {errors.contactNumber && (
                <p style={styles.errorText}>{errors.contactNumber}</p>
              )}
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  Submit
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
  errorText: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  },
};

export default InquiryForm;
