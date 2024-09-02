import React, { useState, useEffect } from 'react';
import FoodList from '../../components/reUseable/foodList';
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import styles from '../../pages/foodManagement/styles/food.module.css'
import axios from 'axios';

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
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


  /* useEffect(() => {
    // Fetch the food items from your API or server
    fetch('/api/foods')
      .then(response => response.json())
      .then(data => setFoods(data))
      .catch(error => console.error('Error fetching food data:', error));
  }, []); */

  console.log(foods);

  return (
    <>
      <NavBar name="foods" />
      <div className={styles.foodPage}>
        <header className={styles.foodHeader}>
          <h1>Lakeview Restaurant</h1>
          {/* Add any other header elements or search bar here */}
        </header>
        <FoodList foods={foods} />
      </div>
      <Footer />  
    </>
  );
}

export default FoodPage;
