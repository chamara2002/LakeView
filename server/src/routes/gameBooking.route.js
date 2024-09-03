const express = require('express');
const router = express.Router();
const gameBookingController = require('../controllers/gameBooking.controller');

router.post('/game-bookings', gameBookingController.addGameBooking);
router.get('/game-bookings/:id', gameBookingController.getGameBookingById);
router.put('/game-bookings/:id', gameBookingController.updateGameBooking);
router.delete('/game-bookings/:id', gameBookingController.deleteGameBooking);
router.get('/game-bookings', gameBookingController.getAllGameBookings);
router.get('/bookings/game/:id', gameBookingController.getGameBookingByGame);

module.exports = router;
