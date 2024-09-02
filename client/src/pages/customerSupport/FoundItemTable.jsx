import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useAuth } from "../foodManagement/context/authContext";
import { useNavigate } from "react-router-dom";

const FoundItemsTable = () => {
  const [foundItems, setFoundItems] = useState([]);
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

///delete-lost-and-found/:id
  const handleDelete = async(id) => {
    try{
      await axios.delete(`http://localhost:3000/api/lostNFound/delete-lost-and-found/${id}`);
      alert("Deleted successfully");
      console.log("Delete item with id:", id);
      fetchFoundItems(); 
    }catch (error) {}
    
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <h3 style={styles.dashboardTitle}>My Dashboard</h3>
        </div>

        <div style={styles.tableContainer}>
          <h2 style={styles.title}>Found Items</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Found Items Category</th>
                <th style={styles.th}>Found Item</th>
                <th style={styles.th}>Found Item Place</th>
                {user.user.role ? <th style={styles.th}>Actions</th> : <></>}
              </tr>
            </thead>
            <tbody>
              {foundItems.map((item) => (
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
                  ) : (
                    <></>
                  )}
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
    justifyContent: "space-around",
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
