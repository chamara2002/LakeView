const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller.js");

router.get("/events/:id", customerController.viewEventDetails);
router.post("/reminders/:eventId", customerController.setRemindersForEvent);
router.post("/book/:eventId", customerController.bookEvent);
router.get("/notifications/:userId", customerController.receiveNotifications);
router.post("/feedback", customerController.addFeedback);
router.post("/register", customerController.addCustomer);

module.exports = router;
