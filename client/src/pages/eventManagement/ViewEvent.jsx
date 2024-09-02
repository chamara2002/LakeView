import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';
import axios from 'axios';

const ViewEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/api/event/events/${id}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the event details!", error);
      });
  }, [id]);

  if (!event) {
    return <p>Loading...</p>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <>
      <NavBar name="events" />
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img src={event.poster} alt={event.name} style={styles.eventImage} />
        </div>
        <div style={styles.detailsSection}>
          <h1 style={styles.eventTitle}>{event.name}</h1>
          <p style={styles.eventDescription}>
            {event.description}
          </p>
          <button style={styles.bookButton} onClick={()=>navigate(`/bookingevent/${id}`)}>Book Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    backgroundColor: '#0a1e42',
    color: '#fff',
    minHeight: 'calc(100vh - 60px)', // assuming navbar is 60px high
  },
  imageSection: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
  },
  eventImage: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
  },
  detailsSection: {
    flex: '1.5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: '32px',
    color: '#3cd1c2',
    marginBottom: '20px',
  },
  eventDescription: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  bookButton: {
    padding: '15px 30px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    alignSelf: 'start',
  },
};

export default ViewEvent;
