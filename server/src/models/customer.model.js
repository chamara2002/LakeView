const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const argon2 = require('argon2');

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    freeTimes: [{ type: Date }],
    profilePic: { type: String },
    createdAt: { type: Date, default: Date.now },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }]
});


// Hash password before saving the user
CustomerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
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
CustomerSchema.methods.verifyPassword = async function(password) {
    return argon2.verify(this.password, password);
};


module.exports = mongoose.model('Customer', CustomerSchema);


