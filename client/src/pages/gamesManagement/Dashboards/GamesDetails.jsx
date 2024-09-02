import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";

const GamesDetails = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/games/games/${id}`)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the game details!", error);
      });
  }, [id]);

  if (!game) {
    return <p style={loadingStyle}>Loading...</p>;
  }

  return (
<div>
<NavBar></NavBar>
<div style={containerStyle}>
      
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>{game.name}</h2>
        <p><strong>ID:</strong> {game.id}</p>
        <p><strong>Category:</strong> {game.category}</p>
        <p><strong>Description:</strong> {game.description}</p>
        <p><strong>Price:</strong> ${game.price}</p>
      </div>
    </div>
    <Footer></Footer>
</div>
  );
};

// Inline CSS Styles
const containerStyle = {
  backgroundColor: '#161E38',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  color: '#fff',
};

const cardStyle = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'left',
};

const cardTitleStyle = {
  fontSize: '24px',
  marginBottom: '15px',
  color: '#ffcc00',
};

const loadingStyle = {
  color: '#fff',
  textAlign: 'center',
};

export default GamesDetails;
