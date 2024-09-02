import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../components/core/Footer";
import NavBar from "../../../components/core/NavBar";

const ChangeAvailableTimes = () => {
  const [gameId, setGameId] = useState("");
  const [gameName, setGameName] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [games, setGames] = useState([]);

  // Fetch game IDs when the component loads
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games/games"); // Adjust the endpoint as needed
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // Update the game name when the gameId changes
  useEffect(() => {
    const selectedGame = games.find((game) => game._id === gameId);
    setGameName(selectedGame ? selectedGame.name : "");
  }, [gameId, games]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/games/games/${gameId}`, {
        availableTimes: [new Date(availableTime)],
      });
      console.log("Available time updated:", response.data);
    } catch (error) {
      console.error("Error updating available time:", error);
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Game ID:</label>
            <select
              style={styles.select}
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            >
              <option value="">Select Game ID</option>
              {games.map((game) => (
                <option key={game._id} value={game._id}>
                  {game._id}
                </option>
              ))}
            </select>
          </div>

          {gameName && (
            <div style={styles.formGroup}>
              <p style={styles.gameName}>Game Name: {gameName}</p>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Available Time:</label>
            <input
              type="datetime-local"
              style={styles.input}
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
            />
          </div>

          <button type="button" style={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
          <Footer></Footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#161E38", 
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  formContainer: {
    backgroundColor: "#ffffff", // White background for the form container
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  gameName: {
    fontSize: "16px",
    fontWeight: "normal",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ChangeAvailableTimes;
