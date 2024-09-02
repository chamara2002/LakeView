const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller.js');

// Customer routes
router.get('/movies', movieController.getMovies);
router.get('/movies/:id', movieController.getMovieById);

// Movie manager routes
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);
router.post('/movies/:id/available-times', movieController.addAvailableTimes);
router.delete('/movies/:id/available-times', movieController.removeAvailableTimes); 
router.post('/movies/:id/feedback', movieController.addFeedbackRating); 
router.get('/movies/:id/feedback', movieController.viewFeedbackRatings); 

module.exports = router;
