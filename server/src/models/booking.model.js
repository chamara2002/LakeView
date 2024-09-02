const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'pending' },
    bookingDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['cash', 'online'], required: true },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
});

module.exports = mongoose.model('Booking', BookingSchema);
