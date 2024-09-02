const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const argon2 = require("argon2");


const StaffMemberSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    nic: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    salary: { type: Number, required: true },
    leaves: [
      {
        startDate: { type: Date,},
        endDate: { type: Date, },
        reason: { type: String, },
        approved: { type: Boolean, default: false },
      },
    ],
    attendance: [
      {
        start: { type: Date, default: Date.now },
        leave: { type: Date, default: Date.now },
        otHours: { type: Number, default: 0 },
      },
    ]
  }
);

/**
 * Hash password before saving the StaffMember
 * @param {Object} next - The next function in the middleware chain
 */
StaffMemberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Compare password for login
 * @param {String} password - The password to compare with the stored hash
 * @returns {Promise<Boolean>} A promise that resolves with a boolean indicating if the password matches
 */
StaffMemberSchema.methods.verifyPassword = async function (password) {
  return argon2.verify(this.password, password);
};

/**
 * check the required unique values
 * check unique email, nic and phone number
 */
StaffMemberSchema.path("email").validate(async (value) => {
  const emailCount = await mongoose.models.StaffMember.countDocuments({
    email: value,
  });
  return !emailCount;
}, "Email already exists");

StaffMemberSchema.path("nic").validate(async (value) => {
  const nicCount = await mongoose.models.StaffMember.countDocuments({
    nic: value,
  });
  return !nicCount;
}, "NIC already exists");

StaffMemberSchema.path("phone").validate(async (value) => {
  const phoneCount = await mongoose.models.StaffMember.countDocuments({
    phone: value,
  });
  return !phoneCount;
}, "Phone number already exists");

module.exports = mongoose.model("StaffMember", StaffMemberSchema);
