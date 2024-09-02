const mongoose = require("mongoose");
const Resource = require("./src/models/resource.model"); // Update this path to your model file

const dbUri =
  "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster"; // Replace with your MongoDB URI

const resources = [
  {
    resourceId: "R001",
    resourceName: "Resource 1",
    resourceType: "indoor",
    availableQuantity: 10,
    location: "Building A",
    repairStatus: false,
    maintainanceStatus: false,
  },
  {
    resourceId: "R002",
    resourceName: "Resource 2",
    resourceType: "outdoor",
    availableQuantity: 20,
    location: "Building B",
    repairStatus: false,
    maintainanceStatus: true,
  },
  {
    resourceId: "R003",
    resourceName: "Resource 3",
    resourceType: "indoor",
    availableQuantity: 30,
    location: "Building C",
    repairStatus: true,
    maintainanceStatus: false,
  },
  {
    resourceId: "R004",
    resourceName: "Resource 4",
    resourceType: "outdoor",
    availableQuantity: 40,
    location: "Building D",
    repairStatus: false,
    maintainanceStatus: true,
  },
  {
    resourceId: "R005",
    resourceName: "Resource 5",
    resourceType: "indoor",
    availableQuantity: 50,
    location: "Building E",
    repairStatus: false,
    maintainanceStatus: false,
  },
  {
    resourceId: "R006",
    resourceName: "Resource 6",
    resourceType: "outdoor",
    availableQuantity: 60,
    location: "Building F",
    repairStatus: true,
    maintainanceStatus: false,
  },
  {
    resourceId: "R007",
    resourceName: "Resource 7",
    resourceType: "indoor",
    availableQuantity: 70,
    location: "Building G",
    repairStatus: false,
    maintainanceStatus: true,
  },
  {
    resourceId: "R008",
    resourceName: "Resource 8",
    resourceType: "outdoor",
    availableQuantity: 80,
    location: "Building H",
    repairStatus: false,
    maintainanceStatus: false,
  },
  {
    resourceId: "R009",
    resourceName: "Resource 9",
    resourceType: "indoor",
    availableQuantity: 90,
    location: "Building I",
    repairStatus: true,
    maintainanceStatus: true,
  },
  {
    resourceId: "R010",
    resourceName: "Resource 10",
    resourceType: "outdoor",
    availableQuantity: 100,
    location: "Building J",
    repairStatus: false,
    maintainanceStatus: true,
  },
];

const seedDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");

    // Clear existing resources
    await Resource.deleteMany({});
    console.log("Existing resources cleared.");

    // Insert new resources
    await Resource.insertMany(resources);
    console.log("Resources seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

// Run the seed function
seedDB();
