const Customer = require('../models/customer.model.js');
const StaffMember = require('../models/staffMember.model.js');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const jwtSecret = 'mysecretkey';  


exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, profilePic, freeTimes } = req.body;

    try {
        let customer = await Customer.findOne({ email });
        if (customer) {
            return res.status(400).json({ msg: 'Customer already exists' });
        }

        customer = new Customer({ name, email, password, profilePic, freeTimes });
        await customer.save();

        const payload = { customer: { id: customer.id } };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await Customer.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {user} ;

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer.id).select('-password');
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email, password, profilePic, freeTimes } = req.body;

    try {
        let customer = await Customer.findById(req.customer.id);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        if (name) customer.name = name;
        if (email) customer.email = email;
        if (password) customer.password = await argon2.hash(password);
        if (profilePic) customer.profilePic = profilePic;
        if (freeTimes) customer.freeTimes = freeTimes;

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.staffLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await StaffMember.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload =  {user} ;

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

