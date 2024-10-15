
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

  const [errors, setErrors] = useState({
    contactNumber: "",
    email: "",
    foundItem: "",
    lostPlace: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/lostNFound/one-lost-and-found/${id}`
        );
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

  const validate = () => {
    const newErrors = {};

    // Validate contact number (10 digits)
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 10 digits.";
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate found item (letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(formData.foundItem)) {
      newErrors.foundItem = "Found item must contain only letters and spaces.";
    }

    // Validate lost place (letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(formData.lostPlace)) {
      newErrors.lostPlace = "Lost place must contain only letters and spaces.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/lostNFound/update-lost-and-found/${id}`,
        formData
      );
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
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
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
            {errors.foundItem && (
              <p style={styles.errorText}>{errors.foundItem}</p>
            )}
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
            {errors.contactNumber && (
              <p style={styles.errorText}>{errors.contactNumber}</p>
            )}
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
            {errors.lostPlace && (
              <p style={styles.errorText}>{errors.lostPlace}</p>
            )}
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
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
  errorText: {
    color: "#FF6347",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default LostItemEditForm;

