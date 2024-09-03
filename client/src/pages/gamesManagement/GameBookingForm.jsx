import React, { useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const GameBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    participants: "",
    contact: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div>
        <NavBar></NavBar>
    <div style={styles.background}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Bowling</h2>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="participants"
          placeholder="Number of participation"
          value={formData.participants}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="tel"
          name="contact"
          placeholder="Contact number"
          value={formData.contact}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Book Now</button>
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: '#0B0D29',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    backgroundColor: '#1C1F4A',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px'
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#FFB400',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default GameBookingForm;
