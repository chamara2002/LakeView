import React from 'react';

const games = [
  { name: 'Bowling', image: '' },
  { name: 'Horse Riding', image: 'horse-riding.jpg' },
  { name: 'Archery', image: 'archery.jpg' },
  { name: 'Football', image: 'football.jpg' },
  { name: 'Water Sports', image: 'water-sports.jpg' },
  { name: 'Badminton', image: 'badminton.jpg' },
  { name: 'Gaming', image: 'gaming.jpg' },
  { name: 'Cricket', image: 'cricket.jpg' },
];

const Games = () => {
  return (
    <div style={styles.gamesContainer}>
      <div style={styles.searchBar}>
        <input type="text" placeholder="Search Games" style={styles.searchInput} />
        <button style={styles.searchButton}>🔍</button>
      </div>
      <div style={styles.gamesGrid}>
        {games.map((game, index) => (
          <div key={index} style={styles.gameCard}>
            <img src={`../Images/${game.image}`} alt={game.name} style={styles.gameImage} />
            <h2 style={styles.gameTitle}>{game.name}</h2>
            <button style={styles.viewButton}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  gamesContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  },
  searchButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  gamesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'center',
  },
  gameImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
  gameTitle: {
    fontSize: '18px',
    margin: '10px 0',
  },
  viewButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Games;
