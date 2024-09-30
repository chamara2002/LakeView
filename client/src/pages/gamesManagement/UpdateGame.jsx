import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateGame = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const [gameName, setGameName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  // Validation states
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    // Fetch the game data by ID and prefill the form
    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/games/games/${id}`
        );
        const game = response.data;

        setGameName(game.name);
        setCategory(game.category);
        setDescription(game.description);
        setPrice(game.price);
        setImage(game.image);

        // Convert each available time string to a Date object
        const convertedTimes = game.availableTimes.map(
          (time) => new Date(time)
        );
        setAvailableTimes(convertedTimes);
      } catch (error) {
        console.error("There was an error fetching the game data:", error);
      }
    };

    fetchGameData();
  }, [id]);

  // Real-time validation for game name
  useEffect(() => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (gameName && !namePattern.test(gameName)) {
      setNameError("Game name can only contain letters and spaces.");
    } else {
      setNameError("");
    }
  }, [gameName]);

  // Real-time validation for price
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

  const handleUpdateGame = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!gameName || !category || !description || price <= null || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check for validation errors before submitting
    if (nameError || priceError) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    const updatedGameData = {
      name: gameName,
      category,
      description,
      availableTimes,
      price,
      image,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/games/games/${id}`,
        updatedGameData
      );
      toast.success("Game updated successfully!");
      // Optionally navigate to a different page after success
      // navigate("/GameDetails");
    } catch (error) {
      console.error("There was an error updating the game:", error);
      toast.error("There was an error updating the game.");
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
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );

      const now = new Date();

      if (combinedDateTime < now) {
        toast.error("Selected date and time cannot be in the past.");
        return;
      }

      setAvailableTimes([...availableTimes, combinedDateTime]);
      setSelectedDate(null); // Reset the date picker
      setSelectedTime(null); // Reset the time picker
    } else {
      toast.error("Please select both date and time before adding.");
    }
  };

  const removeTime = (index) => {
    setAvailableTimes(availableTimes.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.pageContainer}>
      <NavBar />
      <br />
      <h2 style={styles.title}>
        <center>Update Game</center>
      </h2>
      <div style={styles.addGamesContainer}>
        <form style={styles.form} onSubmit={handleUpdateGame}>
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
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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
              value={price === 0 ? '' : price}
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
          <br />

          <div style={styles.formGroup}>
            <label style={styles.label}>Game Image URL:</label>
            <input
              type="text"
              placeholder="Image URL"
              style={styles.input}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.addButton}>
            Update Game
          </button>
        </form>
      </div>
      <ToastContainer />
      <br /><br /><br />
      <Footer />
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
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#FF4C4C",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
};

export default UpdateGame;
