// models/Notification.js

const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    date: Date,
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
