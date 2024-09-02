import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const UpdateFoodItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    category: 'Appetizer',
    price: '',
    isAvailable: false,
    imageUrl: ''
  });

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/food/${id}`);
        const data = response.data;
        setFormData({
          name: data.name,
          ingredients: data.ingredients.join(', '),
          category: data.category,
          price: data.price,
          isAvailable: data.isAvailable,
          imageUrl: data.imageUrl
        });
      } catch (error) {
        console.error('Error fetching food item:', error.response ? error.response.data : error.message);
      }
    };

    fetchFoodItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());
    const updatedData = { ...formData, ingredients: ingredientsArray };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', updatedData.name);
      formDataToSend.append('ingredients', JSON.stringify(updatedData.ingredients));
      formDataToSend.append('category', updatedData.category);
      formDataToSend.append('price', updatedData.price);
      formDataToSend.append('isAvailable', updatedData.isAvailable);
      if (updatedData.imageUrl) {
        formDataToSend.append('imageUrl', updatedData.imageUrl);
      }

      const response = await axios.put(`http://localhost:3000/api/food/update/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Food item updated:', response.data);
      navigate('/manageFoods');
    
    } catch (error) {
      console.error('Error updating food item:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.updateFoodItem}>
        <h2 style={styles.heading}>Update Food Item</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Item Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ingredients:</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              style={styles.input}
            />
            <small style={styles.small}>Enter ingredients separated by commas</small>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverage">Beverage</option>
              <option value="Dessert">Dessert</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Available:</label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              style={styles.checkbox}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Update Item</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  updateFoodItem: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fffff', // Changed background color
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  checkbox: {
    width: '20px',
    height: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: '10px',
  },
  small: {
    fontSize: '0.9em',
    color: '#666',
  }
};

export default UpdateFoodItems;
