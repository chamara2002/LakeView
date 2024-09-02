import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import map from '../../../public/map.jpg';
const TransportPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div style={styles.container}>
        <div style={styles.dashboard}>
          <h2 style={styles.title}>Dashboard</h2>
          <h3 style={styles.subtitle}>Transport</h3>
        </div>

        <div style={styles.imageContainer}>
          {/* Image replacing the Map component */}
          <img
            src={map}
            alt="Transport Map"
            style={styles.image}
          />
        </div>

        <div style={styles.optionsContainer}>
          <div style={styles.optionRow}>
            <input
              type="radio"
              name="transport"
              value="walk"
              style={styles.radio}
            />
            <label style={styles.label}>Walk</label>
            <input
              type="radio"
              name="transport"
              value="car"
              style={styles.radio}
            />
            <label style={styles.label}>Car</label>
          </div>
          <div style={styles.optionRow}>
            <input
              type="radio"
              name="transport"
              value="bus"
              style={styles.radio}
            />
            <label style={styles.label}>Bus</label>
            <input
              type="radio"
              name="transport"
              value="taxi"
              style={styles.radio}
            />
            <label style={styles.label}>Taxi</label>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.button}>Submit</button>
          <button style={styles.button}>Edit</button>
          <button style={styles.button}>Delete</button>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

const styles = {
  container: {
    padding: '100px',
    backgroundColor: '#161E38',
  },
  dashboard: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '20px',
    margin: '0 0 20px',
    color: '#ffffff',
  },
  imageContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  image: {
    height: '70vh',
    borderRadius: '20px',
    objectFit: 'cover',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  optionRow: {
    margin: '10px',
  },
  radio: {
    marginRight: '10px',
  },
  label: {
    marginRight: '20px',
    color: '#ffffff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#008cba',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TransportPage;
