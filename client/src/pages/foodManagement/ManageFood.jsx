import React, { useState, useEffect } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import FoodSideBar from "./FoodSideBar";
import styles from "../../pages/foodManagement/styles/manageFood.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const navigate = useNavigate();

  // Fetch food items from the API
  const fetchFood = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/food");
      console.log(response.data); // Log the response data for debugging
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to fetch food items.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFood();
  }, []);

  // Handle delete food item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/delete/${id}`);
      toast.success("Item deleted successfully!");
      fetchFood(); // Refresh the food list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item.");
    }
  };

  // Filter foods based on search query
  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar name="foods" />
      <div className={styles.pageContent}>
        <div className={styles.manageItems}>
          <FoodSideBar />
          <h2 className={styles.centeredHeading}>Manage All Menu Items</h2>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by item name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              className={styles.searchInput}
            />
          </div>

          <div className={styles.tableWrapper}>
            {/* Check if there are no filtered foods */}
            {filteredFoods.length === 0 ? (
              <p className={styles.noItemsFound}>No food items found</p>
            ) : (
              <table className={styles.foodTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Ingredients</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className={styles.foodImage}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.ingredients?.join(", ") || "N/A"}</td>
                      <td>{`Rs. ${item.price.toFixed(2)}`}</td>
                      <td>{item.isAvailable ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className={styles.updateButton}
                          onClick={() => navigate(`/updateFoodItem/${item._id}`)}
                        >
                          ✏️
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(item._id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default FoodPage;
