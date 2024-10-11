const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true},
    userEmail : {type: String, required: true},
    meals : [
        {
            food: {type: Schema.Types.ObjectId, ref: "Food", required: true},
            quantity: {type: Number, required: true},
        }
    ],
    totalPrice : {type: Number, required: true},
    isCompleted : {type: Boolean, default: false, required: true},
},
    {
        timestamps: true,
    }
    )

module.exports = mongoose.model('Order', OrderSchema);


