import React from 'react';
import styles from '../../pages/foodManagement/styles/foodOrderStyles.module.css';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const Booking2 = () => {
  return (
    <>
      <NavBar name='home' />
      <div style={{ backgroundColor: '#161E38', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Select Payment Method</h2>
        
        <div style={{ backgroundColor: '#1D284C', width: '60%', padding: '20px', borderRadius: '10px', color: 'white' }}>
          {/* Payment Method Selection */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Credit/Debit Card</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '5px', backgroundColor: '#293559', cursor: 'pointer', width: '70%' }}>
              <div>
                <img src="path_to_paypal_logo" alt="Paypal" style={{ marginRight: '10px' }} />
                <img src="path_to_visa_logo" alt="Visa" style={{ marginRight: '10px' }} />
                <img src="path_to_mastercard_logo" alt="Mastercard" />
              </div>
              <div style={{ fontSize: '24px' }}>&#8250;</div> {/* Right Arrow */}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Cash On Arrival</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '5px', backgroundColor: '#293559', cursor: 'pointer', width: '70%' }}>
              <span></span>
              <div style={{ fontSize: '24px' }}>&#8250;</div> {/* Right Arrow */}
            </div>
          </div>

          {/* Subtotal and Total Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <span>Subtotal</span>
            <span>Rs.2500</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span>Total Amount</span>
            <span>Rs.2500</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking2;
