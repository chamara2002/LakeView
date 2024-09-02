const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

router.post('/add-feedback',feedbackController.addFeedback);
router.get('/all-feedback', feedbackController.getAllFeedbacks);
router.get('/:id', feedbackController.getFeedback);
router.put('/update/:id',feedbackController.updateFeedback);
router.delete('/delete/:id',feedbackController.deleteFeedback);

module.exports = router;