import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { BookingContext } from "../foodManagement/context/BookingContext";

const MovieDetailsPage = ({ imageUrl, onBookNow }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBookingItem } = useContext(BookingContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/movies/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleBooking = ()=>{
    setBookingItem('movie', movie._id, movie.price);
    navigate('/selectSeats');
  }

  console.log(movie)

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={imageContainerStyle}>
            <img
              src={imageUrl || movie?.image || "defaultImagePath.jpg"} // Fallback image
              alt="Movie Poster"
              style={imageStyle}
            />
          </div>
          <div style={detailsContainerStyle}>
            <h2 style={detailsHeaderStyle}>Movie Details</h2>
            <p style={detailItemStyle}>
              <strong>Name:</strong> {movie?.name || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Director:</strong> {movie?.director || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Year:</strong> {movie?.createdAt || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Language:</strong> {movie?.language || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Actors:</strong> {movie?.artists?.join(", ") || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Genre:</strong> {movie?.category || "N/A"}
            </p>
            <p style={detailItemStyle}>
              <strong>Duration:</strong> {movie?.duration || "N/A"} minutes
            </p>
            <p style={detailItemStyle}>
              <strong>Synopsis:</strong> {movie?.description || "N/A"}
            </p>
          </div>
        </div>
        <button style={buttonStyle} onClick={handleBooking}>
          Book Now
        </button>
      </div>
      <Footer />
    </div>
  );
};

// Inline CSS styles (same as before)
const containerStyle = {
  backgroundColor: "#161E38",
  minHeight: "100vh",
  padding: "40px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#fff",
};

const contentStyle = {
  display: "flex",
  backgroundColor: "#1A3C63",
  padding: "20px",
  borderRadius: "10px",
  width: "70%",
  justifyContent: "space-between",
  alignItems: "center",
};

const imageContainerStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "200px",
  height: "300px",
  borderRadius: "8px",
  objectFit: "cover",
};

const detailsContainerStyle = {
  flex: 2,
  backgroundColor: "#254273",
  padding: "20px",
  borderRadius: "10px",
  marginLeft: "20px",
  color: "#ddd",
};

const detailsHeaderStyle = {
  marginBottom: "20px",
  fontSize: "1.5em",
  color: "#fff",
};

const detailItemStyle = {
  marginBottom: "10px",
  fontSize: "1em",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#FFCC00",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.2em",
};

export default MovieDetailsPage;
