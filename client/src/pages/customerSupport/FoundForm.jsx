import React, { useState, useEffect } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../foodManagement/context/authContext";

const FoundForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [newItem, setNewItem] = useState({});
  let userId = null;

  if (user.user) {
    // console.log(user.user._id);
    userId = user.user._id;
  }

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lostNFound/one-lost-and-found/${itemId}`
      );
      setItem(response.data);
      setNewItem(response.data); // Initialize form with item data
    } catch (e) {
      console.error(`Error fetching item: ${e}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
      founder: userId,
      isFound: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/lostNFound/update-lost-and-found/${id}`,
        newItem
      );
      navigate("/FoundItemsTable");
    } catch (e) {
      console.error(`Error updating item: ${e}`);
    }
  };

  // console.log(userId);
  console.log(item);

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <button style={styles.dashboardButton}>Dashboard</button>
          <h2 style={styles.title}>Found Items Form</h2>
        </div>

        <form style={styles.formContainer} onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              style={styles.input}
            />
            <input
              type="text"
              name="category"
              placeholder="Found Item Category"
              value={newItem.foundItemsCategory || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formRow}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.input}
            />
            <input
              type="text"
              name="foundItem"
              placeholder="Found Item"
              value={newItem.foundItem || ""}
              style={styles.input}
              disabled
            />
          </div>
          <div style={styles.formRow}>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              style={styles.input}
            />
            <input
              type="text"
              name="foundItemPlace"
              placeholder="Found Place"
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
            <button type="button" style={styles.editButton}>
              Edit
            </button>
            <button type="button" style={styles.deleteButton}>
              Delete
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#161E38",
    minHeight: "80vh",
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
};

export default FoundForm;
