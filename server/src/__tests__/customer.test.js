const request = require('supertest');
const app = require('../../app.js'); 
const mongoose = require('mongoose');
const Event = require('../models/event.model.js');
const Notification = require('../models/notifications.model.js');
const Participant = require('../models/participant.model.js');
const Feedback = require('../models/feedback.model.js');

describe('Event API', () => {
    let eventId;
    let userId = new mongoose.Types.ObjectId();

    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

        // Create a test event
        const event = new Event({
            name: 'Test Event',
            start_date: new Date(),
            capacity: 100,
            participants: []
        });
        await event.save();
        eventId = event._id;
    });

    afterAll(async () => {
        // Clean up the database
        await Event.deleteMany({});
        await Notification.deleteMany({});
        await Participant.deleteMany({});
        await Feedback.deleteMany({});
        await mongoose.connection.close();
    });

    test('should view event details', async () => {
        const res = await request(app).get(`/events/${eventId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Test Event');
    });

    test('should set reminders for event', async () => {
        const res = await request(app)
            .post('/events/reminders')
            .send({ eventId, userId });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Reminder set successfully');
    });

    test('should book event', async () => {
        const res = await request(app)
            .post('/events/book')
            .send({ eventId, userId });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Event booked successfully');
    });

    test('should receive notifications', async () => {
        const res = await request(app).get(`/notifications/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('should add feedback', async () => {
        const res = await request(app)
            .post('/feedback')
            .send({ event: eventId, user: userId, comment: 'Great event!' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('comment', 'Great event!');
    });

    test('should add rating', async () => {
        const res = await request(app)
            .post('/ratings')
            .send({ eventId, userId, rating: 5 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Rating added successfully');
    });
});
