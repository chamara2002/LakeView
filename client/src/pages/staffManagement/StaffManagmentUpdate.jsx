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
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/staff/update/${id}`, staff);
      alert("Staff updated successfully!");
      navigate("/stafftable"); // Redirect to the staff list page
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  if (loading) {
    return <p>Loading staff details...</p>;
  }

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>Update Staff</h1>
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
  container: {
    padding: "20px",
    backgroundColor: "#161E38",
    minHeight: "80vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default StaffUpdatePage;
