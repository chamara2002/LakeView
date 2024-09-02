const mongoose = require("mongoose");
const StaffMember = require("./src/models/staffMember.model"); // Adjust the path as needed
const argon2 = require("argon2");

// Replace with your MongoDB connection string
const dbUri = "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster";

// Define an array of staff members and managers
const staffMembers = [
  {
    username: "jdoe",
    email: "jdoe@example.com",
    nic: "123456789",
    address: "123 Elm St",
    phone: "123-456-7890",
    password: "password123", // Plain text password; will be hashed by schema pre-save hook
    profilePic: "",
    role: "Manager",
    salary: 55000,
    leaves: [],
  },
  {
    username: "asmith",
    email: "asmith@example.com",
    nic: "987654321",
    address: "456 Oak St",
    phone: "987-654-3210",
    password: "password123",
    profilePic: "",
    role: "Manager",
    salary: 52000,
    leaves: [],
  },
  {
    username: "mjones",
    email: "mjones@example.com",
    nic: "111223344",
    address: "789 Pine St",
    phone: "111-223-3445",
    password: "password123",
    profilePic: "",
    role: "Manager",
    salary: 53000,
    leaves: [],
  },
  // Staff members
  {
    username: "bking",
    email: "bking@example.com",
    nic: "555667788",
    address: "321 Maple St",
    phone: "555-667-7889",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 45000,
    leaves: [],
  },
  {
    username: "cjohnson",
    email: "cjohnson@example.com",
    nic: "555778899",
    address: "654 Cedar St",
    phone: "555-778-8990",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 47000,
    leaves: [],
  },
  {
    username: "dlee",
    email: "dlee@example.com",
    nic: "666889900",
    address: "987 Birch St",
    phone: "666-889-9001",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 46000,
    leaves: [],
  },
  {
    username: "ewright",
    email: "ewright@example.com",
    nic: "777990011",
    address: "321 Spruce St",
    phone: "777-990-0112",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 48000,
    leaves: [],
  },
  {
    username: "fparker",
    email: "fparker@example.com",
    nic: "888001122",
    address: "654 Willow St",
    phone: "888-001-1223",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 49000,
    leaves: [],
  },
  {
    username: "gthomas",
    email: "gthomas@example.com",
    nic: "999112233",
    address: "987 Fir St",
    phone: "999-112-2334",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 47000,
    leaves: [],
  },
  {
    username: "hwhite",
    email: "hwhite@example.com",
    nic: "000223344",
    address: "123 Redwood St",
    phone: "000-223-3445",
    password: "password123",
    profilePic: "",
    role: "Staff Member",
    salary: 46000,
    leaves: [],
  },
];

async function seedDatabase() {
  try {
    // Connect to the database
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await StaffMember.deleteMany({});

    // Hash passwords before inserting data
    const hashedStaffMembers = await Promise.all(staffMembers.map(async (staff) => {
      const hashedPassword = await argon2.hash(staff.password);
      return { ...staff, password: hashedPassword };
    }));

    // Insert new data
    await StaffMember.insertMany(hashedStaffMembers);

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

seedDatabase();
