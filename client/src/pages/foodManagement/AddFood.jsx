import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';
import FoodSidebar from './FoodSideBar';
import DropdownNavBar from '../../components/core/DropDownbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const validateField = (name, value) => {
    let error = '';
    const nameRegex = /^[A-Za-z\s]+$/;
    const ingredientsRegex = /^[A-Za-z\s,]+$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const categories = ['Soups', 'Chinese food', 'Pizza', 'Dessert', 'Drinks'];

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
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });
    return validationErrors;
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

      const response = await axios.post('http://localhost:3000/api/food/add-food', dataToSend);

      // Show success notification
      toast.success('Food item added successfully!');

      // Clear form and errors after 2 seconds delay
      setTimeout(() => {
        setFormData({
          name: '',
          ingredients: '',
          category: '',
          price: '',
          isAvailable: true,
          imageUrl: ''
        });
        setErrors({});
      }, 1000);
    } catch (error) {
      console.error('Error adding food item:', error.response ? error.response.data : error.message);
      toast.error('Failed to add food item. Please try again.');
    }
  };

  return (
    <div>
      <NavBar name="foods" />
      <br></br>
      <DropdownNavBar />
      
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
            <label style={styles.label}>Ingredients </label>
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
              placeholder="Enter price"
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

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            Add Food
          </button>
        </form>
      </div>
      <Footer />

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#858DA8',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
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
    transition: 'border-color 0.3s ease',
  },
  error: {
    color: '#FF6347',
    fontSize: '12px',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#FFBB00',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold',
    width: '250px',
    textAlign: 'center',
    margin: '20px auto',
  },
  submitButtonHover: {
    backgroundColor: '#FF8C00',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '20px',
  },
  
  
};

export default AddFood;
