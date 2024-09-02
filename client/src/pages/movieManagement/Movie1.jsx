import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import { useParams } from 'react-router-dom';

const Movie1 = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/movies/${id}`);
        
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]); // Add id as a dependency to refetch if it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie data</div>;

  return (
    <>
      <NavBar name='home' />
      <div style={styles.container}>
        <div style={styles.movieContainer}>
          <img
            src={movie.image}
            alt={movie.name}
            style={styles.movieImage}
          />
          <div style={styles.movieDetails}>
            <h2 style={styles.title}>{movie.name}</h2>
            <p><strong>Director:</strong> {movie.director || 'Unknown'}</p>
            <p><strong>Year:</strong> {movie.year || 'Unknown'}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Actors:</strong> {movie.artists.join(', ')}</p>
            <p><strong>Genre:</strong> {movie.category}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            <p><strong>Synopsis:</strong> {movie.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1b1b2f',
    color: '#fff',
  },
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: '#2d2d44',
    padding: '20px',
    borderRadius: '10px',
  },
  movieImage: {
    marginRight: '20px',
    borderRadius: '10px',
  },
  movieDetails: {
    maxWidth: '600px',
  },
  title: {
    marginBottom: '15px',
    color: '#f8f8f8',
  },
};

export default Movie1;
