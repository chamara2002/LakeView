// src/components/pages/LoginPage.jsx
import React from 'react';
import NavFunction from '../functions/navFunction'; // Ensure the path is correct
import Footer from '../components/core/Footer'; // Ensure the path is correct
import Login from '../components/logins/LoginSt'; // Ensure the path is correct
import { useAuth } from './foodManagement/context/authContext';

const StaffLoginPage = () => {
const {authState}= useAuth();
console.log('staff login', authState);
  return (
    <section style={{ backgroundColor: '#1a2035' }}>
      <NavFunction name={'home'} />
      <center><h1 style={styles.header}>Staff Login</h1>  </center>
      <Login />
      <Footer />
    </section>
  );
};

const styles = {
  header: {
    textAlign: "center",
    marginBottom: "40px",
    marginTop: "50px",
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
  },
}

export default StaffLoginPage;
