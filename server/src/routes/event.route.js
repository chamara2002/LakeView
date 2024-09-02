const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller.js');

router.post('/add', eventController.addEvent);
router.put('/update/:id', eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.post('/cancel/:id', eventController.cancelEvent);
router.get('/notifications/:userId', eventController.viewNotifications);
router.get('/participants/:id', eventController.viewParticipants);
router.get('/payments/:id', eventController.viewPayments);
router.get('/events', eventController.viewEvents);
router.post('/payments/:paymentId', eventController.acceptOrRejectPayment);
router.get('/events/:id', eventController.viewEventDetails);

module.exports = router;
