import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";

const AvailableTimes = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gameIdToUpdate, setGameIdToUpdate] = useState(null);
  const [newTimes, setNewTimes] = useState({});

  const { user } = useAuth();

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/games/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTimeDelete = (gameId, time) => async () => {
    const updatedTimes = games
      .find((game) => game._id === gameId)
      .availableTimes.filter((t) => t !== time);

    setNewTimes((prevTimes) => ({
      ...prevTimes,
      [gameId]: updatedTimes,
    }));
    setGameIdToUpdate(gameId);
  };

  useEffect(() => {
    const updateGame = async () => {
      if (gameIdToUpdate && newTimes[gameIdToUpdate]) {
        try {
          const response = await axios.put(
            `http://localhost:3000/api/games/games/${gameIdToUpdate}`,
            { availableTimes: newTimes[gameIdToUpdate] }
          );
          console.log("Game updated successfully:", response.data);
        } catch (error) {
          console.error("There was an error updating the game:", error);
          console.error(
            "Error details:",
            error.response?.data || error.message
          );
        }
      }
    };

    updateGame();
    fetchGames();
  }, [newTimes, gameIdToUpdate]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Available Times</h2>
          <input
            type="text"
            placeholder="Search by game name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Game Name</th>
                <th style={styles.tableHeader}>Available Times</th>
                <th style={styles.tableHeader}>Date</th>
                {user.user.role ? (
                  <th style={styles.tableHeader}>Action</th>
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredGames.length > 0 ? (
                filteredGames.map((game) =>
                  game.availableTimes.map((time, index) => (
                    <tr key={`${game._id}-${index}`} style={styles.tableRow}>
                      <td style={styles.tableCell}>{game._id}</td>
                      <td style={styles.tableCell}>{game.name}</td>
                      <td style={styles.tableCell}>
                        {new Date(time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(time).toLocaleDateString()}
                      </td>
                      {user.user.role ? (
                        <td style={styles.tableCell}>
                          <button
                            style={styles.deleteButton}
                            onClick={handleTimeDelete(game._id, time)}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))
                )
              ) : (
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell} colSpan="5">
                    No games available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#161E38",
    color: "#fff",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1B2138",
    padding: "20px",
  },
  sidebarMenu: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarMenuItem: {
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
  },
  sidebarMenuItemActive: {
    padding: "10px 20px",
    color: "#FFD700",
    cursor: "pointer",
    backgroundColor: "#1E2749",
    borderRadius: "5px",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  searchInput: {
    marginBottom: "20px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  tableContainer: {
    backgroundColor: "#1E2749",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#2C3354",
    color: "#FFD700",
    textAlign: "left",
  },
  tableRow: {
    backgroundColor: "#243055",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #2C3354",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AvailableTimes;
