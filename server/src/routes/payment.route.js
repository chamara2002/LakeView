const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post('/add-payment', paymentController.addPayment);
router.get('/view-payments', paymentController.viewPayments);
router.get('/view-payment/:id', paymentController.viewPaymentById);
router.put('/update-payment/:id', paymentController.updatePayment);
router.delete('/delete-payment/:id', paymentController.deletePayment);

module.exports = router;