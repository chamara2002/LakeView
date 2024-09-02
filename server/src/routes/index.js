const express = require("express");

const gameRoutes = require('./games.route.js');
const authRoutes = require('./auth.route.js');
const resourceRoutes = require('./resource.route.js');
const foodRoutes = require('./food.route.js');
const orderRoutes = require('./order.route.js');
const feedRoutes = require('./feedback.route');
const movieRoutes = require('./movie.route.js');
const maintenanceRoutes = require('./maintenance.route.js');
const eventRoutes = require('./event.route.js');
const customerRoutes = require('./customer.route.js');
const bookingRoutes = require('./booking.route.js');
const lostNFoundRoutes = require('./lostNfound.route.js');
const InquiryRoutes = require('./inquiry.route.js');
const staffRoutes = require('./staff.route.js');
const paymentRoutes = require('./payment.route.js');
const leaveRoutes = require('./leaves.route.js');
const attendanceRoutes = require('./attendence.route.js');

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/games", gameRoutes);
router.use("/auth",authRoutes);
router.use("/resource", resourceRoutes);
router.use("/food",foodRoutes);
router.use("/order", orderRoutes);
router.use("/feedback", feedRoutes);
router.use("/movies", movieRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/event", eventRoutes);
router.use("/booking", bookingRoutes);
router.use("/customer", customerRoutes);
router.use("/lostNFound", lostNFoundRoutes);
router.use("/inquiry", InquiryRoutes);
router.use('/staff', staffRoutes);
router.use('/payment',paymentRoutes)
router.use('/leaves',leaveRoutes)
router.use('/attendance',attendanceRoutes)

module.exports = router;
