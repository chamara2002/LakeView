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
    eventTime: '', // New state for event time
    customer: user.user._id,
    numberOfTickets: '' // New state for number of tickets
  });

  const [isDateValid, setIsDateValid] = useState(true);
  const [isTicketCountValid, setIsTicketCountValid] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'eventDate') {
      const today = new Date().toISOString().split('T')[0];
      setIsDateValid(value >= today);
    }

    if (name === 'numberOfTickets') {
      const numValue = parseInt(value);
      setIsTicketCountValid(numValue >= 1 && numValue <= 10);
    }

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

    console.log("formData: ", formData);

    try {
      await axios.post('http://localhost:3000/api/booking/create', {
        ...formData,
        bookingDate: new Date(),
        status: 'pending',
        paymentStatus: 'unpaid',
      });

      navigate(`/billinfo/${id}`);
    } catch (error) {
      console.error('Error booking the event:', error);
    }
    
  };

  return (
    <>
      <NavBar name="events" />
      <div style={styles.container}>
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
              readOnly
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
            {!isDateValid && (
              <p style={styles.error}>Please select a valid date.</p>
            )}
          </div>

          {/* Time selection dropdown */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Time</label>
            <select
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="" disabled>Select time</option>
              <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
              <option value="7:30 PM - 9:30 PM">7:30 PM - 9:30 PM</option>
              <option value="10:00 PM - 12:00 AM">10:00 PM - 12:00 AM</option>
            </select>
          </div>

       

          <button
            type="submit"
            style={styles.submitButton}
            disabled={!isDateValid || !isTicketCountValid}
          >
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
    backgroundColor: 'yellow',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default BookingEvent;
