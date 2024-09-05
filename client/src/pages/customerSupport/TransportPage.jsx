import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import Map from '../../../public/Map.png'
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
          <a href='https://www.google.com/maps/dir/New+Faculty+Building+SLIIT/7.0827855,79.9966061/@6.9989113,79.9120864,12z/data=!3m1!4b1!4m9!4m8!1m5!1m1!1s0x3ae2573621fad1ad:0x54a15134a9f5f1c8!2m2!1d79.9738557!2d6.9154633!1m1!4e1?entry=ttu&g_ep=EgoyMDI0MDkwMi4xIKXMDSoASAFQAw%3D%3D'><img
            src={Map}
            alt="Transport Map"
            style={styles.image}
          /> </a>
        </div>

        <p style={styles.description}>
          Find The Locations From Here......
        </p>

       
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
  description: {
    fontSize: '16px',
    color: '#ffffff',
    textAlign: 'center',
  },
};

export default TransportPage;
