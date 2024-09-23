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
    email: '',
    phone: '',
    nic: '',
    salary: '',
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

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
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
    const nicPattern = /^\d{9}V$|^\d{12}$/i;
    if (!nicPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, nic: 'NIC must be 12 digits or 9 digits followed by V or v.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nic: '' }));
    }
  };

  const validateSalary = (value) => {
    const salaryPattern = /^[1-9]\d*(\.\d+)?$/; // Positive numbers only
    if (!salaryPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, salary: 'Salary must be a positive number.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, salary: '' }));
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
      case 'email':
        setEmail(value);
        validateEmail(value);
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
        validateSalary(value);
        break;
      default:
        if (id === 'password') setPassword(value);
        if (id === 'address') setAddress(value);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting.');
      return;
    }

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
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
            {errors.salary && <p style={{ color: 'red' }}>{errors.salary}</p>}
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
            
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const background = {
  backgroundColor: '#161E38',
  height: '100vh',
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '130vh',
  backgroundColor: '#161E38',
};

const formStyle = {
  backgroundColor: '#9b9fab',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  width: '500px',
};

const titleStyle = {
  textAlign: 'center',
  color: '#333',
};

const inputContainerStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
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
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const clearButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const responsiveGrid = {
  display: 'grid',
  gap: '1rem',
};

export default StaffRegistrationForm;
