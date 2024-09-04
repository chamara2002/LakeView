import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const UpdateGame = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const [gameName, setGameName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
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
        setAvailableTimes(game.availableTimes);
        setImage(game.image);
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

    // Check for validation errors before submitting
    if (nameError || priceError) {
      alert("Please fix validation errors before submitting.");
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
      alert("Game updated successfully!");
      navigate("/GameDetails");
    } catch (error) {
      console.error("There was an error updating the game:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setAvailableTimes([...availableTimes, date]);
    }
  };

  const removeTime = (index) => {
    setAvailableTimes(availableTimes.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.pageContainer}>
      <NavBar />
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
            <label style={styles.label}>Available Times:</label>
            <DatePicker
              selected={null}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select a date and time"
              style={styles.input}
            />
          </div>

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
            Update Game
          </button>
        </form>
      </div>
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
  timesContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#2E3553",
    borderRadius: "5px",
  },
  timesTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#FFD700",
  },
  timesList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  timeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    borderBottom: "1px solid #FFD700",
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
  errorText: {
    color: "#FF6347",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default UpdateGame;
