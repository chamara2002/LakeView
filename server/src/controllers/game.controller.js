const Game = require("../models/games.model.js");
const Customer = require("../models/customer.model.js");

/**
 * @function getGames
 * @description View all games
 * @returns {Promise<Game[]>} A promise that resolves with an array of all games
 */
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().populate("ratings.customerId", "name");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addGame
 * @description Add a new game to the database
 * @param {Object} req.body - The request body containing the game details
 * @param {String} req.body.name - The name of the game
 * @param {String} req.body.category - The category of the game
 * @param {Date[]} req.body.availableTimes - The available times of the game
 * @returns {Promise<Game>} A promise that resolves with the newly added game
 */
exports.addGame = async (req, res) => {
  try {
    const { name, category, availableTimes, description, price, image } =
      req.body;
    const game = new Game({
      name,
      category,
      availableTimes,
      description,
      price,
      image,
    });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function updateGame
 * @description Update a game in the database
 * @param {Object} req.body - The request body containing the updated game details
 * @param {String} req.params.id - The ID of the game to be updated
 * @returns {Promise<Game>} A promise that resolves with the updated game
 */
exports.updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const updatedGame = await Game.findByIdAndUpdate(gameId, req.body, {
      new: true,
    });

    res.json(updatedGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function deleteGame
 * @description Delete a game from the database
 * @param {String} req.params.id - The ID of the game to be deleted
 * @returns {Promise<void>} A promise that resolves when the game is deleted
 */
exports.deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    await Game.findByIdAndDelete(gameId);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addAvailableTimes
 * @description Add available times to a game in the database
 * @param {String} req.params.id - The ID of the game to add available times to
 * @param {Date[]} req.body.availableTimes - The available times to be added
 * @returns {Promise<Game>} A promise that resolves with the updated game
 */
exports.addAvailableTimes = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { availableTimes } = req.body;

    const game = await Game.findById(gameId);

    game.availableTimes.push(...availableTimes);

    await game.save();

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function viewFeedbackRatings
 * @description View feedback and rating details
 * @param {String} req.params.id - The ID of the game to view the feedback and ratings of
 * @returns {Promise<Game>} A promise that resolves with the game and its feedback and ratings
 */
exports.viewFeedbackRatings = async (req, res) => {
  try {
    const gameId = req.params.id;

    const game = await Game.findById(gameId).populate(
      "ratings.customerId",
      "name"
    );

    res.json(game.ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function addFeedbackRating
 * @description Add feedback and rating to a game
 * @param {String} req.params.id - The ID of the game to add the feedback and rating to
 * @param {Object} req.body - The request body containing the feedback and rating details
 * @param {String} req.body.customerId - The ID of the customer who submitted the feedback and rating
 * @param {Number} req.body.score - The score given by the customer
 * @param {String} req.body.feedback - The feedback given by the customer
 * @returns {Promise<Game>} A promise that resolves with the updated game
 */
exports.addFeedbackRating = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { customerId, score, feedback } = req.body;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    game.ratings.push({ customerId, score, feedback });
    await game.save();

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const games = await Game.find().populate("ratings.customerId", "name");
    const feedbacks = games.reduce((acc, game) => {
      game.ratings.forEach((rating) => {
        acc.push({
          gameId: game._id,
          gameName: game.name,
          user: rating.customerId ? rating.customerId.name : "Unknown", // Handle missing customerId
          feedback: rating.feedback,
          score: rating.score,
          feedbackId: rating._id,
        });
      });
      return acc;
    }, []);

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { gameId, feedbackId } = req.params;

    if (!gameId || !feedbackId) {
      return res
        .status(400)
        .json({ error: "Game ID and Feedback ID are required" });
    }

    const result = await Game.updateOne(
      { _id: gameId },
      { $pull: { ratings: { _id: feedbackId } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ error: err.message });
  }
};
