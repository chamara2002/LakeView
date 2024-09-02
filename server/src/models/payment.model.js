

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    amount: Number,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
