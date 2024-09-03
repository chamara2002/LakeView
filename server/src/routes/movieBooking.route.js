const express = require('express');
const router = express.Router();
const movieBookingController = require('../controllers/movieBooking.controller');

router.post('/bookings', movieBookingController.addMovieBooking);
router.get('/bookings/:id', movieBookingController.getMovieBookingById);
router.put('/bookings/:id', movieBookingController.updateMovieBooking);
router.delete('/bookings/:id', movieBookingController.deleteMovieBooking);
router.get('/MovieBookings',movieBookingController.getAllBookings)
router.get('/bookings/movie/:id', movieBookingController.getBookingsByMovie);

module.exports = router;