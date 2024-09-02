const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    message: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reply: { type: String, default: null },
},{
    timestamps: true,
})

module.exports = mongoose.model("Feedback", FeedbackSchema);
/*
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    rating: Number,
    date: Date
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
*/
