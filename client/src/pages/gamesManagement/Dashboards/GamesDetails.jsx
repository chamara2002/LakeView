import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";
import FeedbackGame from "../FeedbackGame"; // Import the FeedbackForm component
import { BookingContext } from "../../foodManagement/context/BookingContext";
import { useAuth } from "../../foodManagement/context/authContext";

const GamesDetails = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const [game, setGame] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const { setBookingItem } = useContext(BookingContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch game details
    axios
      .get(`http://localhost:3000/api/games/games/${id}`)
      .then((response) => {
        setGame(response.data);
        // Set feedbacks from the game details if available
        setFeedbacks(response.data.ratings || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the game details!", error);
      });
  }, [id]);

  const handleBookNow = () => {
    // Implement booking logic here
    setBookingItem("game", game._id, game.price);
    user ? navigate("/selectSeats") : navigate("/login");
  };

  const handleFeedbackSubmit = () => {
    // Refresh feedbacks after submitting a new one
    axios
      .get(`http://localhost:3000/api/games/games/${id}`)
      .then((response) => {
        setFeedbacks(response.data.ratings || []);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the updated feedbacks!",
          error
        );
      });
  };

  // Utility function to format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); // Format to locale-specific date and time
  };

  if (!game) {
    return <p style={loadingStyle}>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <img src={game.image} style={{ width: "600px",borderRadius: "40px" }} alt="Game" />
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>{game.name}</h2>
          <p>
            <strong>Category:</strong> {game.category}
          </p>
          <p>
            <strong>Description:</strong> {game.description}
          </p>
          <p>
            <strong>Price:</strong> RS.{game.price}
          </p>
          <button style={buttonStyle} onClick={handleBookNow}>
            Book Now
          </button>
          <br />
        </div>

        <h3>Available Times</h3>
        {game.availableTimes && game.availableTimes.length > 0 ? (
  <ul>
    {game.availableTimes.map((time, index) => (
      <li key={index} style={{ marginBottom: '10px' }}>
        {formatDateTime(time)}
      </li>
    ))}
  </ul>
) : (
  <p>No available times.</p>
)}


<FeedbackGame onFeedbackSubmit={handleFeedbackSubmit} />

        <div style={feedbackContainerStyle}>
          <h3 style={feedbackTitleStyle}>Feedbacks :</h3>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback._id} style={feedbackStyle}>
                <p>
                  <strong>Reviewer:</strong>{" "}
                  {feedback.customerId
                    ? `Customer : ${feedback.customerId}`
                    : feedback.customerId.name}
                </p>
                <p>
                  <strong>Rating:</strong> {feedback.score}
                </p>
                <p>
                  <strong>Comment:</strong> {feedback.feedback}
                </p>
              </div>
            ))
          ) : (
            <p>No feedbacks available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Inline CSS Styles
const containerStyle = {
  backgroundColor: "#161E38",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column", // Change to column for a more natural flow
  justifyContent: "flex-start", // Align content to the top
  alignItems: "center",
  padding: "20px",
  color: "#fff",
};

const cardStyle = {
  backgroundColor: "#222",
  padding: "25px", // Increase padding for more space
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Enhanced shadow for better depth
  maxWidth: "450px", // Slightly increased width for more content space
  width: "100%",
  textAlign: "left",
  marginTop: "20px",
};

const cardTitleStyle = {
  marginTop: "10px",
  fontSize: "26px", // Slightly larger font for the title
  marginBottom: "20px", // Increased margin for better spacing
  color: "#ffcc00",
};

const buttonStyle = {
  padding: "12px 25px", // Increased padding for a more comfortable button
  backgroundColor: "#ffcc00",
  color: "#000",
  border: "none",
  borderRadius: "8px", // Increased border-radius for a softer look
  cursor: "pointer",
  transition: "background-color 0.3s ease", // Added smooth hover transition
};

const loadingStyle = {
  color: "#fff",
  textAlign: "center",
  fontSize: "18px", // Slightly larger font for better readability
};

const feedbackContainerStyle = {
  marginTop: "30px", // Increased margin for better spacing from the card
  backgroundColor: "#333",
  padding: "20px", // Increased padding for more space
  borderRadius: "10px",
  width: "80%",
  marginLeft: "10px",
};

const feedbackTitleStyle = {
  fontSize: "22px", // Slightly larger title font
  color: "#ffcc00",
  marginBottom: "15px", // Increased margin for better spacing
};

const feedbackStyle = {
  backgroundColor: "#444",
  padding: "15px", // Increased padding for more space
  marginBottom: "15px", // Increased margin for better spacing
  borderRadius: "8px", // Increased border-radius for a softer look
};

export default GamesDetails;
