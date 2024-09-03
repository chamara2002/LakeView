import React, { useEffect, useContext, useState } from 'react'; // Add useContext import
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';
import { BookingContext } from '../foodManagement/context/BookingContext';
import CartSummary from './CartSummery';

const FoodPurchase = () => {
  const [movie, setMovie] = React.useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart ,setCart] = useState([]);

  const handleCashPay = async () => {
    setCart(JSON.parse(localStorage.getItem('cart')));
    const total = localStorage.getItem('total') ? localStorage.getItem('total') : 0;
    try {
        // Collect cart items
        const meals = cart.map(item => ({
          food: item._id,
          quantity: item.quantity,
        }));
  
        // Calculate total price
        const totalPrice = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
  
        // Post request to the backend
        await axios.post('http://localhost:3000/api/order/add-order', {
          userId:user.user._id,
          meals,
          totalPrice:total,
          isCompleted: false,
        });
  
        // Redirect or show a success message
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        localStorage.removeItem('total');
        navigate('/food/start');
      } catch (error) {
        console.error('Error during checkout:', error);
      }
  };

  return (
    <>
      <NavBar name="foods" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>{movie.name}</h1>
          <h2 style={styles.subTitle}>Booking Form</h2>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3>Bill Information</h3>
            <CartSummary />
          </div>
          <div style={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <button style={styles.button} onClick={() => navigate(`/PayOnlineFood`)}>Card Payment &rarr;</button>
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

export default FoodPurchase;
