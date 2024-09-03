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
    start_date: '',
    end_time: '',
    category: '',
    capacity: '',
    location: '',
    price: '',
    status: 'active',
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:3000/api/event/update/${id}`, event)
      .then(() => navigate('/eventManagement'))
      .catch(error => console.error('Error updating event:', error));
  };

  return (
   <div>
    <NavBar></NavBar>
     <div className="edit-event-container">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={event.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </label>
        <label>
          Description:
          <textarea name="description" value={event.description} onChange={handleChange}></textarea>
          {errors.description && <span>{errors.description}</span>}
        </label>
        <label>
          Date:
          <input type="date" name="date" value={event.date} onChange={handleChange} />
          {errors.date && <span>{errors.date}</span>}
        </label>
        <label>
          Start Date:
          <input type="date" name="start_date" value={event.start_date} onChange={handleChange} />
          {errors.start_date && <span>{errors.start_date}</span>}
        </label>
        <label>
          End Time:
          <input type="datetime-local" name="end_time" value={event.end_time} onChange={handleChange} />
          {errors.end_time && <span>{errors.end_time}</span>}
        </label>
        <label>
          Category:
          <input type="text" name="category" value={event.category} onChange={handleChange} />
          {errors.category && <span>{errors.category}</span>}
        </label>
        <label>
          Capacity:
          <input type="number" name="capacity" value={event.capacity} onChange={handleChange} />
          {errors.capacity && <span>{errors.capacity}</span>}
        </label>
        <label>
          Location:
          <input type="text" name="location" value={event.location} onChange={handleChange} />
          {errors.location && <span>{errors.location}</span>}
        </label>
        <label>
          Price:
          <input type="number" name="price" value={event.price} onChange={handleChange} />
          {errors.price && <span>{errors.price}</span>}
        </label>
        <label>
          Status:
          <select name="status" value={event.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit">Update Event</button>
      </form>

      {/* Inline CSS */}
      <style jsx>{`
        .edit-event-container {
          background-color: #161E38; /* Adding the background color */
          color: #fff;
          padding: 20px;
          min-height: 100vh;
        }

        form {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #222B45; /* Darker background for the form */
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow */
        }

        label {
          margin: 15px 0;
          font-weight: bold;
        }

        input, textarea, select {
          margin-top: 5px;
          padding: 12px;
          border: 1px solid #555;
          border-radius: 4px;
          background-color: #1E2A38; /* Darker input background */
          color: #fff; /* White text */
        }

        input::placeholder, textarea::placeholder {
          color: #999; /* Placeholder text color */
        }

        button {
          margin-top: 20px;
          padding: 12px;
          border: none;
          border-radius: 4px;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }

        button:hover {
          background-color: #45a049;
        }

        span {
          color: red;
          font-size: 0.9em;
          display: block;
          margin-top: 5px;
        }
      `}</style>
    </div>
    <Footer></Footer>
   </div>
  );
};

export default EditEvent;
