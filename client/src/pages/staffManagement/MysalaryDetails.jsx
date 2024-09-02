import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const StaffManagerProfile = () => {
  return (
   <div>
    <NavBar></NavBar>
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h3 style={styles.dashboardTitle}>Dashboard</h3>
      </div>
      
      <div style={styles.profileContainer}>
        <h2 style={styles.title}>Staff Manager Profile</h2>
        <form style={styles.form}>
          <label style={styles.label}>Name</label>
          <input type="text" style={styles.input} />
          
          <label style={styles.label}>Email</label>
          <input type="email" style={styles.input} />
          
          <label style={styles.label}>NIC</label>
          <input type="text" style={styles.input} />
          
          <label style={styles.label}>Address</label>
          <input type="text" style={styles.input} />
          
          <label style={styles.label}>Phone</label>
          <input type="text" style={styles.input} />
          
          <label style={styles.label}>Job Position</label>
          <input type="text" style={styles.input} />
          
          <label style={styles.label}>Password</label>
          <input type="password" style={styles.input} />
          
          <div style={styles.buttonGroup}>
            <button style={styles.saveButton}>Save</button>
            <button style={styles.deleteButton}>Delete</button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
   </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#0D1B2A',
    color: '#FFFFFF',
    padding: '20px',
  },
  dashboard: {
    backgroundColor: '#1B263B',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  dashboardTitle: {
    margin: 0,
    color: '#FFFFFF',
  },
  profileContainer: {
    backgroundColor: '#415A77',
    padding: '20px',
    borderRadius: '10px',
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
  },
  label: {
    gridColumn: 'span 2',
    color: '#FFFFFF',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px',
  },
  buttonGroup: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#F4D35E',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    backgroundColor: '#1B263B',
    padding: '20px',
    borderRadius: '5px',
  },
  contact: {
    width: '45%',
  },
  about: {
    width: '45%',
  },
};

export default StaffManagerProfile;
