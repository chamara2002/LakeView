import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GameDetails = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async (gameId) => {
    try {
      await axios.delete(`http://localhost:3000/api/games/games/${gameId}`);
      setGames(games.filter((game) => game._id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={styles.container}>
      <h2 style={styles.title}><center>Games Details</center> </h2>
        
        <input
          type="text"
          placeholder="Search by game name"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchBar}
        /><br></br><br></br>

        <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Game ID</th>
              <th style={styles.headerCell}>Category</th>
              <th style={styles.headerCell}>Game Name</th>
              <th style={styles.headerCell}>Description</th>
              <th style={styles.headerCell}>Price Per Hour</th>
              <th style={styles.headerCell}>Option</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <tr key={game._id} style={styles.row}>
                  <td style={styles.cell}>{"GID" + game._id.slice(-4)}</td>
                  <td style={styles.cell}>{game.category}</td>
                  <td style={styles.cell}>{game.name}</td>
                  <td style={styles.cell}>{game.description}</td>
                  <td style={styles.cell}>Rs. {game.price}</td>
                  <td style={styles.cell}>
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(game._id)}
                    >
                      Delete
                    </button>
                    <button
                      style={styles.editButton}
                      onClick={() => navigate(`/game/edit/${game._id}`)}
                    >
                      Edit
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={styles.row}>
                <td style={styles.cell} colSpan="6">
                  No game details available
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
  container: {
    textAlign: "center",
    backgroundColor: "#161E38",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    color: "#fff",
    padding: "10px",
  },
  searchBar: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  table: {
    width: "100%",
    maxWidth: "1200px", 
    borderCollapse: "collapse",
    marginTop: "20px",
    color: "#fff", 
  },
  tableContainer: {
    backgroundColor: "#1E2749",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
  headerCell: {
    padding: "12px",
    borderBottom: "1px solid #444",
    backgroundColor: "#2E3A59",
    color: "#fff",
    textAlign: "left", 
  },
  row: {
    borderBottom: "1px solid #444",
  },
  cell: {
    padding: "12px",
    textAlign: "left", 
    borderBottom: "1px solid #444",  
  },
  editButton: {
    backgroundColor: "#FFD700", 
    border: "none",
    padding: "6px 12px",  
    cursor: "pointer",
    color: "#000", 
    borderRadius: "4px", 
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px", 
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', 
  },
};


export default GameDetails;
