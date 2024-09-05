import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../../components/core/Footer";
import NavBar from "../../../components/core/NavBar";

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
    const namePattern = /^[A-Za-z\s]+$/;
    if (gameName && !namePattern.test(gameName)) {
      setNameError("Game name can only contain letters and spaces.");
    } else {
      setNameError("");
    }
  }, [gameName]);

  useEffect(() => {
    if (price < 0) {
      setPriceError("Price cannot be negative.");
    } else {
      setPriceError("");
    }
  }, [price]);

  const handleAddGame = async (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (nameError || priceError) {
      alert("Please fix validation errors before submitting.");
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
      alert("Game added successfully!");
      setGameName("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setAvailableTimes([]);
      setImage("");
    } catch (error) {
      console.error("There was an error adding the game:", error);
      console.error("Error details:", error.response?.data || error.message);
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
      setAvailableTimes([...availableTimes, combinedDateTime]);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert("Please select both date and time.");
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
      <NavBar />
      <h1>
        <center>ADD GAMES</center>
      </h1>
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
              onChange={(e) => setGameName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            {priceError && <p style={styles.errorText}>{priceError}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Available Dates:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a date"
              style={styles.input}
            />
            <br></br>
            <label style={styles.label}>Available Times:</label>  
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
            <br></br>
            <button type="button" onClick={addDateTime} style={styles.addButton}>
              Add Date and Time
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Image:</label>
            <input
              type="text"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {image && (
              <img src={image} alt="Preview" style={styles.imagePreview} />
            )}
          </div>

          {availableTimes.length > 0 && (
            <div style={styles.timesContainer}>
              <h4 style={styles.timesTitle}>Picked Times:</h4>
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

          <button type="submit" style={styles.addButton}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
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
  timesTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#FFD700",
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
  removeButton: {
    backgroundColor: "#FF4136",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addButton: {
    backgroundColor: "#007BFF",
    border: "none",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default AddGames;
