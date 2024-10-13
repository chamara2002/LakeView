const MovieBooking = require('../models/movieBooking.model');

exports.addMovieBooking = async (req, res) => {
  try {
    const { customer, movie, seatNumbers, totalPrice, confirmed, date, time } = req.body;

    const newBooking = new MovieBooking({
      customer,
      movie,
      seatNumbers,
      totalPrice,
      confirmed,
      date,
      time
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await MovieBooking.findById(bookingId)
        .populate('customer', 'name email')
        .populate('movie', 'title genre')
        .exec();
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateMovieBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { seatNumbers, totalPrice, confirmed } = req.body;
  
      const updatedBooking = await MovieBooking.findByIdAndUpdate(
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

  exports.deleteMovieBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;
  
      const deletedBooking = await MovieBooking.findByIdAndDelete(bookingId);
  
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getBookingsByMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const bookings = await MovieBooking.find({ movie: id })
        .populate('customer')
        .populate('movie');
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await MovieBooking.find()
        .populate('customer')
        .populate('movie');
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
