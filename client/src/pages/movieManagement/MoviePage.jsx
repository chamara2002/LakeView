import React, { useEffect, useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/movies/movies"
        );
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (selectedGenre) {
      filtered = filtered.filter((movie) => movie.category === selectedGenre);
    }

    if (selectedLanguage) {
      filtered = filtered.filter(
        (movie) => movie.language === selectedLanguage
      );
    }

    const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (selectedDate) {
      const now = normalizeDate(new Date());
      filtered = filtered.filter((movie) => {
        const availableDates = movie.availableTimes.map((date) =>
          normalizeDate(new Date(date))
        );

        if (selectedDate === "Now Showing") {
          return availableDates.some(
            (date) => date.getTime() === now.getTime()
          );
        } else if (selectedDate === "Upcoming") {
          return availableDates.every((date) => date > now);
        }
        return false;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [selectedGenre, selectedLanguage, selectedDate, searchTerm, movies]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedLanguage("");
    setSelectedDate("");
    setSearchTerm("");
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedGenre("");
    setSelectedDate("");
    setSearchTerm("");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedGenre("");
    setSelectedLanguage("");
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSelectedGenre("");
    setSelectedLanguage("");
    setSelectedDate("");
  };

  console.log(filteredMovies);

  const handleNavigate = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <NavBar name="movies" />
      <div style={styles.container}>
        <div style={styles.filterSection}>
          <input
            type="text"
            placeholder="Search Movies"
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchBox}
          />
          <div style={styles.filterContainer}>
            <div style={styles.filterCategory}>
              <h3 style={styles.filterTitle}>Filter By Genre</h3>
              <ul style={styles.filterList}>
                <li style={styles.filterListItem} onClick={() => handleGenreSelect("Family")}>Family</li>
                <li style={styles.filterListItem} onClick={() => handleGenreSelect("Action")}>Action</li>
                <li style={styles.filterListItem} onClick={() => handleGenreSelect("Crime")}>Crime</li>
                <li style={styles.filterListItem} onClick={() => handleGenreSelect("Horror")}>Horror</li>
                <li style={styles.filterListItem} onClick={() => handleGenreSelect("Romantic")}>Romantic</li>
              </ul>
            </div>
            <div style={styles.filterCategory}>
              <h3 style={styles.filterTitle}>Filter By Language</h3>
              <ul style={styles.filterList}>
                <li style={styles.filterListItem} onClick={() => handleLanguageSelect("Sinhala")} className="lsit01">Sinhala</li>
                <li style={styles.filterListItem} onClick={() => handleLanguageSelect("Tamil")} className="list02">Tamil</li>
                <li style={styles.filterListItem} onClick={() => handleLanguageSelect("Hindi")} className="list03">Hindi</li>
                <li style={styles.filterListItem} onClick={() => handleLanguageSelect("English")} className="list03">English</li>
              </ul>
            </div>
            <div style={styles.filterCategory}>
              <h3 style={styles.filterTitle}>Filter By Date</h3>
              <ul style={styles.filterList}>
                <li onClick={() => handleDateSelect("Now Showing")}>Now Showing</li>
                <li onClick={() => handleDateSelect("Upcoming")}>Upcoming</li>
              </ul>
            </div>
          </div>
          <button
            style={styles.showtimesButton}
            onClick={() => navigate("/movies/showtimes")}
          >
            View Showtimes
          </button>
        </div>
        <div style={styles.moviesGrid}>
          {filteredMovies.map((movie, index) => (
            <div
              key={index}
              style={styles.movieCard}
              onClick={() => handleNavigate(movie._id)}
            >
              <img
                src={movie.image}
                alt={movie.title}
                style={styles.movieImage}
              />
              <p style={styles.movieTitle}>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    backgroundColor: "#1b1f38",
  },
  filterSection: {
    width: "250px",
    backgroundColor: "#0c1024",
    padding: "15px",
    borderRadius: "10px",
    marginRight: "20px",
    color: "white",
  },
  filterContainer: {
    marginBottom: "20px",
  },
  filterCategory: {
    marginBottom: "20px",
  },
  filterTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  filterList: {
    listStyleType: "none",
    paddingLeft: "0",
    color: "white",
    cursor: "pointer",
    marginBottom: "10px"
    
  },
  filterListItem: {
    marginBottom: "10px",
  },
  
  lsit01:{
    padding: "10px",
  },
  searchBox: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
  },
  showtimesButton: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  moviesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "20px",
    flexGrow: 1,
  },
  movieCard: {
    textAlign: "center",
    backgroundColor: "#0c1024",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  movieImage: {
    width: "90%",
    borderRadius: "10px",
  },
  movieTitle: {
    color: "#fff",
    marginTop: "10px",
  },
};

export default MoviePage;
