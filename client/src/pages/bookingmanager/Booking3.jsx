import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import CustomButton from '../../components/reUseable/CustomButton';

const Booking3 = () => {
  return (
    <>
      <NavBar name='home' />

      <div style={{ backgroundColor: '#161E38', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '80%', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>&#8249;</span>
          <h2 style={{ margin: 0 }}>Credit/Debit Card</h2>
        </div>

        <div style={{ backgroundColor: '#1D284C', width: '60%', padding: '20px', borderRadius: '10px', color: 'white' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <label style={{ width: '45%' }}>
                Name of the card
              </label>
              <input type="text" style={{ width: '45%', padding: '10px', borderRadius: '5px', border: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <label style={{ width: '45%' }}>
                Expiration (MM/YY)
              </label>
              <input type="text" style={{ width: '45%', padding: '10px', borderRadius: '5px', border: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <label style={{ width: '45%' }}>
                Card number
              </label>
              <input type="text" style={{ width: '45%', padding: '10px', borderRadius: '5px', border: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ width: '45%' }}>
                Expiration (MM/YY)
              </label>
              <input type="text" style={{ width: '45%', padding: '10px', borderRadius: '5px', border: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <span>Total Amount</span>
            <span>Rs.2500</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CustomButton buttonText="Pay Now" style={{ backgroundColor: '#F4A460', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Booking3;
