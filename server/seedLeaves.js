const mongoose = require('mongoose');
const Leaves = require('./src/models/leaves.model'); // Adjust the path as needed
const StaffMember = require('./src/models/staffMember.model'); // Adjust the path as needed

mongoose.connect('mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedLeaves() {
  try {
    const staffMembers = await StaffMember.find().limit(10); // Assuming you have at least 10 staff members

    if (staffMembers.length < 10) {
      console.log('Not enough staff members to seed leaves.');
      return;
    }

    const leaves = staffMembers.map((staffMember, index) => ({
      startDate: new Date(2024, 8, 1 + index),  // Start date for each leave
      endDate: new Date(2024, 8, 5 + index),    // End date for each leave
      leaveReason: `Personal reason ${index + 1}`,
      leaveStatus: index % 2 === 0,  // Alternate between approved and not approved
      employeeId: staffMember._id,
    }));

    await Leaves.insertMany(leaves);
    console.log('Leaves seeded successfully');
  } catch (err) {
    console.error('Error seeding leaves:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedLeaves();
