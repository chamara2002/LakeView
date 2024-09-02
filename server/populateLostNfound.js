const mongoose = require('mongoose');
const LostNFound = require('./src/models/lostNfound.model'); // Adjust the path to where your LostNFound model is located

// Replace the following connection string with your MongoDB connection string
const mongoURI = 'mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster';

const sampleData = [
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3a', // Replace with actual ObjectId values
    email: 'john.doe@example.com',
    contactNumber: 1234567890,
    foundItemsCategory: 'Sport',
    foundItem: 'Tennis Racket',
    foundItemPlace: 'Central Park',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3b' // Replace with actual ObjectId values
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3b',
    email: 'jane.doe@example.com',
    contactNumber: 9876543210,
    foundItemsCategory: 'Accessories',
    foundItem: 'Watch',
    foundItemPlace: 'Subway Station',
    isFound: true,
    founder: '64e8a7d3b5f0a8a9d4b56c3a'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3c',
    email: 'alex.smith@example.com',
    contactNumber: 5555555555,
    foundItemsCategory: 'Sport',
    foundItem: 'Baseball Glove',
    foundItemPlace: 'Local Park',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3d'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3d',
    email: 'emily.johnson@example.com',
    contactNumber: 4444444444,
    foundItemsCategory: 'Accessories',
    foundItem: 'Sunglasses',
    foundItemPlace: 'Cafe',
    isFound: true,
    founder: '64e8a7d3b5f0a8a9d4b56c3e'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3e',
    email: 'michael.brown@example.com',
    contactNumber: 6666666666,
    foundItemsCategory: 'Sport',
    foundItem: 'Soccer Ball',
    foundItemPlace: 'Sports Complex',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3f'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c3f',
    email: 'sarah.lee@example.com',
    contactNumber: 7777777777,
    foundItemsCategory: 'Accessories',
    foundItem: 'Handbag',
    foundItemPlace: 'Library',
    isFound: true,
    founder: '64e8a7d3b5f0a8a9d4b56c3a'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c40',
    email: 'james.wilson@example.com',
    contactNumber: 8888888888,
    foundItemsCategory: 'Sport',
    foundItem: 'Yoga Mat',
    foundItemPlace: 'Yoga Studio',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3b'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c41',
    email: 'linda.martinez@example.com',
    contactNumber: 9999999999,
    foundItemsCategory: 'Accessories',
    foundItem: 'Earphones',
    foundItemPlace: 'Bus Stop',
    isFound: true,
    founder: '64e8a7d3b5f0a8a9d4b56c3c'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c42',
    email: 'robert.taylor@example.com',
    contactNumber: 1010101010,
    foundItemsCategory: 'Sport',
    foundItem: 'Golf Club',
    foundItemPlace: 'Golf Course',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3d'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c43',
    email: 'mary.jones@example.com',
    contactNumber: 1212121212,
    foundItemsCategory: 'Accessories',
    foundItem: 'Wallet',
    foundItemPlace: 'Shopping Mall',
    isFound: true,
    founder: '64e8a7d3b5f0a8a9d4b56c3e'
  },
  {
    userName: '64e8a7d3b5f0a8a9d4b56c44',
    email: 'william.garcia@example.com',
    contactNumber: 1313131313,
    foundItemsCategory: 'Sport',
    foundItem: 'Hockey Stick',
    foundItemPlace: 'Ice Rink',
    isFound: false,
    founder: '64e8a7d3b5f0a8a9d4b56c3f'
  }
];

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      await LostNFound.deleteMany({}); // Clear existing data
      const result = await LostNFound.insertMany(sampleData);
      console.log('Sample data inserted:', result);
    } catch (err) {
      console.error('Error inserting data:', err);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
