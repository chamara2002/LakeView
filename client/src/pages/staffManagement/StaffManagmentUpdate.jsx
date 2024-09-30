import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const StaffUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    username: "",
    nic: "",
    email: "",
    address: "",
    role: "", // Job position as a string
    salary: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    username: '',
    nic: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/staff/${id}`);
        setStaff(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff details:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validations
    if (name === "username") {
      if (/[^a-zA-Z\s]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Name cannot contain symbols or numbers.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "",
        }));
      }
    }

    if (name === "nic") {
      if (!/^\d{9}[vV]$/.test(value) && !/^\d{12}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "NIC must be 12 digits or 9 digits followed by 'V' or 'v'.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "",
        }));
      }
    }

    if (name === "address") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address cannot contain symbols.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "",
        }));
      }
    }

    if (name === "phone") {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number must be exactly 10 digits.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "",
        }));
      }
    }

    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submission
    if (!errors.username && !errors.nic && !errors.address && !errors.phone) {
      try {
        await axios.put(`http://localhost:3000/api/staff/update/${id}`, staff);
        alert("Staff updated successfully!");
        navigate("/stafftable"); // Redirect to the staff list page
      } catch (error) {
        console.error("Error updating staff:", error);
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  if (loading) {
    return <p>Loading staff details...</p>;
  }

  return (
    <div style={background}>
      <NavBar />
      <div style={formContainerStyle}>
        <form style={{ ...formStyle, ...responsiveGrid }} onSubmit={handleSubmit}>
          <h2 style={titleStyle}>Update Staff Member</h2>

          {/* 1. Name */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="username">Name</label>
            <input
              style={inputStyle}
              type="text"
              id="username"
              name="username"
              value={staff.username}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </div>

          {/* 2. Position */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="role">Job Position</label>
            <select
              style={inputStyle}
              id="role"
              name="role"
              value={staff.role}
              onChange={handleChange}
            >
              <option value="" disabled>Select your position</option>
              <option value="Manager">Manager</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Technician">Technician</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* 3. Email */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="email">Email</label>
            <input
              style={inputStyle}
              type="email"
              id="email"
              name="email"
              value={staff.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          {/* 4. NIC */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="nic">NIC</label>
            <input
              style={inputStyle}
              type="text"
              id="nic"
              name="nic"
              value={staff.nic}
              onChange={handleChange}
              placeholder="NIC Number" 
            />
            {errors.nic && <p style={{ color: 'red' }}>{errors.nic}</p>}
          </div>

          {/* 5. Address */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="address">Address</label>
            <input
              style={inputStyle}
              type="text"
              id="address"
              name="address"
              value={staff.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
          </div>

          {/* 6. Salary */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="salary">Salary</label>
            <input
              style={inputStyle}
              type="number"
              id="salary"
              name="salary"
              value={staff.salary}
              onChange={handleChange}
              placeholder="Salary"
            />
          </div>

          {/* 7. Phone */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="phone">Phone</label>
            <input
              style={inputStyle}
              type="text"
              id="phone"
              name="phone"
              value={staff.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
          </div>

          <div style={buttonContainerStyle}>
            <button type="submit" style={registerButtonStyle}>Update</button>
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
  backgroundColor: '#1D284C',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  width: '500px',
};

const titleStyle = {
  textAlign: 'center',
  color: 'white',
};

const inputContainerStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: 'white',
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
  justifyContent: 'center',
};

const registerButtonStyle = {
  backgroundColor: '#4CAF50',
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

export default StaffUpdatePage;
