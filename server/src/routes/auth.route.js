const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();


router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], authController.signup);


router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.login);

router.post('/staff/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.staffLogin);

router.get('/profile', authMiddleware, authController.getProfile);


router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;



