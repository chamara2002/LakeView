// models/Participant.js

const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
