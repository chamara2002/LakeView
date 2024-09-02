import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const Booking5 = () => {
  return (
    <>
      <NavBar name="home" />
      <div style={{ display: 'flex', backgroundColor: '#0b0f29', color: 'white', minHeight: '80vh' }}>
        
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor: '#1c2335', padding: '20px' }}>
          <h2 style={{ color: '#f1c40f', marginBottom: '30px' }}>Booking Manager</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Dash Board
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Manage Bookings
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Users
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                View Booking History
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#1c2335', padding: '30px', borderRadius: '10px', minWidth: '350px', textAlign: 'center' }}>
            <h2 style={{ color: '#f1c40f', marginBottom: '30px' }}>Booking Manager Profile</h2>
            <form>
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#f1f1f1',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#f1f1f1',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#f1f1f1',
                  }}
                />
              </div>
              <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                <label htmlFor="jobTitle" style={{ display: 'block', marginBottom: '8px' }}>Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  placeholder="Job Title"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#f1f1f1',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#f1c40f',
                    color: '#0b0f29',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Update
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking5;
