const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeavesSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveReason: { type: String, required: true },
  leaveStatus: { type: Boolean, default: false },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "StaffMember",
    required: true,
  },
});

module.exports = mongoose.model("Leaves", LeavesSchema);
