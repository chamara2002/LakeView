import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditDeleteUpdateTable = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/movies/movies"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editmovie/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Language</th>
            <th style={styles.tableHeader}>Genre</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{movie.name}</td>
              <td style={styles.tableCell}>{movie.language}</td>
              <td style={styles.tableCell}>{movie.category}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(movie._id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    margin: "20px",
    padding: "20px",
    backgroundColor: "#1b1f38",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#e0f0ff",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeaderRow: {
    backgroundColor: "#0c1024",
    color: "#ffffff",
  },
  tableHeader: {
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
  },
  editButton: {
    marginRight: "5px",
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#000",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#fff",
  },
};

export default EditDeleteUpdateTable;
