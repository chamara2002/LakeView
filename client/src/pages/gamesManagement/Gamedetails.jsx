import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
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
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Games Details</h2>
        
        <input
          type="text"
          placeholder="Search by game name"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchBar}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>GID</th>
              <th style={styles.headerCell}>Category</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Description</th>
              <th style={styles.headerCell}>Price Per Hour</th>
              <th style={styles.headerCell}>Option</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <tr key={game._id} style={styles.row}>
                  <td style={styles.cell}>{game._id}</td>
                  <td style={styles.cell}>{game.category}</td>
                  <td style={styles.cell}>{game.name}</td>
                  <td style={styles.cell}>{game.description}</td>
                  <td style={styles.cell}>Rs. {game.price}</td>
                  <td style={styles.cell}>
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
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#161E38",
    padding: "20px",
    height: "100vh",
  },
  title: {
    color: "#fff",
    backgroundColor: "#000",
    padding: "10px",
  },
  searchBar: {
    margin: "20px 0",
    padding: "10px",
    width: "80%",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    color: "#333",
    backgroundColor: "#fff",
  },
  headerCell: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
  },
  row: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "yellow",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "black",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default GameDetails;
