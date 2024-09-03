import React from 'react';
import FoodCard from './FoodCard';
import styles from '../../pages/foodManagement/styles/food.module.css';

const FoodList = ({ foods }) => {
  return (
    <div className={styles.foodList}>
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
