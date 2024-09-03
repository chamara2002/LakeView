const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieBookingSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  seatNumbers: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
  confirmed: { type: Boolean, default: false }
}, { timestamps: true });

const MovieBooking = mongoose.model('MovieBooking', movieBookingSchema);

module.exports = MovieBooking;
