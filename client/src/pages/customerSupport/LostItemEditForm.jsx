import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const LostItemEditForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    foundItemsCategory: "",
    foundItem: "",
    lostPlace: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/lostNFound/one-lost-and-found/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/lostNFound/update-lost-and-found/${id}`, formData);
      alert("Item updated successfully!");
      navigate(-1); 
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Lost item Category:
            <input
              type="text"
              name="foundItemsCategory"
              value={formData.foundItemsCategory}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formRow}>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Lost item:
            <input
              type="text"
              name="foundItem"
              value={formData.foundItem}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formRow}>
          <label style={styles.label}>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Lost place:
            <input
              type="text"
              name="lostPlace"
              value={formData.lostPlace}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: "20px",
    backgroundColor: "#1b1f38",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
  },
  form: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
  },
  formRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
    backgroundColor: "#d3d3d3", 
  },
  submitButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LostItemEditForm;
