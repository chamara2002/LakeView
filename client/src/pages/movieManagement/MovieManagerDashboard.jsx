import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import { useNavigate } from 'react-router-dom';

const MovieManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar name="home" />
      <div style={styles.container}>
        <h2 style={styles.header}>Movie Manager Dashboard</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/movies/addnewmovie")}>Add New Movie</button>
          <button style={styles.button} onClick={() => navigate('/EditDeleteUpdateTable')}>View Movies</button>
          <button style={styles.button} onClick={() => navigate('')}>Remove Movies</button>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("")}>Update Movies</button>
          <button style={styles.button} onClick={() => navigate('')}>Update Movie Countdown</button>
          <button style={styles.button} onClick={() => navigate('')}>Update Movie ShowTime</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 150px)', // Adjust for header and footer height
    backgroundColor: '#1b1b2f',
    color: '#fff',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '40px',
    color: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px', // Added margin-bottom to separate the two button groups
  },
  button: {
    padding: '15px 25px',
    backgroundColor: '#f8f8f8',
    color: '#1b1b2f',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '0 10px', // Adjusted margin to add gap between buttons
  },
};

export default MovieManagerDashboard;
