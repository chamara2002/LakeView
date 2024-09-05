import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";

const StaffRegistrationForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    position: '',
    phone: '',
    nic: '',
  });

  const validateName = (value) => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name can only contain letters and spaces.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const validatePosition = (value) => {
    const positionPattern = /^[A-Za-z\s]+$/;
    if (!positionPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, position: 'Position can only contain letters and spaces.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must be exactly 10 digits.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  const validateNic = (value) => {
    const nicPattern = /^\d{10}V$|^\d{12}$/i;  // NIC must be 12 digits or 10 digits followed by 'V' or 'v'.
    if (!nicPattern.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, nic: 'NIC must be 12 digits or 10 digits followed by V or v.' }));
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, nic: '' }));
    }
};


  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        validateName(value);
        break;
      case 'job':
        setPosition(value);
        validatePosition(value);
        break;
      case 'phone':
        setPhone(value);
        validatePhone(value);
        break;
      case 'nic':
        setNic(value);
        validateNic(value);
        break;
      case 'salary':
        setSalary(value);
        break;
      default:
        if (id === 'email') setEmail(value);
        if (id === 'password') setPassword(value);
        if (id === 'address') setAddress(value);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username: name,
        role: position,
        email,
        password,
        nic,
        address,
        phone,
        salary,
      };
      const response = await axios.post('http://localhost:3000/api/staff/add', newUser);
      console.log(response.data);
      // Reset the form after successful submission
      setName('');
      setPosition('');
      setEmail('');
      setPassword('');
      setNic('');
      setAddress('');
      setPhone('');
      setSalary('');
      alert("Staff member registered successfully!");
      navigate('/stafftable');
    } catch (error) {
      console.error("There was an error registering the staff member!", error);
      alert("Failed to register staff member. Please try again.");
    }
  };

  return (
    <div style={background}>
      <NavBar />
      <div style={formContainerStyle}>
        <form style={{ ...formStyle, ...responsiveGrid }} onSubmit={handleSubmit}>
          <h2 style={titleStyle}>Staff Registration Form</h2>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="name">Name</label>
            <input
              style={inputStyle}
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="job">Position</label>
            <input
              style={inputStyle}
              type="text"
              id="job"
              value={position}
              onChange={handleChange}
            />
            {errors.position && <p style={{ color: 'red' }}>{errors.position}</p>}
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="email">Email</label>
            <input
              style={inputStyle}
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="password">Password</label>
            <input
              style={inputStyle}
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="nic">NIC</label>
            <input
              style={inputStyle}
              type="text"
              id="nic"
              value={nic}
              onChange={handleChange}
            />
            {errors.nic && <p style={{ color: 'red' }}>{errors.nic}</p>}
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="address">Address</label>
            <input
              style={inputStyle}
              type="text"
              id="address"
              value={address}
              onChange={handleChange}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="salary">Salary</label>
            <input
              style={inputStyle}
              type="text"
              id="salary"
              value={salary}
              onChange={handleChange}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="phone">Phone</label>
            <input
              style={inputStyle}
              type="text"
              id="phone"
              value={phone}
              onChange={handleChange}
            />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
          </div>

          <div style={buttonContainerStyle}>
            <button type="submit" style={registerButtonStyle}>Register</button>
            <button type="reset" style={clearButtonStyle}>Clear</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const background = {
  backgroundColor: '#161E38', // Dark background for the entire page
  height: '100vh',
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '130vh',
  backgroundColor: '#161E38', // Dark background for form container
};

const formStyle = {
  backgroundColor: '#9b9fab', // Light background for the form itself
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '400px',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
};

const inputContainerStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const registerButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const clearButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const responsiveGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '15px',
};

export default StaffRegistrationForm;
