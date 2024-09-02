import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../foodManagement/context/authContext";

const LostItemsTable = () => {
  const [lostItems, setLostItems] = useState([]);
  const [showOptions, setShowOptions] = useState(false); // Control visibility of the options column
  const {user} = useAuth();
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
    if (user.user.role){
      setShowOptions(true);
    }
    else{
      setShowOptions(false);
    }
    }, [user]);


  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/lostNFound/all-lost-and-found"
        );
        setLostItems(response.data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
        alert("Failed to fetch lost items. Please try again later.");
      }
    };

    fetchLostItems();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/lostNFound/delete-lost-and-found/${id}`
        );
        setLostItems(lostItems.filter((item) => item._id !== id));
        alert("Item deleted successfully.");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again later.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <h3 style={styles.dashboardTitle}>My Dashboard</h3>
        </div>

        <div style={styles.tableContainer}>
          <h2 style={styles.title}>Lost Items Form</h2>
          <div style={styles.tableWrapper}>
            <div style={styles.tableHeaderWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Contact Number</th>
                    <th style={styles.th}>Lost Items Category</th>
                    <th style={styles.th}>Lost Item</th>
                    <th style={styles.th}>Lost Item Place</th>
                    {showOptions && <th style={styles.th}>Options</th>}
                    {/* Options Column */}
                    <th style={styles.th}>Found</th> {/* New Found Column */}
                  </tr>
                </thead>
              </table>
            </div>
            <div style={styles.tableBodyWrapper}>
              <table style={styles.table}>
                <tbody>
                  {lostItems.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{item.userName}</td>
                      <td style={styles.td}>{item.email}</td>
                      <td style={styles.td}>{item.contactNumber}</td>
                      <td style={styles.td}>{item.foundItemsCategory}</td>
                      <td style={styles.td}>{item.foundItem}</td>
                      <td style={styles.td}>{item.lostPlace}</td>
                      {showOptions && (
                        <td style={styles.td}>
                          <div style={styles.optionsContainer}>
                            <button
                              style={styles.optionButton}
                              onClick={() =>
                                navigate(`/lostNfound/edit/${item._id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              style={styles.optionButton}
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                      <td style={styles.td}>
                        <button
                          style={styles.foundButton}
                          onClick={() => navigate(`/foundItm/${item._id}`)}
                        >
                          Found
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          {/* <button style={styles.editButton}>Edit</button> */}
          <button style={styles.generateButton}>Generate Reports</button>
          {/* <button style={styles.deleteButton}>Delete</button> */}
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
  tableWrapper: {
    maxHeight: "600px",
    overflowY: "auto",
    display: "block",
  },
  tableHeaderWrapper: {
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 2,
  },
  tableBodyWrapper: {
    display: "block",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "5px",
    width: "100%",
  },
  foundButton: {
    backgroundColor: "#4CAF50", // Green color for found button
    color: "#FFFFFF",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  generateButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#F4D35E",
    color: "#000",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default LostItemsTable;
