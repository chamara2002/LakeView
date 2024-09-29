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
  const navigate = useNavigate();

  const fetchFood = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/food");
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to fetch food items.");
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

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

  return (
    <>
      <NavBar name="foods" />
      <div className={styles.pageContent}>
        <div className={styles.manageItems}>
          <FoodSideBar />
          <h2>Manage All Menu Items</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.foodTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((item, index) => (
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
                    <td>{`Rs. ${item.price.toFixed(2)}`}</td>
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
