import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGames = () => {
  const [gameName, setGameName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [image, setImage] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Validation states
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  // Real-time validation
  useEffect(() => {
    const pricePattern = /^\d+$/;
    if (price < 0) {
      setPriceError("Price cannot be negative.");
    } else if (!pricePattern.test(price.toString())) {
      setPriceError("Price can only contain numbers.");
    } else {
      setPriceError("");
    }
  }, [price]);

  useEffect(() => {
    if (price < 0) {
      setPriceError("Price cannot be negative.");
    } else {
      setPriceError("");
    }
  }, [price]);

  const handleAddGame = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!gameName || !category || !description || price <= 0 || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check for validation errors before submitting
    if (nameError || priceError) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    const gameData = {
      name: gameName,
      category,
      description,
      availableTimes,
      price,
      image,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/games/games",
        gameData
      );
      console.log("Game added successfully:", response.data);
      toast.success("Game added successfully!");
      setGameName("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setAvailableTimes([]);
      setImage("");
      setSelectedDate(null);  
      setSelectedTime(null);  
    } catch (error) {
      console.error("There was an error adding the game:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error("There was an error adding the game. Please try again.");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const addDateTime = () => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());

      // Check if the selected date and time is in the past
      if (combinedDateTime < new Date()) {
        toast.error("Cannot add a date and time in the past.");
        return;
      }

      setAvailableTimes([...availableTimes, combinedDateTime]);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      toast.error("Please select both date and time.");
    }
  };

  const removeTime = (index) => {
    setAvailableTimes(availableTimes.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  return (
    <div style={styles.pageContainer}>
      <br />
      <h2 style={styles.title}>
        <center>Add Games</center>
      </h2>
      <div style={styles.addGamesContainer}>
        <form style={styles.form} onSubmit={handleAddGame}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <select
              style={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Water">Water</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Game Name:</label>
            <input
              type="text"
              placeholder="Game Name"
              style={styles.input}
              value={gameName}
              onChange={(e) => {
                const value = e.target.value;

                if (/^[a-zA-Z\s]*$/.test(value)) {
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                  setGameName(capitalizedValue); 
                  setNameError(""); 
                } else {
                  setNameError("Please enter only letters and spaces."); 
                }
              }}
            />
            {nameError && <p style={styles.errorText}>{nameError}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <input
              type="text"
              placeholder="Description"
              style={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Price:</label>
            <input
              type="number"
              placeholder="Price"
              style={styles.input}
              value={price === 0 ? '' : price} // Show empty string instead of 0
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            {priceError && <p style={styles.errorText}>{priceError}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Available Date & Time:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
                style={styles.input}
              />
              <DatePicker
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                style={styles.input}
              />
              <button type="button" onClick={addDateTime} style={styles.addtButton}>
                Add
              </button>
            </div>
          </div>

          {availableTimes.length > 0 && (
            <div style={styles.timesContainer}>
              <h1 style={styles.label}>Picked Times:</h1>
              <ul style={styles.timesList}>
                {availableTimes.map((time, index) => (
                  <li key={index} style={styles.timeItem}>
                    {time.toLocaleString()}{" "}
                    <button
                      type="button"
                      onClick={() => removeTime(index)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br/>

          <div style={styles.formGroup}>
            <label style={styles.label}>Game Image URL:</label>
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {image && (
              <img src={image} alt="Preview" style={styles.imagePreview} />
            )}
          </div>

          <button type="submit" style={styles.addButton}>
            Add Game
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  title: {
    color: "#fff",
    padding: "10px",
  },
  pageContainer: {
    backgroundColor: "#161E38",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addGamesContainer: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  form: {
    backgroundColor: "#1E2749",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#FFD700",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
  },
  fileInput: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
  },
  imagePreview: {
    marginTop: "10px",
    maxWidth: "200px",
    borderRadius: "5px",
  },
  timesContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#2E3553",
    borderRadius: "5px",
  },
  timesList: {
    listStyleType: "none",
    padding: "0",
  },
  timeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#3A3F64",
    borderRadius: "5px",
    color: "#fff",
  },
  addtButton: {
    backgroundColor: "#FFD700",
    border: "none",
    color: "black",
    padding: "5px 10px",
    borderRadius: "2px",
    cursor: "pointer",
    width: "20%",
    height: "23px",
    marginLeft: "40px",
  },
  removeButton: {
    backgroundColor: "#FF4136",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addButton: {
    backgroundColor: "#FFD700",
    border: "none",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    marginTop: "30px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default AddGames;
