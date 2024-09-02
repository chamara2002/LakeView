import React, { useState } from 'react';
import styles from '../../pages/foodManagement/styles/foodOrderStyles.module.css';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import CustomButton from '../../components/reUseable/CustomButton';

const Booking1 = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    seatNumber: '',
  });

  const validateName = (value) => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name can only contain letters and spaces.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^\d{0,10}$/;
    if (!phonePattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number can only contain up to 10 digits.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  const validateSeatNumber = (value) => {
    const seatNumberPattern = /^\d*$/;
    if (!seatNumberPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, seatNumber: 'Seat number can only contain digits.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, seatNumber: '' }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        validateName(value);
        break;
      case 'phone':
        setPhone(value);
        validatePhone(value);
        break;
      case 'seatNumber':
        setSeatNumber(value);
        validateSeatNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar name='home' />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', background: '#161E38' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
          <h2>Booking Form</h2>
        </div>
        <div style={{ width: '400px', background: '#1D284C', color: 'white', padding: '20px', boxSizing: 'border-box', borderRadius: '10px' }}>
          <form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {/* First Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ width: '48%' }}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                  />
                  {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div style={{ width: '48%' }}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ width: '48%' }}>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                  />
                  {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                </div>
                <div style={{ width: '48%' }}>
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                  />
                </div>
              </div>

              {/* Third Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ width: '48%' }}>
                  <label htmlFor="seatNumber">Seat Number:</label>
                  <input
                    type="text"
                    id="seatNumber"
                    name="seatNumber"
                    value={seatNumber}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                  />
                  {errors.seatNumber && <p style={{ color: 'red' }}>{errors.seatNumber}</p>}
                </div>
                <div style={{ width: '48%', display: 'flex', gap: '20px' }}>
                  <div style={{ width: '50%' }}>
                    <label htmlFor="hour">Hour:</label>
                    <input
                      type="number"
                      id="hour"
                      name="hour"
                      min="0"
                      max="23"
                      style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    <label htmlFor="minute">Min:</label>
                    <input
                      type="number"
                      id="minute"
                      name="minute"
                      min="0"
                      max="59"
                      style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
                    />
                  </div>
                </div>
              </div>

              <CustomButton buttonText="Book Now" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking1;
