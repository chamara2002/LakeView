import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    category: '',
    capacity: '',
    location: '',
    price: '',
    status: 'active',
    poster: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the event details
    axios.get(`http://localhost:3000/api/event/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error('Error fetching event:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const validationErrors = {};
    if (!event.name) validationErrors.name = 'Name is required';
    if (!event.description) validationErrors.description = 'Description is required';
    if (!event.date) validationErrors.date = 'Date is required';
    if (!event.start_date) validationErrors.start_date = 'Start date is required';
    if (!event.end_time) validationErrors.end_time = 'End time is required';
    if (!event.category) validationErrors.category = 'Category is required';
    if (!event.capacity || isNaN(event.capacity)) validationErrors.capacity = 'Capacity is required and must be a number';
    if (!event.location) validationErrors.location = 'Location is required';
    if (!event.price || isNaN(event.price)) validationErrors.price = 'Price is required and must be a number';
    if (!event.poster) validationErrors.poster = 'Photo URL is required';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:3000/api/event/update/${id}`, event)
      .then(() => navigate('/eventManagement'))
      .catch(error => console.error('Error updating event:', error));
  };

  return (
   <div style={containerStyle}>
    <NavBar/>
      <div style={contentStyle}>
      <h1 style={headerStyle}>Edit Event</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Name:
          <input type="text" name="name" value={event.name} onChange={handleChange} style={inputStyle} />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </label>
        <label style={labelStyle}>
          Description:
          <input type="text" name="description" value={event.description} onChange={handleChange} style={inputStyle}/>
          {errors.description && <span style={errorStyle}>{errors.description}</span>}
        </label>
        <label style={labelStyle}>
          Date:
          <input type="date" name="date" value={event.date} onChange={handleChange} style={inputStyle} />
          {errors.date && <span style={errorStyle} >{errors.date}</span>}
        </label>
        <label style={labelStyle}>
          Start Time:
          <input type="datetime-local" name="start_time" value={event.start_time} onChange={handleChange} style={inputStyle} />
          {errors.start_time && <span style={errorStyle}>{errors.start_time}</span>}
        </label>
        <label style={labelStyle}>
          End Time:
          <input type="datetime-local" name="end_time" value={event.end_time} onChange={handleChange} style={inputStyle} />
          {errors.end_time && <span style={errorStyle}>{errors.end_time}</span>}
        </label>
        <label style={labelStyle}>
          Category:
          <select name="category" value={event.category} onChange={handleChange} style={inputStyle}>
          <option value="">Select a category</option>
          <option value="gaming">Gaming Tournaments</option>
          <option value="musical">Musical Events</option>
          <option value="others">Others</option> </select>
          {errors.category && <span style={errorStyle}>{errors.category}</span>}
        </label>
        <label style={labelStyle}>
          Capacity:
          <input type="number" name="capacity" value={event.capacity} onChange={handleChange} style={inputStyle} />
          {errors.capacity && <span style={errorStyle}>{errors.capacity}</span>}
        </label>
        <label style={labelStyle}>
          Location:
          <input type="text" name="location" value={event.location} onChange={handleChange} style={inputStyle} />
          {errors.location && <span style={errorStyle}>{errors.location}</span>}
        </label>
        <label style={labelStyle}>
          Price:
          <input type="number" name="price" value={event.price} onChange={handleChange} style={inputStyle} />
          {errors.price && <span style={errorStyle}>{errors.price}</span>}
        </label>
        <label style={labelStyle}>
          Photo URL:
          <input type="text" name="poster" value={event.poster} onChange={handleChange} style={inputStyle} />
          {errors.poster && <span style={errorStyle}>{errors.poster}</span>}
        </label>
        <label style={labelStyle}>
          Status:
          <select name="status" value={event.status} onChange={handleChange} style={inputStyle} >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit" style={buttonStyle}>Update Event</button>
      </form>

    </div>
    <Footer/>
   </div>
  );
};

const containerStyle = {
  backgroundColor: '#1B1F38',
  color: '#FFFFFF',
  padding: '20px',
  borderRadius: '8px',
  minHeight: '100vh',  // Full viewport height
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',

};

const contentStyle = {
  maxWidth: '800px',
  margin: 'auto',
  backgroundColor: '#0E4D92',
  padding: '10px',
  borderRadius: '8px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  
};

const labelStyle = {
  margin: '10px 80px',
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const inputStyle = {
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  backgroundColor: '#ADD8E6',
  color: '#000000',
  width: '80%',
  fontSize: '1rem',

};

const textareaStyle = {
  padding: '10px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  backgroundColor: '#2A2E4A',
  color: '#FFF',
  minHeight: '100px',
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
  alignSelf: 'center',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9em',
  marginTop: '5px',
};

export default EditEvent;
