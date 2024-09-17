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

  const handleIndoorClick = () => {
    console.log("Indoor Games clicked");
    setFilteredGames(games.filter((game) => game.category === "Indoor"));
  };

  const handleOutdoorClick = () => {
    console.log("Outdoor Games clicked");
    setFilteredGames(games.filter((game) => game.category === "Outdoor"));
  };

  const handleWaterClick = () => {
    console.log("Water Games clicked");
    setFilteredGames(games.filter((game) => game.category === "Water"));
  };

  const handleCategoryClick = () => {
    console.log("Show All Games clicked");
    setFilteredGames(games); // Reset to show all games
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredGames(games); // Show all games if search is cleared
    } else {
      setFilteredGames(
        games.filter((game) => game.name.toLowerCase().includes(query))
      );
    } 
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
          <ActivitiesGrid activities={filteredGames} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default GameMainPage;
