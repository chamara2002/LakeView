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
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios.post('http://localhost:3000/api/customer/register', {...formData,name:formData.username});
    console.log('Form submitted:', {...formData,name:formData.username});
    alert('Registration successfull');
    navigate('/login');
  };

  const pageStyle = {
    backgroundColor: '#161E38', // Light cyan background for the page
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
    backgroundColor: '#ffffff', // White background for the form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for form
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
    backgroundColor: '#00796b', // Teal background for the button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const buttonHoverStyle = {
    backgroundColor: '#004d40', // Darker teal for hover effect
  };

  return (
   <div>
    <NavBar></NavBar>
     <div style={pageStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px', color: '#00796b' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            required
          />
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
