import React from 'react';
import Footer from '../components/core/Footer';
import Carousel from '../components/core/HomeCarousel';
import ItemCard from '../components/itemCard';
import NavFunction from "../functions/navFunction";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/game1.png", "/game2.png", "/game3.png"];

  // State for games and movies
  const [games, setGames] = useState([]);
  const [movies, setMovies] = useState([]);

  // Effect for fetching games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games/games");
        console.log("Games data:", response.data); // Log the data
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies/movies");
        console.log("Movies data:", response.data); // Log the data
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []); 

  return (
    <section>
      <NavFunction name={"home"} />
      <Carousel images={images} />
      <ItemCard />
      <Footer />
    </section>
  );
};

export default Home;
