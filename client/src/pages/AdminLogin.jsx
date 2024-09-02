// src/components/pages/LoginPage.jsx
import React from 'react';
import NavFunction from '../functions/navFunction'; // Ensure the path is correct
import Footer from '../components/core/Footer'; // Ensure the path is correct
import Login from '../components/logins/Login'; // Ensure the path is correct

const AdminLoginPage = () => {
  return (
    <section style={{ backgroundColor: '#161E38' }}>
      <NavFunction name={'home'} />
      <Login />
      <Footer />
    </section>
  );
};

export default AdminLoginPage;
