const Payment = require("../models/payment.model");

exports.addPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("participant")
      .populate("event");
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
