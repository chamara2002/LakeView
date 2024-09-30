const mongoose = require('mongoose');
const Food = require('./src/models/food.model'); // Adjust the path to where your model is defined

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define an array of food objects
const foodItems = [
  {
    name: 'Caesar Salad',
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
    category: 'Appetizer',
    price: 8.99,
    isAvailable: true,
    imageUrl: 'https://th.bing.com/th/id/OIP.w4r5rpVWHIRAdJ4u1skaIgHaLH?rs=1&pid=ImgDetMain',
  },
  {
    name: 'Margherita Pizza',
    ingredients: ['Tomato sauce', 'Mozzarella cheese', 'Fresh basil'],
    category: 'Pizza',
    price: 12.99,
    isAvailable: true,
    imageUrl: 'https://th.bing.com/th/id/R.73572e44dde773f63873cfe055ff6e2e?rik=wI3Mp7Yl1aA%2ffw&pid=ImgRaw&r=0',
  },
  {
    name: 'Beef Burger',
    ingredients: ['Beef patty', 'Lettuce', 'Tomato', 'Cheddar cheese', 'Burger bun'],
    category: 'Main Course',
    price: 10.99,
    isAvailable: true,
    imageUrl: 'https://th.bing.com/th/id/R.6ae49d02ac5e18d20fdd714974f95258?rik=eTgCtmLWb3IAzw&pid=ImgRaw&r=0',
  },
  {
    name: 'Chicken Wings',
    ingredients: ['Chicken wings', 'Buffalo sauce'],
    category: 'Appetizer',
    price: 9.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.ae34bbab57806cfcc28aef20cfe48fab',
  },
  {
    name: 'Pancakes',
    ingredients: ['Flour', 'Eggs', 'Milk', 'Maple syrup'],
    category: 'Dessert',
    price: 6.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.37ce8f0ab54b2623c67b43cd649a8efb',
  },
  {
    name: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
    category: 'Main Course',
    price: 14.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.04cc3677a177c1bd0077793ffa1f1c56',
  },
  {
    name: 'Mojito',
    ingredients: ['Rum', 'Mint', 'Lime', 'Sugar', 'Soda water'],
    category: 'Beverage',
    price: 7.99,
    isAvailable: true,
    imageUrl: 'https://th.bing.com/th/id/OSK.HERO23juokwz91ixxHzV_w70njjgJBh28ZJHgh28sBpt-NA?rs=1&pid=ImgDetMain',
  },
  {
    name: 'Apple Pie',
    ingredients: ['Apples', 'Pie crust', 'Sugar', 'Cinnamon'],
    category: 'Dessert',
    price: 5.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.f0b038690a41670311571c89049683ea',
  },
  {
    name: 'Caprese Salad',
    ingredients: ['Tomatoes', 'Mozzarella cheese', 'Basil', 'Olive oil'],
    category: 'Appetizer',
    price: 8.49,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.647fcb9d63c4f423a6aafd9ab3652c0c',
  },
  {
    name: 'Lemonade',
    ingredients: ['Lemon', 'Sugar', 'Water'],
    category: 'Beverage',
    price: 4.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.f8ec7f50e510c29729c1682d709c8b2d',
  },
  {
    name: 'Vegetable Stir Fry',
    ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger'],
    category: 'Main Course',
    price: 11.99,
    isAvailable: true,
    imageUrl: 'https://bing.com/th?id=OSK.afe0b0732f41eaf93c37a27c224c434d',
  },
  
];

// Insert food items into the database
Food.insertMany(foodItems)
  .then(() => {
    console.log('Food items added successfully');
    mongoose.connection.close(); // Close the connection after the operation
  })
  .catch(err => {
    console.error('Error adding food items:', err);
    mongoose.connection.close(); // Close the connection in case of an error
  });
