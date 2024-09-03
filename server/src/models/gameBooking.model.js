const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameBookingSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  seatNumbers: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
  confirmed: { type: Boolean, default: false }
}, { timestamps: true });

const GameBooking = mongoose.model('GameBooking', gameBookingSchema);

module.exports = GameBooking;
