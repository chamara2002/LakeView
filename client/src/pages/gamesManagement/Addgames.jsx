import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const GameManagementPanel = () => {
  return (
    <div>
        <NavBar></NavBar>
        <div style={styles.panelContainer}>
      <h1 style={styles.panelTitle}>Games Management Panel</h1>
      <button style={{ ...styles.panelButton, ...styles.addGamesButton }}>Add Games</button>
      <button style={styles.panelButton}>Games Details</button>
      <button style={styles.panelButton}>Available Times</button>
      <button style={styles.panelButton}>Feedback Details</button>
      <button style={styles.panelButton}>Rating Details</button>
      
    </div>
    <Footer></Footer>
    </div>
  );
};

const styles = {
  panelContainer: {
    backgroundColor: '#1b1f38', // Navy background
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  panelTitle: {
    color: '#fff',
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  panelButton: {
    width: '200px',
    padding: '10px 0',
    margin: '10px 0',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  addGamesButton: {
    backgroundColor: '#f0ad4e', // Yellow color for the "Add Games" button
    color: '#000',
  },
};

export default GameManagementPanel;
