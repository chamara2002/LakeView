

const Event = require('../models/event.model.js');
const Feedback = require('../models/feedback.model.js');
const Customer = require('../models/customer.model.js');

exports.viewEventDetails = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.setRemindersForEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body;  
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }


        const notification = new Notification({
            user: userId,
            message: `Reminder: The event "${event.name}" starts on ${event.start_date}`,
            date: event.start_date,
            read: false
        });

        await notification.save();
        res.status(201).json({ message: 'Reminder set successfully', notification });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const Participant = require('../models/participant.model.js');

exports.bookEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body; 

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.participants.length >= event.capacity) {
            return res.status(400).json({ error: 'Event is fully booked' });
        }

    
        const participant = new Participant({
            user: userId,
            event: eventId,
            status: 'confirmed'
        });

        await participant.save();


        event.participants.push(participant._id);
        await event.save();

        res.status(201).json({ message: 'Event booked successfully', participant });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.receiveNotifications = async (req, res) => {
    try {
        const { userId } = req.params; 

        const notifications = await Notification.find({ user: userId, read: false });

        res.status(200).json(notifications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.addFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addRating = async (req, res) => {
    try {
        const { eventId, userId, rating } = req.body; 

        const feedback = new Feedback({
            event: eventId,
            user: userId,
            rating: rating,
            date: new Date()
        });

        await feedback.save();
        res.status(201).json({ message: 'Rating added successfully', feedback });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


