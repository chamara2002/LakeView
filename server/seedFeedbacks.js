const mongoose = require("mongoose");
const Game = require("./src/models/games.model");
const Customer = require("./src/models/customer.model"); // Assuming you have a Customer model

mongoose.connect(
  "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedFeedbacks = async () => {
  try {
    const games = await Game.find();
    const customers = await Customer.find(); // Fetch all customers

    if (games.length === 0 || customers.length === 0) {
      console.log("No games or customers found in the database.");
      return;
    }

    const feedbacks = [
      { score: 5, feedback: "Amazing game!" },
      { score: 4, feedback: "Really enjoyed it." },
      { score: 3, feedback: "It was okay." },
      { score: 2, feedback: "Not my type." },
      { score: 1, feedback: "Didn't like it." },
      { score: 5, feedback: "Would play again!" },
      { score: 4, feedback: "Good experience." },
      { score: 3, feedback: "Average." },
      { score: 2, feedback: "Could be better." },
      { score: 1, feedback: "Not recommended." },
    ];

    for (let i = 0; i < feedbacks.length; i++) {
      const randomGame = games.find((game) => game.price && game.description); // Ensure game has price and description

      if (!randomGame) {
        console.log("No valid games with price and description found.");
        break;
      }

      const randomCustomer =
        customers[Math.floor(Math.random() * customers.length)];

      // Check if game already has ratings field, if not, initialize it
      if (!randomGame.ratings) {
        randomGame.ratings = [];
      }

      // Add feedback to the game's ratings
      randomGame.ratings.push({
        customerId: randomCustomer._id,
        score: feedbacks[i].score,
        feedback: feedbacks[i].feedback,
      });

      // Save the updated game document
      await randomGame.save();
    }

    console.log("Seeded feedbacks successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding feedbacks:", error);
    mongoose.connection.close();
  }
};

seedFeedbacks();
