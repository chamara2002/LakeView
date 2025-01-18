// seed.js

const mongoose = require('mongoose');
const Event = require('./src/models/event.model'); // Adjust the path according to your project structure

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster'; 

const events = [
    
        {
            name: 'Tech Conference 2024',
            description: 'An annual conference for tech enthusiasts and professionals.',
            date: new Date('2024-10-15'),
            poster: 'https://img.freepik.com/free-vector/technology-conference-poster-template_1361-1297.jpg?size=626&ext=jpg&ga=GA1.1.824857727.1725003694&semt=ais_hybrid',
            start_time: new Date('2024-10-15T09:00:00Z'),
            end_time: new Date('2024-10-15T17:00:00Z'),
            capacity: 500,
            category: 'others',
            location: 'Convention Center, Tech City',
            status: 'active',
            price:2000
        },
        {
            name: 'Music Festival',
            description: 'A weekend of amazing music and performances.',
            date: new Date('2024-11-05'),
            poster: 'https://img.freepik.com/free-vector/shiny-flyer-concept-music-party_23-2147756278.jpg?semt=ais_hybrid',
            start_time: new Date('2024-11-05T10:00:00Z'),
            end_time: new Date('2024-11-07T23:59:00Z'),
            capacity: 10000,
            category: 'musical',
            location: 'Open Air Stadium, Music Town',
            status: 'active',
            price:3000
        },
        {
            name: 'Art Exhibition',
            description: 'An exhibition showcasing contemporary art from around the world.',
            date: new Date('2024-09-20'),
            poster: 'https://cdn.venngage.com/template/thumbnail/small/be65ec96-8d30-48db-9237-5335780a775e.webp',
            start_time: new Date('2024-09-20T10:00:00Z'),
            end_time: new Date('2024-09-30T18:00:00Z'),
            capacity: 300,
            category: 'gaming',
            location: 'Art Gallery, Culture City',
            status: 'active',
            price:3200
        },
        {
            name: 'Food Truck Festival',
            description: 'A festival featuring a variety of gourmet food trucks.',
            date: new Date('2024-12-01'),
            poster: 'https://png.pngtree.com/template/20190927/ourmid/pngtree-food-truck-festival-flyer-template-background-vector-image_311317.jpg',
            start_time: new Date('2024-12-01T11:00:00Z'),
            end_time: new Date('2024-12-01T21:00:00Z'),
            capacity: 1500,
            category: 'gaming',
            location: 'City Park, Foodville',
            status: 'active',
            price:2500
        },
        {
            name: 'Charity Run',
            description: 'A fun run to raise funds for local charities.',
            date: new Date('2024-11-15'),
            poster: 'https://img.freepik.com/free-vector/modern-gradient-charity-run-poster_742173-10077.jpg',
            start_time: new Date('2024-11-15T08:00:00Z'),
            end_time: new Date('2024-11-15T12:00:00Z'),
            capacity: 1000,
            category: 'others',
            location: 'Downtown Plaza, Run City',
            status: 'active',
            price:1500
        },
        {
            name: 'Business Networking Event',
            description: 'An event for professionals to network and collaborate.',
            date: new Date('2024-10-25'),
            poster: 'https://marketplace.canva.com/EAFuP68r-ww/1/0/1135w/canva-tosca-and-orange-minimalist-business-networking-event-virtual-invitation-wvFi1yxwTfc.jpg',
            start_time: new Date('2024-10-25T18:00:00Z'),
            end_time: new Date('2024-10-25T21:00:00Z'),
            capacity: 200,
            category: 'gaming',
            location: 'Hotel Grand, Business District',
            status: 'active',
            price:2800
        },
        {
            name: 'Film Screening',
            description: 'A special screening of award-winning films.',
            date: new Date('2024-12-10'),
            poster: 'https://payload.cargocollective.com/1/3/119344/10824335/FilmPoster-04_1340_c.jpg',
            start_time: new Date('2024-12-10T19:00:00Z'),
            end_time: new Date('2024-12-10T22:00:00Z'),
            capacity: 150,
            category: 'others',
            location: 'Cinema Hall, Movie Town',
            status: 'active',
            price:1000
        },
        {
            name: 'Book Fair',
            description: 'A fair featuring books from various genres and authors.',
            date: new Date('2024-11-20'),
            poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/book-fair-43042798fa1c22e4e678d1f3b707f404_screen.jpg?ts=1636978907',
            start_time: new Date('2024-11-20T09:00:00Z'),
            end_time: new Date('2024-11-22T18:00:00Z'),
            capacity: 500,
            category: 'others',
            location: 'Expo Center, Booksville',
            status: 'active',
            price:2000
        },
        {
            name: 'Yoga Retreat',
            description: 'A relaxing retreat focused on yoga and wellness.',
            date: new Date('2024-10-05'),
            poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vCRoY3TF8SNrj0byqpmXpE0eZ0-BCbkiWA&s',
            start_time: new Date('2024-10-05T07:00:00Z'),
            end_time: new Date('2024-10-07T18:00:00Z'),
            capacity: 100,
            category: 'musical',
            location: 'Mountain Resort, Serenity',
            status: 'active',
            price:3000
        },
        {
            name: 'Science Fair',
            description: 'An exhibition of innovative science projects and experiments.',
            date: new Date('2024-09-30'),
            poster: 'https://content.wepik.com/statics/181009042/preview-page0.jpg',
            start_time: new Date('2024-09-30T10:00:00Z'),
            end_time: new Date('2024-09-30T16:00:00Z'),
            capacity: 400,
            category: 'others',
            location: 'Science Center, Innovaville',
            status: 'active',
            price:3600
        },
    

];

async function seedDB() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        await Event.deleteMany(); // Clear existing events
        console.log('Existing events deleted');

        await Event.insertMany(events); // Insert seed data
        console.log('Seed data inserted');

        mongoose.connection.close(); // Close the connection
    } catch (err) {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    }
}

seedDB();
