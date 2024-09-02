const mongoose = require('mongoose');
const Customer = require('./src/models/customer.model'); 
const argon2 = require('argon2');

const mongoURI = 'mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster';

const seedCustomers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');


        // Create sample customers
        const customers = [
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T09:00:00Z')],
                profilePic: 'https://example.com/profiles/john.jpg',
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T10:00:00Z')],
                profilePic: 'https://example.com/profiles/jane.jpg',
            },
            {
                name: 'Alice Johnson',
                email: 'alice.johnson@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T11:00:00Z')],
                profilePic: 'https://example.com/profiles/alice.jpg',
            },
            {
                name: 'Bob Brown',
                email: 'bob.brown@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T12:00:00Z')],
                profilePic: 'https://example.com/profiles/bob.jpg',
            },
            {
                name: 'Carol White',
                email: 'carol.white@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T13:00:00Z')],
                profilePic: 'https://example.com/profiles/carol.jpg',
            },
            {
                name: 'David Green',
                email: 'david.green@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T14:00:00Z')],
                profilePic: 'https://example.com/profiles/david.jpg',
            },
            {
                name: 'Emma Wilson',
                email: 'emma.wilson@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T15:00:00Z')],
                profilePic: 'https://example.com/profiles/emma.jpg',
            },
            {
                name: 'Frank Harris',
                email: 'frank.harris@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T16:00:00Z')],
                profilePic: 'https://example.com/profiles/frank.jpg',
            },
            {
                name: 'Grace Clark',
                email: 'grace.clark@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T17:00:00Z')],
                profilePic: 'https://example.com/profiles/grace.jpg',
            },
            {
                name: 'Hannah Lewis',
                email: 'hannah.lewis@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T18:00:00Z')],
                profilePic: 'https://example.com/profiles/hannah.jpg',
            },
            {
                name: 'Isaac Martin',
                email: 'isaac.martin@example.com',
                password: 'password123',
                freeTimes: [new Date('2024-08-31T19:00:00Z')],
                profilePic: 'https://example.com/profiles/isaac.jpg',
            }
        ];

        // Hash the passwords before saving
        for (let customer of customers) {
            customer.password = await argon2.hash(customer.password);
            console.log('hashing password', customer.password);

        }

        // Insert customers into the database
        await Customer.insertMany(customers);

        console.log('Customers seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding customers:', err);
        process.exit(1);
    }
};

seedCustomers();
