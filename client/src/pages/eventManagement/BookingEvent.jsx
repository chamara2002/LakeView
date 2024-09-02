import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import { useAuth } from '../foodManagement/context/authContext';
import { useNavigate, useParams } from 'react-router-dom';

const BookingEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.user) {
    return null; 
  }

  const [formData, setFormData] = useState({
    event: id || '', 
    paymentMethod: 'online',
    eventDate: '', 
    customer: user.user._id,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.user) {
      alert('User not authenticated.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/booking/create', {
        ...formData,
        bookingDate: new Date(), // Set current date for bookingDate
        status: 'pending', // Default status
        paymentStatus: 'unpaid', // Default paymentStatus
      });

      navigate(`/billinfo/${id}`); // Redirect to a confirmation page or similar
    } catch (error) {
      console.error('Error booking the event:', error);
    }
  };

  return (
    <>
      <NavBar name="events" />
      <div style={styles.container}>
        <h1 style={styles.heading}>Victory Arena Booking Form</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Event ID</label>
            <input
              type="text"
              name="event"
              placeholder="Event ID"
              value={id}
              onChange={handleChange}
              style={styles.input}
              readOnly // Making the event ID field read-only
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Save Details and Next
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#0a1e42',
    color: '#fff',
    minHeight: 'calc(100vh - 60px)', // assuming navbar is 60px high
  },
  heading: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '36px',
    color: '#fff',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#0a1e42',
    padding: '20px',
    borderRadius: '10px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#fff',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#1a2b57',
    color: '#fff',
  },
  submitButton: {
    padding: '15px 30px',
    backgroundColor: '#3cd1c2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default BookingEvent;
