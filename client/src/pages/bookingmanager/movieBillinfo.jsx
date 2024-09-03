import React, { useEffect, useContext } from 'react'; // Add useContext import
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';
import { BookingContext } from '../foodManagement/context/BookingContext';

const MovieBillInfo = () => {
  const [movie, setMovie] = React.useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingDetails } = useContext(BookingContext); // Use useContext to get bookingDetails

  useEffect(() => {
    if (!bookingDetails.itemId) {
      console.warn("No itemId set in bookingDetails");
      return;
    }

    axios.get(`http://localhost:3000/api/movies/movies/${bookingDetails.itemId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [bookingDetails.itemId]); // Add bookingDetails.itemId as dependency

  const handleCashPay = async () => {
    try {
      await axios.post("http://localhost:3000/api/bkm/bookings", {
        customer: user.user._id,
        movie: bookingDetails.itemId,
        seatNumbers: bookingDetails.seatNumbers,
        totalPrice: bookingDetails.total,
      });
      alert('Payment Successful');
      navigate(`/movies`);
    } catch (e) {
      alert('Payment Failed');
      console.error('Error paying for event:', e);
    }
  };

  return (
    <>
      <NavBar name="movies" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>{movie.name}</h1>
          <h2 style={styles.subTitle}>Booking Form</h2>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3>Bill Information</h3>
            <p>{`${movie.name} booking fee = R.S.${movie.price} X  ${bookingDetails.seatNumbers.length} seats `}</p>
            <p>{`Total amount = R.S.${bookingDetails.total}`}</p>
          </div>
          <div style={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <button style={styles.button} onClick={() => navigate(`/PayOnline`)}>Card Payment &rarr;</button>
            <button style={styles.button} onClick={handleCashPay}>Cash on Delivery &rarr;</button>
            <button style={styles.button} onClick={()=>navigate('/movies')}>Cancel</button>
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

export default MovieBillInfo;
