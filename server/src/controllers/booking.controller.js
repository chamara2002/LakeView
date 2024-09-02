const Booking = require('../models/booking.model.js');
const Notification = require('../models/notifications.model.js');

exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.notifyUnavailableBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: 'pending' }).populate('customer event');
        bookings.forEach(async (booking) => {
            const notification = new Notification({
                user: booking.customer,
                message: `Booking for event "${booking.event.name}" is still pending.`,
                date: new Date(),
                read: false
            });
            await notification.save();
            booking.notifications.push(notification._id);
            await booking.save();
        });
        res.status(200).json({ message: 'Notifications sent for unavailable bookings' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

