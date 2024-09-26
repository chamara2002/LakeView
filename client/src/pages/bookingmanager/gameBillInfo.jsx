import React, { useEffect, useContext } from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';
import { BookingContext } from '../foodManagement/context/BookingContext';

const GameBillInfo = () => {
  const [game, setGame] = React.useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingDetails } = useContext(BookingContext); 

  useEffect(() => {
    if (!bookingDetails.itemId) {
      console.warn("No itemId set in bookingDetails");
      return;
    }

    axios.get(`http://localhost:3000/api/games/games/${bookingDetails.itemId}`)
      .then(response => {
        setGame(response.data);
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
      });
  }, [bookingDetails.itemId]); 

  const handleCashPay = async () => {
    try {
      await axios.post("http://localhost:3000/api/bkg/game-bookings", {
        customer: user.user._id,
        game: bookingDetails.itemId,
        seatNumbers: bookingDetails.seatNumbers,
        totalPrice: bookingDetails.total,
      });
      alert('Payment Successful');
      navigate(`/games`);
    } catch (e) {
      alert('Payment Failed');
      console.error('Error paying for event:', e);
    }
  };

  return (
    <>
      <NavBar name="games" />
      <div style={styles.container}>
        <div style={styles.header}>
        <h3 style={styles.methodTitle}>Choose a Payment Method</h3>
          
        </div>

        <div style={styles.paymentMethod}>
          
          <button style={styles.button} onClick={() => navigate(`/PayOnline`)}>Card Payment &rarr;</button>
          <button style={styles.button} onClick={handleCashPay}>Cash on Delivery &rarr;</button>
          <button style={styles.button} onClick={() => navigate('/games')}>Cancel</button>
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
    minHeight: '70vh',
  },
  header: {
    marginBottom: '30px',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  methodTitle: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#FFDD57',
  },
  subTitle: {
    fontSize: '24px',
    marginTop: '10px',
  },
  paymentMethod: {
    backgroundColor: '#F0F0F0',
    color: '#000000',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    margin: '15px 0',
    fontSize: '16px',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GameBillInfo;
