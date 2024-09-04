import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/event/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/event/delete/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const handleEdit = (id) => {
    // Navigate to the edit page
    navigate(`/event/edit/${id}`);
  };

  console.log(events);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Event Management</h1>
      <button onClick={() => navigate('/event/add')} style={addButtonStyle}>Add Event</button>
      <div style={gridStyle}>
        {events.map(event => (
          <div key={event._id} style={cardStyle}>
            <h3 style={cardTitleStyle}>{event.name}</h3>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
            <p><strong>End Time:</strong> {new Date(event.end_time).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <div style={buttonContainerStyle}>
              <button onClick={() => handleEdit(event._id)} style={editButtonStyle}>Edit</button>
              <button onClick={() => handleDelete(event._id)} style={deleteButtonStyle}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  backgroundColor: '#161E38',
  minHeight: '100vh',
  padding: '20px',
  color: '#fff',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const addButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'block',
  margin: '0 auto 20px auto',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const cardTitleStyle = {
  marginTop: '0',
  marginBottom: '15px',
  fontSize: '18px',
  color: '#ffcc00',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '15px',
};

const editButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default EventManagement;
