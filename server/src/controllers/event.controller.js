// controllers/eventController.js

const Event = require("../models/event.model.js");
const Notification = require("../models/notifications.model.js");

exports.addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("participants");
    res.status(200).json(event.participants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewPayments = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("payments");
    res.status(200).json(event.payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.acceptOrRejectPayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
