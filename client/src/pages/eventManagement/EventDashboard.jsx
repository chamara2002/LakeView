import React, { useState, useEffect } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:3000/api/event/events")
      .then((response) => {
        if (isMounted) {
          setEvents(response.data);
          setFilteredEvents(response.data); // Show all events initially
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let filtered = events;
    
    if (category) {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [category, searchQuery, events]);

  return (
    <>
      <NavBar name="events" />
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <h2 style={styles.categoryTitle}>Category</h2>
          <div style={styles.categoryList}>
            <button
              style={styles.categoryItem}
              onClick={() => setCategory("gaming")}
            >
              Gaming Tournaments
            </button>
            <button
              style={styles.categoryItem}
              onClick={() => setCategory("musical")}
            >
              Musical Events
            </button>
            <button
              style={styles.categoryItem}
              onClick={() => setCategory("others")}
            >
              Others
            </button>
          </div>
        </div>
        <div style={styles.mainContent}>
          <input
            type="text"
            placeholder="Search events by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
          />
          {filteredEvents.length === 0 ? (
            <p>No events found.</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event._id} style={styles.eventCard}>
                <img
                  src={event.poster}
                  alt={event.name}
                  style={styles.eventImage}
                />
                <h3 style={styles.cardTitle}>{event.name}</h3>
                <button
                  style={styles.viewButton}
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 60px)", // assuming navbar is 60px high
    backgroundColor: "#0a1e42",
    paddingBottom:"10px",
    color: "#fff",
    overflow:"auto"
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#1a2b57",
    padding: "20px",
    borderRadius: "8px",
  },
  categoryTitle: {
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
  },
  categoryItem: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#ffff",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none", // To remove the default button border
  },
  mainContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "#000",
  },
  eventCard: {
    backgroundColor: "#1a2b57",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    flex: "1",
    margin: "10px",
    minWidth: "200px",
  },
  eventImage: {
    width: "250px",
    height: "300px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  cardTitle: {
    margin: "10px 0",
    fontSize: "16px",
  },
  viewButton: {
    padding: "10px 20px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EventDashboard;
