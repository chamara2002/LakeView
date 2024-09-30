import React, { useEffect } from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';

const BillInfo = () => {
  const [event, setEvent] = React.useState('');

  const { id } = useParams();
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

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Payment Summary</h1>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3 style={styles.sectionTitle}>Bill Information</h3>
            <div style={styles.infoBlock}>
              <p style={styles.infoText}>
                <strong>Event:</strong> {event.name || "Loading..."}
              </p>
              <p style={styles.infoText}>
                <strong>Booking Fee:</strong> ${event.price || "Loading..."}
              </p>
              <p style={styles.infoText}>
                <strong>Total Amount:</strong> ${event.price || "Loading..."}
              </p>
            </div>
          </div>
          <div style={styles.paymentMethod}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>
            <p style={styles.methodDescription}>
              Choose your preferred payment method below:
            </p>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary }}
              onClick={() => navigate(`/cardpay/${id}`)}
            >
              Card Payment &rarr;
            </button>
            <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={handleCashPay}>
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
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#161E38',
    color: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginBottom: '30px',
  },
  mainTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#FFDC5A',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  body: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: '30px',
    gap: '20px',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1200px',
  },
  billInformation: {
    background: '#ffffff',
    color: '#333',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    width: '60%',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paymentMethod: {
    background: '#ffffff',
    color: '#333',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    width: '60%',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: '15px',
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#161E38',
    borderBottom: '2px solid #FFDC5A',
    paddingBottom: '10px',
    width: '100%',
    textAlign: 'center',
  },
  infoBlock: {
    margin: '15px 0',
    textAlign: 'left',
  },
  infoText: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
    margin: '8px 0',
  },
  methodDescription: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '10px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
  },
  buttonSecondary: {
    backgroundColor: '#28a745',
    color: '#FFFFFF',
  },
  buttonPrimaryHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  buttonSecondaryHover: {
    backgroundColor: '#218838',
    transform: 'scale(1.05)',
  },
};

export default BillInfo;
