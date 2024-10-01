import React, { useState, useEffect } from "react"; 
import NavFunction from "../../functions/navFunction"; // Ensure the path is correct
import Footer from "../../components/core/Footer"; // Ensure the path is correct
import ActivitiesGrid from "./ActivitiesGrid";
import CategorizeNav from "../../components/core/CategorizeNav";
import axios from "axios";

const GameMainPage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activeCategory, setActiveCategory] = useState("All"); // Track the selected category

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/games/games"
        ); // Proxy will handle this
        setGames(response.data);
        setFilteredGames(response.data); // Set the initial filtered games
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // Function to handle filtering based on category
  const filterGames = (category, searchTerm) => {
    let filtered = games;

    if (category !== "All") {
      filtered = filtered.filter((game) => game.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  };

  const handleIndoorClick = () => {
    setActiveCategory("Indoor");
    filterGames("Indoor", searchQuery);
  };

  const handleOutdoorClick = () => {
    setActiveCategory("Outdoor");
    filterGames("Outdoor", searchQuery);
  };

  const handleWaterClick = () => {
    setActiveCategory("Water");
    filterGames("Water", searchQuery);
  };

  const handleCategoryClick = () => {
    setActiveCategory("All");
    filterGames("All", searchQuery); // Show all games
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterGames(activeCategory, query);
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const todayGames = games.filter((game) => {
      return game.availableTimes.some((time) => time.split('T')[0] === today);
    });
    setFilteredGames(todayGames);
  };

  return (
    <section style={{ backgroundColor: "#161E38" }}>
      <NavFunction name={"games"} />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div style={{ width: "20%" }}>
          <CategorizeNav
            onIndoorClick={handleIndoorClick}
            onOutdoorClick={handleOutdoorClick}
            onWaterClick={handleWaterClick}
            onCategoryClick={handleCategoryClick} // For "Show All Games"
            onTodayClick={handleTodayClick} // Added function for "Today Available"
          />
        </div>

        <div style={{ width: "80%", display: "flex", flexFlow: "column wrap" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search games by name"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                marginTop: "50px",
                marginLeft: "350px",
                padding: "10px",
                width: "40%",
                borderRadius: "5px",
                border: "1px solid #2C3354",
                backgroundColor: "#243055",
                color: "#fff",
              }}
            />
          </div>
          {filteredGames.length > 0 ? (
            <ActivitiesGrid activities={filteredGames} />
          ) : (
            <p style={{ color: "#fff", textAlign: "center" }}>No games found.</p>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default GameMainPage;
