const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller.js');

// Customer Routes
router.get('/games', gameController.getGames);
router.post('/games/:id/feedback', gameController.addFeedbackRating);

// Games Manager Routes
router.post('/games', gameController.addGame);
router.get('/games/feedbacks',gameController.getAllFeedbacks);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);
router.post('/games/:id/available-times', gameController.addAvailableTimes);
router.get('/games/:id/feedback', gameController.viewFeedbackRatings);
router.get('/games/:id', gameController.getGameById);
router.delete('/games/:gameId/feedbacks/:feedbackId', gameController.deleteFeedback)


module.exports = router;
