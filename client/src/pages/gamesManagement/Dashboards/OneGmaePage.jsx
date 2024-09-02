import React, { useState, useEffect } from 'react';

const GameProfile = () => {
  const [gameData, setGameData] = useState(null);

  // Replace this URL with your backend endpoint
  const fetchGameData = async () => {
    try {
      const response = await fetch('');
      const data = await response.json();
      setGameData(data);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.gameProfile}>
        <img
          src={gameData.imageURL}
          alt={gameData.name}
          style={styles.gameImage}
        />
        <div style={styles.gameDetails}>
          <h2 style={styles.gameName}>{gameData.name}</h2>
          <p>{gameData.description}</p>
          <p><strong>Price:</strong> {gameData.price}</p>
          <p><strong>Available Days:</strong> {gameData.availableDays}</p>
          <p><strong>Available Times:</strong> {gameData.availableTimes}</p>
        </div>
        <button style={styles.bookingButton}>
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1b1f38', // Dark background color
    color: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  gameProfile: {
    backgroundColor: '#2c3e50',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  gameImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  gameDetails: {
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #f39c12', // Border color
    backgroundColor: '#34495e',
  },
  gameName: {
    marginBottom: '10px',
  },
  bookingButton: {
    backgroundColor: '#f39c12',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  },
};

export default GameProfile;
