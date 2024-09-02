const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "StaffMember", required: true },
    start: { type: Date, required: true },
    end:{type: Date},
    ot:{type:Number,default: 0}
})

module.exports = mongoose.model("Attendance", attendanceSchema);