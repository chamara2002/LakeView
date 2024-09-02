// models/Event.js

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    poster: String,
    start_date: Date,
    end_time: Date,
    category: String,
    capacity: Number,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
    location: String,
    status: { type: String, enum: ['active', 'inactive', 'ongoing'], default: 'active' },
    price:{type:Number,required: true} ,
});

module.exports = mongoose.model('Event', EventSchema);
