// populateInquiries.js

const mongoose = require('mongoose');
const Inquiry = require('./src/models/inquiry.model'); // Adjust the path as needed

const dbUri = "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster"

const inquiries = [
    {
        userName: '64f0d46b8f1d6f0d247c29bc', // Replace with valid ObjectId of a Customer
        email: 'john.doe@example.com',
        contactNumber: 1234567890,
        inquiryCategory: 'Food',
        inquiryMessage: 'Looking for more vegetarian options.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29bd', // Replace with valid ObjectId of a Customer
        email: 'jane.smith@example.com',
        contactNumber: 9876543210,
        inquiryCategory: 'Games',
        inquiryMessage: 'Games are outdated, need new releases.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29be', // Replace with valid ObjectId of a Customer
        email: 'mike.jones@example.com',
        contactNumber: 1122334455,
        inquiryCategory: 'Movies',
        inquiryMessage: 'Please add more action movies.'
    },
    // Add 7 more objects similarly
    {
        userName: '64f0d46b8f1d6f0d247c29bf',
        email: 'susan.lee@example.com',
        contactNumber: 5566778899,
        inquiryCategory: 'Food',
        inquiryMessage: 'Need gluten-free options.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c0',
        email: 'chris.white@example.com',
        contactNumber: 6677889900,
        inquiryCategory: 'Games',
        inquiryMessage: 'Improve multiplayer experience.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c1',
        email: 'alex.brown@example.com',
        contactNumber: 9988776655,
        inquiryCategory: 'Movies',
        inquiryMessage: 'Add more comedy movies.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c2',
        email: 'katie.green@example.com',
        contactNumber: 4455667788,
        inquiryCategory: 'Food',
        inquiryMessage: 'Expand the dessert menu.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c3',
        email: 'tom.harris@example.com',
        contactNumber: 2233445566,
        inquiryCategory: 'Games',
        inquiryMessage: 'Fix the bugs in the latest update.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c4',
        email: 'lisa.martin@example.com',
        contactNumber: 3344556677,
        inquiryCategory: 'Movies',
        inquiryMessage: 'Add more foreign films.'
    },
    {
        userName: '64f0d46b8f1d6f0d247c29c5',
        email: 'brian.taylor@example.com',
        contactNumber: 4455667788,
        inquiryCategory: 'Food',
        inquiryMessage: 'Need more vegan options.'
    }
];

const populateDatabase = async () => {
    try {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        await Inquiry.deleteMany({}); // Clear existing data

        const result = await Inquiry.insertMany(inquiries);
        console.log('Inserted inquiries:', result);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

populateDatabase();
