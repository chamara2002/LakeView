import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";

const AvailableTimes = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Selected date for filtering
  const [gameIdToUpdate, setGameIdToUpdate] = useState(null);
  const [newTimes, setNewTimes] = useState({});

  const { user } = useAuth();

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/games/games");
      
      const currentTime = Date.now();
      const filteredGames = response.data.map((game) => ({
        ...game,
        availableTimes: game.availableTimes.filter(
          (time) => new Date(time).getTime() > currentTime
        ),
      }));

      setGames(filteredGames);

      // Automatically update the server with filtered future dates
      filteredGames.forEach((game) => {
        if (game.availableTimes.length !== response.data.find(g => g._id === game._id).availableTimes.length) {
          updateGameTimes(game._id, game.availableTimes);
        }
      });

    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const updateGameTimes = async (gameId, times) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/games/games/${gameId}`,
        { availableTimes: times }
      );
      console.log("Game updated successfully:", response.data);
    } catch (error) {
      console.error("There was an error updating the game:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Extract unique dates from the available times
  const uniqueDates = [
    ...new Set(
      games.flatMap((game) =>
        game.availableTimes.map((time) =>
          new Date(time).toLocaleDateString("en-CA")
        )
      )
    ),
  ];

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((game) => ({
      ...game,
      availableTimes: game.availableTimes.filter((time) => {
        const timeDate = new Date(time).toLocaleDateString("en-CA"); // Format to match YYYY-MM-DD
        return selectedDate === "" || timeDate === selectedDate;
      }),
    }))
    .filter((game) => game.availableTimes.length > 0);

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
        await updateGameTimes(gameIdToUpdate, newTimes[gameIdToUpdate]);
      }
    };

    updateGame();
    fetchGames();
  }, [newTimes, gameIdToUpdate]);

  return (
    <div>
      <div style={styles.pageContainer}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h2 style={styles.title}>
              <center>Available Times</center>
            </h2>
            <input
              type="text"
              placeholder="Search by game name"
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            <select
            value={selectedDate}
            onChange={handleDateChange}
            style={styles.dateSelect}
          >
            <option value="">Select Date</option>
            {uniqueDates
              .slice() // Create a copy of the array to avoid mutating the original
              .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
              .map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
          </select>

          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Game ID</th>
                  <th style={styles.tableHeader}>Game Name</th>
                  <th style={styles.tableHeader}>Available Time</th>
                  <th style={styles.tableHeader}>Available Date</th>
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
                        <td style={styles.tableCell}>
                          {"GID" + game._id.slice(-4)}
                        </td>
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
    </div>
  );
};

const styles = {
  title: {
    color: "#fff",
    padding: "10px",
  },
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#161E38",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchInput: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  dateSelect: {
    marginBottom: "10px",
    padding: "10px",
    width: "42.1%",
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
    maxWidth: "1200px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "12px",
    backgroundColor: "#2E3A59",
    color: "#fff",
    textAlign: "left",
    borderBottom: "1px solid #444",
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #444",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AvailableTimes;
