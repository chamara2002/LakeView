import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AddNewMovie = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    language: '',
    duration: '',
    price: '',
    artists: '',
    description: '',
  });

  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Validation logic
    if (id === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Allow only letters and spaces
    }

    if (id === 'language' && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Allow only letters and spaces
    }

    if (id === 'category' && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Allow only letters and spaces
    }

    if (id === 'duration' && !/^\d*$/.test(value)) {
      return; // Allow only numbers
    }

    if (id === 'price' && !/^\d*\.?\d*$/.test(value)) {
      return; // Allow numbers and optional decimal point
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const addTimeRange = () => {
    if (selectedDate && selectedTime) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);

      setSelectedTimes([...selectedTimes, dateTime]);
      setSelectedDate(null);
      setSelectedTime('');
    }
  };

  const removeTime = (index) => {
    const updatedTimes = selectedTimes.filter((_, i) => i !== index);
    setSelectedTimes(updatedTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        duration: parseFloat(formData.duration),
        price: parseFloat(formData.price),
        artists: formData.artists.split(',').map(artist => artist.trim()),
        availableTimes: selectedTimes.map(time => time.toISOString()),
      };

      await axios.post('http://localhost:3000/api/movies/movies', data);
      alert('Movie added successfully');
      setFormData({
        name: '',
        category: '',
        image: '',
        language: '',
        duration: '',
        price: '',
        artists: '',
        description: '',
      });
      setSelectedTimes([]);
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie');
    }
  };

  return (
    <>
      <NavBar name="home" />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <label htmlFor="category" style={styles.label}>Category</label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="image" style={styles.label}>Image URL</label>
                <input
                  type="text"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <label htmlFor="language" style={styles.label}>Language</label>
                <input
                  type="text"
                  id="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Language"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="duration" style={styles.label}>Duration (in minutes)</label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <label htmlFor="price" style={styles.label}>Price</label>
                <input
                  type="text"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="artists" style={styles.label}>Artists (comma-separated)</label>
                <input
                  type="text"
                  id="artists"
                  value={formData.artists}
                  onChange={handleChange}
                  placeholder="Artists"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="description" style={styles.label}>Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  style={styles.textarea}
                ></textarea>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label htmlFor="availableTimes" style={styles.label}>Available Times</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  inline
                />
                <input
                  type="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  style={styles.timeInput}
                />
                <button
                  type="button"
                  onClick={addTimeRange}
                  style={styles.addButton}
                >
                  Add Time
                </button>
                <div style={styles.selectedTimes}>
                  {selectedTimes.map((time, index) => (
                    <div key={index} style={styles.timeItem}>
                      <span>
                        {format(time, "MMM d, yyyy h:mm a")}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTime(index)}
                        style={styles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 150px)', // Adjust height to consider header and footer height
    backgroundColor: '#1b1b2f',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  formContainer: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#2d2d44',
    padding: '20px',
    borderRadius: '10px',
    overflowY: 'auto', // Enables vertical scrolling
    maxHeight: 'calc(100vh - 150px)', // Limits the height to ensure scrolling if needed
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '20px', // Adds gap between two fields
  },
  inputField: {
    width: '48%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#f8f8f8',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#000',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#000',
    resize: 'none',
    height: '100px',
  },
  timeInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#000',
    marginTop: '10px',
  },
  addButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#2ecc71',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  selectedTimes: {
    marginTop: '20px',
  },
  timeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    backgroundColor: '#3a3a6b',
    padding: '10px',
    borderRadius: '5px',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  submitButton: {
    display: 'block',
    width: '150px',
    padding: '10px',
    margin: '0 auto',
    backgroundColor: '#f8c444',
    border: 'none',
    borderRadius: '5px',
    color: '#000',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AddNewMovie;
