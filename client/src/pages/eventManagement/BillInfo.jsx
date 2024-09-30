import React, { useEffect } from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';

const BillInfo = () => {
  const [event, setEvent] = React.useState('');

  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/event/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  const handleCashPay = async () => {
    try {
      await axios.post('http://localhost:3000/api/payment/add-payment', {
        participant: user.user._id,
        event: id,
        amount: event.price,
      });
      alert('Payment Successful');
      navigate(`/eventdashboard`);
    } catch (e) {
      alert('Payment Failed');
      console.error('Error paying for event:', e);
    }
  };

  console.log(event);

  return (
    <>
      <NavBar name="" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Payment Summary</h1>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3 style={styles.sectionTitle}>Bill Information</h3>
            <p style={styles.infoText}>{`${event.name} booking fee = ${event.price}`}</p>
            <p style={styles.infoText}>{`Total amount = ${event.price}`}</p>
          </div>
          <div style={styles.paymentMethod}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>
            <button
              style={styles.button}
              onClick={() => navigate(`/cardpay/${id}`)}
            >
              Card Payment &rarr;
            </button>
            <button style={styles.button} onClick={handleCashPay}>
              Cash on Arrival &rarr;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#161E38', // Original background color
    color: '#FFFFFF',
    minHeight: '70vh',
  },
  header: {
    marginBottom: '20px',
    padding: '20px',
  },
  mainTitle: {
    fontSize: '30px',
    margin: '0',
    color: '#FFDC5A',
    fontWeight: 'bold',
    letterSpacing: '1px',
    
  },
  body: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: '40px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  billInformation: {
    background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
    color: '#333',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    width: '45%',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  paymentMethod: {
    background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
    color: '#333',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    width: '45%',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  sectionTitle: {
    marginBottom: '15px',
    fontSize: '24px',
    fontWeight: '600',
    color: '#161E38',
    borderBottom: '2px solid #FFDC5A',
    paddingBottom: '10px',
  },
  infoText: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    margin: '10px 0',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s, box-shadow 0.2s',
    fontWeight: 'bold',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

// Add hover effect on buttons using pseudo-class
const buttonHoverStyles = {
  button: {
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
};

export default BillInfo;
