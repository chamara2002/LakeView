import React, { useEffect, useContext } from 'react'; // Add useContext import
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
  const { bookingDetails } = useContext(BookingContext); // Use useContext to get bookingDetails

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
  }, [bookingDetails.itemId]); // Add bookingDetails.itemId as dependency

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
          <h1 style={styles.mainTitle}>{game.name}</h1>
          <h2 style={styles.subTitle}>Booking Form</h2>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3>Bill Information</h3>
            <p>{`${game.name} booking fee = R.S.${game.price} X  ${bookingDetails.seatNumbers.length} seats `}</p>
            <p>{`Total amount = R.S.${bookingDetails.total}`}</p>
          </div>
          <div style={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <button style={styles.button} onClick={() => navigate(`/PayOnline`)}>Card Payment &rarr;</button>
            <button style={styles.button} onClick={handleCashPay}>Cash on Delivery &rarr;</button>
            <button style={styles.button} onClick={()=>navigate('/games')}>Cancel</button>
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
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    minHeight: '70vh',
  },
  header: {
    marginBottom: '20px',
  },
  mainTitle: {
    fontSize: '36px',
    margin: '0',
  },
  subTitle: {
    fontSize: '24px',
    margin: '0',
  },
  body: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '40px',
  },
  billInformation: {
    backgroundColor: '#F0F0F0',
    color: '#000000',
    padding: '20px',
    borderRadius: '8px',
    width: '40%',
  },
  paymentMethod: {
    backgroundColor: '#F0F0F0',
    color: '#000000',
    padding: '20px',
    borderRadius: '8px',
    width: '40%',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    margin: '10px 0',
    fontSize: '16px',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GameBillInfo;
