import React, { useEffect } from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';

const MovieBill = () => {

  const [event, setEvent] = React.useState('');

  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios.get(``)
     .then(response => {
        setEvent(response.data);
      })
     .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, []);

  const handleCashPay = async() => {
    try{
      await axios.post("http://localhost:3000/api/payment/add-payment",{
        participant:user.user._id,
        event:id,
        amount: event.price,
      });
      alert('Payment Successful');
      navigate(`/`);
    }catch(e){
      alert('Payment Failed');
      console.error('Error paying for Movie:', e);
    }
  };

  console.log(event);

  return (
    <>
      <NavBar name="events" />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>{event.name}a</h1>
          <h2 style={styles.subTitle}>Booking Form</h2>
        </div>
        <div style={styles.body}>
          <div style={styles.billInformation}>
            <h3>Bill Information</h3>
            
          </div>
          <div style={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <button style={styles.button} onClick={()=>navigate(`/cardpay/${id}`)} >Card Payment &rarr;</button>
            <button style={styles.button} onClick={handleCashPay} >Cash on Delivery &rarr;</button>
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

export default MovieBill;
