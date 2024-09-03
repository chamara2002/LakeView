import React, { useState, useEffect } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import styles from "../../pages/foodManagement/styles/manageFood.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  // Fetch food items
  const fetchFood = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/food"); // Proxy will handle this
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  // Handle delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/delete/${id}`);
      alert("Item deleted successfully!");
      fetchFood(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <>
      <NavBar name="foods" />
      <div className={styles.manageItems}>
        <h2>Manage All Menu Items</h2>
        <span>
  <button 
    onClick={() => navigate("/addFoods")} 
    style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer" }}
  >
    Add Food
  </button>
  <button 
    onClick={() => navigate('/manage/foodOrder')} 
    style={{ backgroundColor: "#008CBA", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px", cursor: "pointer" }}
  >
    Manage orders
  </button>
</span>

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
      <Footer />
    </>
  );
};

export default FoodPage;
