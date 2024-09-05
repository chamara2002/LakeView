import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';
import FoodSidebar from './FoodSideBar';

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    category: '',
    price: '',
    isAvailable: true,
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.backgroundColor = '#161E38';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name) {
      errors.name = 'Name is required.';
    } else if (!nameRegex.test(formData.name)) {
      errors.name = 'Name can only contain letters and spaces.';
    }

    if (!formData.ingredients) {
      errors.ingredients = 'Ingredients are required.';
    }

    const categories = ['Soups', 'Chinese food', 'Pizza', 'Dessert', 'Drinks'];
    if (!formData.category) {
      errors.category = 'Category is required.';
    } else if (!categories.includes(formData.category)) {
      errors.category = 'Please select a valid category.';
    }

    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!formData.price) {
      errors.price = 'Price is required.';
    } else if (!priceRegex.test(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number.';
    }

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (formData.imageUrl && !urlRegex.test(formData.imageUrl)) {
      errors.imageUrl = 'Please enter a valid URL.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      };

      await axios.post('http://localhost:3000/api/food/add-food', dataToSend);
      alert('Food item added successfully!');

      setFormData({
        name: '',
        ingredients: '',
        category: '',
        price: '',
        isAvailable: true,
        imageUrl: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('Failed to add food item. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <br></br>
      
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Food Item</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter food name"
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Ingredients (comma separated)</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter ingredients"
            />
            {errors.ingredients && <span style={styles.error}>{errors.ingredients}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select category</option>
              <option value="Soups">Soups</option>
              <option value="Chinese food">Chinese food</option>
              <option value="Pizza">Pizza</option>
              <option value="Dessert">Dessert</option>
              <option value="Drinks">Drinks</option>
            </select>
            {errors.category && <span style={styles.error}>{errors.category}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
            {errors.price && <span style={styles.error}>{errors.price}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Available</label>
            <select
              name="isAvailable"
              value={formData.isAvailable}
              onChange={handleChange}
              style={styles.input}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter image URL"
            />
            {errors.imageUrl && <span style={styles.error}>{errors.imageUrl}</span>}
          </div>

          <button type="submit" style={styles.submitButton}>
            Add Food
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '70vh',
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
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AddFood;
