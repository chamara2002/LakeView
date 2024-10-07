import React, { useState } from 'react';
import NavBar from '../core/NavBar';
import Footer from '../core/Footer';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({}); // Store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Trigger validation in real-time as user types
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    // Username validation (letters only and allows spaces)
    if (name === 'username') {
      const usernamePattern = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/; // Capitalized words with spaces allowed
      if (!value) {
        fieldErrors.username = "Username is required";
      } else if (!usernamePattern.test(value)) {
        fieldErrors.username = "Username must start with a capital letter for each word";
      } else {
        delete fieldErrors.username; // Clear error if valid
      }
    }

    // Email validation
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        fieldErrors.email = "Email is required";
      } else if (!emailPattern.test(value)) {
        fieldErrors.email = "Please enter a valid email";
      } else {
        delete fieldErrors.email; // Clear error if valid
      }
    }

    // Password validation
    if (name === 'password') {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!value) {
        fieldErrors.password = "Password is required";
      } else if (!passwordPattern.test(value)) {
        fieldErrors.password = "Password must be at least 8 characters, contain an uppercase, lowercase, number, and special character";
      } else {
        delete fieldErrors.password; // Clear error if valid
      }
    }

    // Confirm Password validation
    if (name === 'confirmPassword') {
      if (!value) {
        fieldErrors.confirmPassword = "Please confirm your password";
      } else if (value !== formData.password) {
        fieldErrors.confirmPassword = "Passwords do not match";
      } else {
        delete fieldErrors.confirmPassword; // Clear error if valid
      }
    }

    setErrors(fieldErrors);
  };

  const validate = () => {
    let formErrors = {};

    // Validate all fields (for the final form submit)
    validateField('username', formData.username);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('confirmPassword', formData.confirmPassword);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop if validation fails
    }

    try {
      await axios.post('http://localhost:3000/api/customer/register', { ...formData, name: formData.username });
      console.log('Form submitted:', { ...formData, name: formData.username });
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  const pageStyle = {
    backgroundColor: '#161E38',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const formStyle = {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const buttonHoverStyle = {
    backgroundColor: '#004d40',
  };

  return (
   <div>
    <NavBar></NavBar>
     <div style={pageStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px', color: '#00796b' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>First & Last Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.username && <p style={{ color: 'red', fontSize: '14px' }}>{errors.username}</p>}

          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>}

          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.password && <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>}

          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.confirmPassword && <p style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword}</p>}

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = '#00796b'}
          >
            Register
          </button>
        </form>
      </div>
    </div>
    <Footer></Footer>
   </div>
  );
};

export default RegistrationForm;
