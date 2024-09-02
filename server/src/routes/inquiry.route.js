const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');

router.get('/inquiries',inquiryController.getAllInquiries); // get all inquiries
router.post('/inquiries',inquiryController.addInquiry); // add new inquiry
router.get('/inquiries/:id',inquiryController.getOneInquiry); // get a single inquiry by ID
router.put('/inquiries/:id',inquiryController.updateInquiry); // update inquiry
router.delete('/inquiries/:id',inquiryController.deleteInquiry); // delete inquiry

module.exports = router;