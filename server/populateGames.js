const mongoose = require('mongoose');
const Game = require('./src/models/games.model'); // Update with the correct path to your Game model

// Replace this URL with your MongoDB connection string
const mongoURI = "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster"; 

const games = [
  {
    name: 'Game 1',
    category: 'Adventure',
    availableTimes: [new Date('2024-09-01T10:00:00Z')],
    ratings: [
      {
        // customerId: mongoose.Types.ObjectId(), // Dummy ObjectId, replace with actual ObjectId if needed
        // score: 4.5,
        // feedback: 'Great adventure game!'
      }
    ],
    images: ['image1.jpg', 'image2.jpg']
  },
  {
    name: 'Game 2',
    category: 'Action',
    availableTimes: [new Date('2024-09-02T12:00:00Z')],
    ratings: [
      {
        // customerId: mongoose.Types.ObjectId(), // Dummy ObjectId, replace with actual ObjectId if needed
        // score: 4.0,
        // feedback: 'Intense and thrilling!'
      }
    ],
    images: ['image3.jpg']
  },
  {
    name: 'Game 3',
    category: 'Puzzle',
    availableTimes: [new Date('2024-09-03T14:00:00Z')],
    ratings: [
      {
        // customerId: mongoose.Types.ObjectId(), // Dummy ObjectId, replace with actual ObjectId if needed
        // score: 4.8,
        // feedback: 'Challenging puzzles!'
      }
    ],
    images: ['image4.jpg', 'image5.jpg']
  },
  {
    name: 'Game 4',
    category: 'RPG',
    availableTimes: [new Date('2024-09-04T16:00:00Z')],
    ratings: [
      {
        // customerId: mongoose.Types.ObjectId(), // Dummy ObjectId, replace with actual ObjectId if needed
        // score: 5.0,
        // feedback: 'Fantastic role-playing experience!'
      }
    ],
    images: ['image6.jpg']
  },
  {
    name: 'Game 5',
    category: 'Strategy',
    availableTimes: [new Date('2024-09-05T18:00:00Z')],
    ratings: [
      {
        // customerId: mongoose.Types.ObjectId(), // Dummy ObjectId, replace with actual ObjectId if needed
        // score: 4.7,
        // feedback: 'Excellent strategy elements!'
      }
    ],
    images: ['image7.jpg']
  }
];

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Insert data into the database
    await Game.insertMany(games);
    console.log('Games have been added to the database');
    
    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating the database:', error);
  }
}

populateDatabase();
