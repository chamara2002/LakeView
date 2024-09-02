const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    availableTimes: [{ type: Date }],
    description: { type: String, required: true },
    ratings: [{
        _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        score: { type: Number },
        feedback: { type: String }
    }],
    createdAt: { type: Date, default: Date.now },
    image: { type: String },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Game', GameSchema);

