import React, { useEffect, useContext, useState } from 'react'; 
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
  const { bookingDetails } = useContext(BookingContext); 

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
  }, [bookingDetails.itemId]); 

  const handleCashPay = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/bkm/bookings", {
        customer: user.user._id,
        movie: bookingDetails.itemId,
        seatNumbers: bookingDetails.seatNumbers,
        totalPrice: bookingDetails.totalAmount,
        confirmed: false, // Assuming cash payment is considered confirmed
        date: bookingDetails.date,
        time: bookingDetails.time
      });

      if (response.status === 201) {
        alert('Booking Successful');
        navigate(`/movies`);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      alert('Booking Failed');
      console.error('Error booking movie:', error);
    }
  };

  const [hover, setHover] = useState({
    card: false,
    cash: false,
    cancel: false,
  });

  const handleMouseEnter = (buttonType) => {
    setHover((prevState) => ({ ...prevState, [buttonType]: true }));
  };

  const handleMouseLeave = (buttonType) => {
    setHover((prevState) => ({ ...prevState, [buttonType]: false }));
  };

  return (
    <>
      <NavBar name="" />
      <div style={styles.container}>
        <div style={styles.header}></div>
        
        <h3 style={styles.methodTitle}>Choose a Payment Method</h3>

        <div
          style={hover.paymentCard ? { ...styles.paymentMethod, ...styles.paymentMethodHover } : styles.paymentMethod}
          onMouseEnter={() => handleMouseEnter('paymentCard')}
          onMouseLeave={() => handleMouseLeave('paymentCard')}
        >
          
          <button
            style={hover.card ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => handleMouseEnter('card')}
            onMouseLeave={() => handleMouseLeave('card')}
            onClick={() => navigate(`/PayOnline`)}
          >
            Card Payment &rarr;
          </button>
          <button
            style={hover.cash ? { ...styles.button, ...styles.buttonHoverDark } : styles.button}
            onMouseEnter={() => handleMouseEnter('cash')}
            onMouseLeave={() => handleMouseLeave('cash')}
            onClick={handleCashPay}
          >
            Cash on Arrival &rarr;
          </button>
          <button
            style={hover.cancel ? { ...styles.button, ...styles.buttonHoverDark } : styles.button}
            onMouseEnter={() => handleMouseEnter('cancel')}
            onMouseLeave={() => handleMouseLeave('cancel')}
            onClick={() => navigate('/movies')}
          >
            Cancel
          </button>
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
    backgroundColor: '#161E38 ',
    color: '#FFFFFF',
    minHeight: '65vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  paymentMethod: {
    backgroundColor: '#1E2749',
    color: '#FFFFFF',
    padding: '30px 20px',  // Adjusted padding for a more compact look
    borderRadius: '20px',
    width: '80%',  // Adjusted width to better fit the page on various screens
    maxWidth: '450px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: 'scale(1)',
    margin: 'auto',
    position: 'relative',
  },
  paymentMethodHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
  },
  methodTitle: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#FFDD57',
  },
  button: {
    display: 'block',
    width: '90%',
    padding: '12px 15px',  // Reduced padding for a slimmer button profile
    margin: '10px auto',  // Centered buttons with margin adjustments
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  },
  buttonHover: {
    backgroundColor: '#FFDD57',
    color: '#161E38',
    transform: 'scale(1.05)',
  },
  buttonHoverDark: {
    backgroundColor: '#555555',
    transform: 'scale(1.05)',
  },
};

export default MovieBillInfo;
