import React, { useState, useEffect } from 'react';
import FoodList from '../../components/reUseable/foodList';
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import styles from '../../pages/foodManagement/styles/food.module.css';
import axios from 'axios';

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food"); 
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFood();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar name="foods" />
      <div className={styles.foodPage}>
        <header className={styles.foodHeader}>
          <h1>Lakeview Restaurant</h1>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchBar}
          />
        </header>
        <FoodList foods={filteredFoods} />
      </div>
      <Footer />  
    </div>
  );
}


export default FoodPage;
