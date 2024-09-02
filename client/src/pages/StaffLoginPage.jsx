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
    <section style={{ backgroundColor: '#161E38' }}>
      <NavFunction name={'home'} />
      <center><h1 style={{ color: 'white', fontFamily: 'serif' }}>Staff Login</h1>  </center>
      <Login />
      <Footer />
    </section>
  );
};

export default StaffLoginPage;
