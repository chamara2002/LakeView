import React, { useEffect, useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from "axios";

const ShowtimesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
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

    fetchMovies();
  }, []);

  const showtimes = movies.flatMap(movie =>
    movie.availableTimes.map(time => ({
      date: new Date(time).toLocaleDateString(),
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: movie.name,
      language: movie.language
    }))
  );

  const sortedShowtimes = showtimes.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA - dateTimeB;
  });

  return (
    <>
      <NavBar name="home" />
      <div style={styles.container}>
        <div style={styles.tableContainer}>
          <div style={styles.tableWrapper}>
            <div style={styles.tableHeaderWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Showtime</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Language</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div style={styles.tableBodyWrapper}>
              <table style={styles.table}>
                <tbody>
                  {sortedShowtimes.map((showtime, index) => (
                    <tr key={index}>
                      <td style={styles.tableData}>{showtime.date}</td>
                      <td style={styles.tableData}>{showtime.time}</td>
                      <td style={styles.tableData}>{showtime.name}</td>
                      <td style={styles.tableData}>{showtime.language}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 150px)", // Adjust height to consider header and footer height
    backgroundColor: "#1b1b2f",
    color: "#fff",
  },
  tableContainer: {
    width: "80%",
    maxWidth: "900px",
    backgroundColor: "#2d2d44",
    padding: "20px",
    borderRadius: "10px",
    overflow: "hidden", // Ensures that overflow content is hidden
  },
  tableWrapper: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "400px", // Set a maximum height for the table container
  },
  tableHeaderWrapper: {
    flexShrink: 0, // Prevent header from shrinking
  },
  tableBodyWrapper: {
    overflowY: "auto", // Enable vertical scrolling for the body
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  tableHeader: {
    padding: "15px",
    backgroundColor: "#f8c444",
    color: "#000",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  tableData: {
    padding: "15px",
    borderBottom: "1px solid #ccc",
    color: "#f8f8f8",
  },
};

export default ShowtimesPage;
