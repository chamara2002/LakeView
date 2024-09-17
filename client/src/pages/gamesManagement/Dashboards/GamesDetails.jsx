import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";
import FeedbackGame from "../FeedbackGame"; 
import { BookingContext } from "../../foodManagement/context/BookingContext";
import { useAuth } from "../../foodManagement/context/authContext";

const GamesDetails = () => {
  const { id } = useParams(); 
  const [game, setGame] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const { setBookingItem } = useContext(BookingContext);
  const { user } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/games/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setFeedbacks(response.data.ratings || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the game details!", error);
      });
  }, [id]);

  const handleBookNow = () => {
    setBookingItem("game", game._id, game.price);
    user ? navigate("/selectSeats") : navigate("/login");
  };

  const handleFeedbackSubmit = () => {
    axios
      .get(`http://localhost:3000/api/games/games/${id}`)
      .then((response) => {
        setFeedbacks(response.data.ratings || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the updated feedbacks!", error);
      });
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); 
  };

  if (!game) {
    return <p style={loadingStyle}>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={gameStyle}>
          <img 
            src={game.image} 
            style={{ maxWidth: '300px',minWidth: '400px', maxHeight: '400px', minHeight: '300px', borderRadius: '10px' }} 
            alt="Game" 
          />
          <div>
            <h2 style={cardTitleStyle}>{game.name}</h2><br></br><br></br>
            <p style={{ marginLeft: "250px",fontSize: '18px', color: 'white' }}>
              <strong>Category:</strong> {game.category}
            </p><br></br>
            <p style={{ marginLeft: "250px",fontSize: '18px', color: 'white' }}> 
              <strong>Description:</strong> {game.description}
            </p><br></br>
            <p style={{ marginBottom: "180px",marginLeft: "250px",fontSize: '18px', color: 'white' }}>
              <strong>Price:</strong> RS. {game.price}
            </p>
          </div>
        </div>
  
        <div style={atime}>
          <center><h3>Available Times</h3></center>
          {game.availableTimes && game.availableTimes.length > 0 ? (
            <ul>
              {game.availableTimes.map((time, index) => (
                <li key={index} style={{ fontSize: '18px', color: 'white', lineHeight: '2' }}>
                  {formatDateTime(time)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available times.</p>
          )}
        </div>

        <div style={buttonContainerStyle}>
        <button style={goBackButtonStyle} onClick={handleGoBack}>
          Go Back
        </button>
        <button style={buttonStyle} onClick={handleBookNow}>
          Book Now
        </button>
        </div>
  
        <FeedbackGame onFeedbackSubmit={handleFeedbackSubmit} />
        <div style={feedbackContainerStyle}>
          <h3 style={feedbackTitleStyle}>Feedbacks:</h3>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback._id} style={feedbackStyle}>
                <p>
                  <strong>Reviewer:</strong> {feedback.customerId}
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

const containerStyle = {
  backgroundColor: "#161E38",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column", 
  justifyContent: "flex-start", 
  alignItems: "center",
  padding: "20px",
  color: "#fff",
};

const gameStyle = {
  display: 'flex', 
  alignItems: 'center',
  gap: '20px', 
  marginBottom: '20px',
  backgroundColor: "#1d284c",
  minHeight: "50vh",
  minWidth: "160vh",
  padding: "25px", 
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", 
  maxWidth: "530px", 
  maxHeight: "530px",
};

const atime = {
  backgroundColor: "#1d284c",
  padding: "25px", 
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", 
  width: "500px",
  textAlign: "left",
  marginTop: "10px",
};

const cardTitleStyle = {
  fontSize: "30px", 
  color: "#ffcc00",
  marginLeft: "250px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-start", 
  width: "100%", 
  paddingLeft: "870px", 
  marginTop: "50px",
  gap: '10px', 
};

const buttonStyle = {
  width:"300px",
  padding: "12px 25px", 
  backgroundColor: "#ffcc00",
  color: "#000",
  border: "none",
  borderRadius: "8px", 
  cursor: "pointer",
  transition: "background-color 0.3s ease", 
};

const goBackButtonStyle = {
  color:"white",
  width:"300px",
  padding: "12px 25px", 
  backgroundColor: "Black",
  border: "none",
  borderRadius: "8px", 
  cursor: "pointer",
  transition: "background-color 0.3s ease", 
};

const loadingStyle = {
  color: "#fff",
  textAlign: "center",
  fontSize: "18px", 
};

const feedbackContainerStyle = {
  marginTop: "30px",
  backgroundColor: "#333",
  padding: "20px", 
  borderRadius: "10px",
  width: "80%",
  marginLeft: "10px",
};

const feedbackTitleStyle = {
  fontSize: "22px",
  color: "#ffcc00",
  marginBottom: "15px",
};

const feedbackStyle = {
  backgroundColor: "#444",
  padding: "15px", 
  marginBottom: "15px", 
  borderRadius: "8px", 
};

export default GamesDetails;
