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
          <a href='https://www.google.com/maps/dir/SLIIT+Main+Building,+Malabe/Lake+View+Restaurant+%26+Bar,+Piliyandala+Bypass+Rd,+Piliyandala/@6.8541782,79.8786464,12z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3ae256db1043cc37:0x5f43c37d11c72aa!2m2!1d79.9731674!2d6.9148818!1m5!1m1!1s0x3ae24feaf652ca1b:0x87297a387eea35ce!2m2!1d79.9397643!2d6.7968439?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D'><img
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
