import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const StaffUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    username: "",
    nic: "",
    email: "",
    address: "",
    role: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/staff/${id}`);
        setStaff(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff details:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validations
    if (name === "username") {
      if (/[^a-zA-Z\s]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Name cannot contain symbols or numbers.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "",
        }));
      }
    }

    if (name === "nic") {
      if (!/^\d{9}[vV]$/.test(value) && !/^\d{12}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "NIC must be 12 digits or 9 digits followed by 'V' or 'v'.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "",
        }));
      }
    }

    if (name === "address") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address cannot contain symbols.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "",
        }));
      }
    }

    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation check before submission
    if (!errors.username && !errors.nic && !errors.address) {
      try {
        await axios.put(`http://localhost:3000/api/staff/update/${id}`, staff);
        alert("Staff updated successfully!");
        navigate("/stafftable"); // Redirect to the staff list page
      } catch (error) {
        console.error("Error updating staff:", error);
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  if (loading) {
    return <p>Loading staff details...</p>;
  }

  return (
    <div style={styles.background}>
      <NavBar />
      <h1 style={styles.title}>Update Staff</h1>
      <div style={styles.container}>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={staff.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.username && <p style={styles.errorText}>{errors.username}</p>}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="nic" style={styles.label}>NIC</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={staff.nic}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.nic && <p style={styles.errorText}>{errors.nic}</p>}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={staff.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="address" style={styles.label}>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={staff.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.address && <p style={styles.errorText}>{errors.address}</p>}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="role" style={styles.label}>Job Position</label>
            <input
              type="text"
              id="role"
              name="role"
              value={staff.role}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="salary" style={styles.label}>Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={staff.salary}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>Update Staff</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {

  background: {
    backgroundColor: "#161E38",
  },
  container: {
    padding: "20px",
    backgroundColor: "#161E38",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#FFFFFF",
    fontSize: "2rem",
    fontWeight: "bold",
    
  },
  form: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#272D45",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    color: "#FFFFFF",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #3A3F5A",
    backgroundColor: "#1F253B",
    color: "#FFFFFF",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  errorText: {
    color: "#FF6347",
    fontSize: "0.875rem",
    marginTop: "8px",
  },
  submitButton: {
    width: "100%",
    padding: "12px 0",
    backgroundColor: "#FFD700", // Yellow color for better visibility
    color: "#1F253B",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#E5C100", // Slightly darker shade for hover effect
  },
};

export default StaffUpdatePage;
