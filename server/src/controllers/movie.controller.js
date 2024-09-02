const Movie = require("../models/movie.model.js");

/**
 * @function getMovies
 * @description View all movies
 * @returns {Promise<Movie[]>} A promise that resolves with an array of all movies
 */
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function getMovieById
 * @description View a single movie by ID
 * @param {string} id The ID of the movie to find
 * @returns {Promise<Movie>} A promise that resolves with the found movie
 * @throws {Error} Throws an error if the movie is not found
 */
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    res.json(movie);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/**
 * @function createMovie
 * @description Create a new movie
 * @param {Object} req.body The request body containing the movie details
 * @param {string} req.body.name The name of the movie
 * @param {string} req.body.category The category of the movie
 * @param {Date[]} req.body.availableTimes The available times of the movie
 * @param {number} req.body.duration The duration of the movie
 * @param {number} req.body.price The price of the movie
 * @param {string} req.body.description The description of the movie
 * @returns {Promise<Movie>} A promise that resolves with the newly created movie
 */

exports.createMovie = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      language,
      availableTimes,
      duration,
      price,
      artists,
      description,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !category ||
      !image ||
      !language ||
      !duration ||
      !price ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure that duration and price are numbers
    const parsedDuration = parseFloat(duration);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedDuration) || isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid duration or price" });
    }

    // Create new movie
    const newMovie = new Movie({
      name,
      category,
      image,
      language,
      availableTimes: availableTimes || [], // Default to empty array if not provided
      duration: parsedDuration,
      price: parsedPrice,
      artists: artists || [], // Default to empty array if not provided
      description: description || "", // Default to empty string if not provided
    });

    // Save the movie to the database
    await newMovie.save();

    // Respond with the created movie
    res.status(201).json(newMovie);
  } catch (err) {
    // Log error for debugging
    console.error("Error creating movie:", err);

    // Respond with a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @function updateMovie
 * @description Update a movie
 * @param {Object} req.body The request body containing the updated movie details
 * @param {string} req.params.id The ID of the movie to update
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 */
exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      throw new Error("Movie not found");
    }
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function deleteMovie
 * @description Delete a movie
 * @param {string} req.params.id The ID of the movie to delete
 * @returns {Promise<Movie>} A promise that resolves with the deleted movie
 */
exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      throw new Error("Movie not found");
    }
    res.json(deletedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addMovieArtists
 * @description Add a list of artists to a movie
 * @param {string} req.params.id The ID of the movie to add artists to
 * @param {Array<string>} req.body.artists The list of artists to add to the movie
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 * @throws {Error} Throws an error if the movie is not found
 * @throws {Error} Throws an error if any artist is already added to the movie
 */
exports.addMovieArtists = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { artists } = req.body;

    if (!Array.isArray(artists) || artists.length === 0) {
      return res
        .status(400)
        .json({ error: "Artists list is required and should be an array" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const newArtists = artists.filter(
      (artist) => !movie.artists.includes(artist)
    );
    if (newArtists.length === 0) {
      return res
        .status(409)
        .json({ error: "All artists are already added to the movie" });
    }

    movie.artists.push(...newArtists);
    await movie.save();
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addAvailableTimes
 * @description Add available times to a movie
 * @param {string} req.params.id The ID of the movie to add available times to
 * @param {Date[]} req.body.availableTimes The new available times for the movie
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 */
exports.addAvailableTimes = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    movie.availableTimes.push(...req.body.availableTimes);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function removeAvailableTimes
 * @description Remove available times from a movie
 * @param {string} req.params.id The ID of the movie to remove available times from
 * @param {Date[]} req.body.availableTimes The available times to remove from the movie
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 */
exports.removeAvailableTimes = async (req, res) => {
  try {
    const movieId = req.params.id;
    // console.log("Movie ID:", movieId);
    // console.log("Request Body:", req.body);

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Ensure availableTimes are Date objects
    const availableTimesToRemove = req.body.availableTimes.map(
      (time) => new Date(time)
    );

    movie.availableTimes = movie.availableTimes.filter(
      (time) =>
        !availableTimesToRemove.some(
          (removeTime) => removeTime.getTime() === new Date(time).getTime()
        )
    );

    await movie.save();
    res.json(movie);
  } catch (err) {
    console.error(err); // Use a logging library in production
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addRatingsToMovie
 * @description Add ratings to a movie
 * @param {string} req.params.id The ID of the movie to add ratings to
 * @param {Object[]} req.body.ratings The ratings to add
 * @param {string} req.body.ratings[].customerId The ID of the customer who rated the movie
 * @param {number} req.body.ratings[].score The score given by the customer
 * @param {string} req.body.ratings[].feedback The feedback given by the customer
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 */
exports.addRatingsToMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { ratings } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    movie.ratings.push(...ratings);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addFeedbackRating
 * @description Add a feedback rating to a movie
 * @param {string} req.params.id The ID of the movie to add feedback rating to
 * @param {Object} req.body The feedback rating to add
 * @param {string} req.body.customerId The ID of the customer who provided the feedback
 * @param {number} req.body.score The score given by the customer
 * @param {string} req.body.feedback The feedback given by the customer
 * @returns {Promise<Movie>} A promise that resolves with the updated movie
 */
exports.addFeedbackRating = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { customerId, score, feedback } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    movie.ratings.push({ customerId, score, feedback });
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function viewFeedbackRatings
 * @description View all feedback ratings for a movie
 * @param {string} req.params.id The ID of the movie to view feedback ratings for
 * @returns {Promise<Object[]>} A promise that resolves with an array of feedback ratings
 */
exports.viewFeedbackRatings = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    res.json(movie.ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
