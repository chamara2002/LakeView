import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/food/${id}`);
        const data = response.data;

        setFormData({
          name: data.name,
          ingredients: Array.isArray(data.ingredients) ? data.ingredients.join(', ') : '',
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

  const validateField = (name, value) => {
    let error = '';
    const nameRegex = /^[A-Za-z\s]+$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const categories = ['Soups', 'Chinese food', 'Pizza', 'Dessert', 'Drinks'];
    const ingredientsRegex = /^[A-Za-z\s,]+$/;

    switch (name) {
      case 'name':
        if (!value) {
          error = 'Name is required.';
        } else if (!nameRegex.test(value)) {
          error = 'Name can only contain letters and spaces.';
        }
        break;
      case 'ingredients':
        if (!value) {
          error = 'Ingredients are required.';
        } else if (!ingredientsRegex.test(value)) {
          error = 'Ingredients can only contain letters, spaces, and commas.';
        }
        break;
      case 'category':
        if (!value) {
          error = 'Category is required.';
        } else if (!categories.includes(value)) {
          error = 'Please select a valid category.';
        }
        break;
      case 'price':
        if (!value) {
          error = 'Price is required.';
        } else if (!priceRegex.test(value) || parseFloat(value) <= 0) {
          error = 'Price must be a positive number.';
        }
        break;
      case 'imageUrl':
        if (value && !urlRegex.test(value)) {
          error = 'Please enter a valid URL.';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validate the field in real-time
    const error = validateField(name, type === 'checkbox' ? checked : value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientsArray = formData.ingredients.split(',').map(ingredient => ingredient.trim());

    // Check for any remaining errors before submitting
    let valid = true;
    const newErrors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        valid = false;
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);

    if (!valid) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      const updatedData = { ...formData, ingredients: ingredientsArray };
      const response = await axios.put(`http://localhost:3000/api/food/update/${id}`, updatedData);

      // Show success notification
      toast.success('Food item updated successfully!');

      setTimeout(() => {
        navigate('/manageFoods'); // Navigate after a short delay
      }, 2000); // Delay of 2 seconds
    } catch (error) {
      console.error('Error updating food item:', error.response ? error.response.data : error.message);
      toast.error('Error updating food item.');
    }
  };

  return (
    <div style={styles.container}>
      <NavBar name="foods" />
      <ToastContainer />
      <div style={styles.updateFoodItem}>
        <h2 style={styles.heading}>Update Food Item</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.ingredients && <span style={styles.error}>{errors.ingredients}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select category</option>
              <option value="Soups">Soups</option>
              <option value="Chinese food">Chinese Food</option>
              <option value="Pizza">Pizza</option>
              <option value="Dessert">Dessert</option>
              <option value="Drinks">Drinks</option>
            </select>
            {errors.category && <span style={styles.error}>{errors.category}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.price && <span style={styles.error}>{errors.price}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Available</label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              style={styles.checkbox}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.imageUrl && <span style={styles.error}>{errors.imageUrl}</span>}
          </div>
          <button type="submit" style={styles.button}>Update Item</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#161E38',
  },
  updateFoodItem: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#858DA8',
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
    color: '#000000',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    width: '100px',
    marginRight: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#D9D9D9',
    color: '#000000',
  },
  select: {
    flex: '1',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#D9D9D9',
    color: '#000000',
    fontSize: '16px',
  },
  checkbox: {
    width: '20px',
    height: '20px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#FFBB00',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '250px',
    textAlign: 'center',
    margin: "20px auto",
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '20px',
  },
};

export default UpdateFoodItems;
