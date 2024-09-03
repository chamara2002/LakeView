const GameBooking = require('../models/gameBooking.model');

exports.addGameBooking = async (req, res) => {
  try {
    const { customer, game, seatNumbers, totalPrice, confirmed } = req.body;

    const newBooking = new GameBooking({
      customer,
      game,
      seatNumbers,
      totalPrice,
      confirmed
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await GameBooking.findById(bookingId)
        .populate('customer', 'name email')
        .populate('game', 'name category')
        .exec();
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateGameBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { seatNumbers, totalPrice, confirmed } = req.body;
  
      const updatedBooking = await GameBooking.findByIdAndUpdate(
        bookingId,
        { seatNumbers, totalPrice, confirmed },
        { new: true, runValidators: true }
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteGameBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;
  
      const deletedBooking = await GameBooking.findByIdAndDelete(bookingId);
  
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllGameBookings = async (req, res) => {
    try {
      const bookings = await GameBooking.find()
        .populate('customer', 'name email')
        .populate('game', 'name category')
        .exec();
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getGameBookingByGame = async (req, res) => {
    const {id} = req.params;
    try {
      const bookings = await GameBooking.find({game: id})
        .populate('customer')
        .populate('game');
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  }
  