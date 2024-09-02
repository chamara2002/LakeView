import React from 'react';
import FoodCard from './foodCard';
import styles from '../../pages/foodManagement/styles/food.module.css'

const FoodList = ({ foods }) => {
  return (
    <div className={styles.foodList}>
      {foods.map((food, index) => (
        <FoodCard key={index} food={food} />
      ))}
    </div>
  );
}

export default FoodList;
