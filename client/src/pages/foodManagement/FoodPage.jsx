import React, { useState, useEffect } from 'react';
import FoodList from '../../components/reUseable/foodList';
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from 'axios';

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === "" || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <NavBar name="foods" />
      <div style={{
        backgroundColor: '#161E38',
        minHeight: '100vh',
        padding: '20px',
        color: 'white'
      }}>
        <header style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>Lakeview Restaurant</h1>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              marginTop: '10px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '80%',
              maxWidth: '400px'
            }}
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{
              marginTop: '10px',
              padding: '8px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              width: '10%',
              maxWidth: '400px',
              backgroundColor: '#FFBB00',
              color: '#333333',
              fontSize: '16px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              outline: 'none',
              textAlign: 'center'
            }}
          >
            <option value="">All Categories</option>
            <option value="Soups">Soups</option>
            <option value="Chinese food">Chinese Foods</option>
            <option value="Pizza">Pizzas</option>
            <option value="Dessert">Desserts</option>
            <option value="Drinks">Drinks</option>
          </select>
        </header>
        <FoodList foods={filteredFoods} />
      </div>
      <Footer />  
    </div>
  );
}

export default FoodPage;
