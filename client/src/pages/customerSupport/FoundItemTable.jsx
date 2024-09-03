import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";

const FoundItemsTable = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [emailSearch, setEmailSearch] = useState(""); // Search term for email
  const [itemSearch, setItemSearch] = useState(""); // Search term for found item
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.user) {
    return null; 
  }

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/lostNFound/all-lost-and-found"
        );
        const filteredItems = response.data.filter((item) => item.isFound);
        setFoundItems(filteredItems);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    };

    fetchFoundItems();
  }, []);

  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lostNFound/delete-lost-and-found/${id}`);
      alert("Deleted successfully");
      console.log("Delete item with id:", id);
      const updatedItems = foundItems.filter(item => item._id !== id);
      setFoundItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredFoundItems = foundItems.filter(item =>
    item.email.toLowerCase().includes(emailSearch.toLowerCase()) &&
    item.foundItem.toLowerCase().includes(itemSearch.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <h3 style={styles.dashboardTitle}>My Dashboard</h3>
        </div>

        <div style={styles.tableContainer}>
          <h2 style={styles.title}>Found Items</h2>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by email..."
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              style={styles.searchBar}
            />
            <input
              type="text"
              placeholder="Search by found item..."
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              style={styles.searchBar}
            />
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Found Items Category</th>
                <th style={styles.th}>Found Item</th>
                <th style={styles.th}>Found Item Place</th>
                {user.user.role ? <th style={styles.th}>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {filteredFoundItems.map((item) => (
                <tr key={item._id}>
                  <td style={styles.td}>{item.userName}</td>
                  <td style={styles.td}>{item.email}</td>
                  <td style={styles.td}>{item.contactNumber}</td>
                  <td style={styles.td}>{item.foundItemsCategory}</td>
                  <td style={styles.td}>{item.foundItem}</td>
                  <td style={styles.td}>{item.foundItemPlace}</td>
                  {user.user.role ? (
                    <td style={styles.actionsTd}>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
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
    minHeight: "100vh",
  },
  dashboard: {
    backgroundColor: "#1B263B",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
    textAlign: "left",
  },
  dashboardTitle: {
    margin: 0,
    color: "#FFFFFF",
  },
  tableContainer: {
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
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchBar: {
    width: '48%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
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
  actionsTd: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  actionButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "5px 10px",
    margin: "2px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default FoundItemsTable;
