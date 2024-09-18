const mongoose = require('mongoose');
const Attendance = require('./src/models/attendence.model'); // Adjust the path as needed
const Attendance = require('./src/models/salary.model'); // Adjust the path as needed
const StaffMember = require('./src/models/staffMember.model'); // Adjust the path as needed

mongoose.connect('mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAttendance() {
  try {
    // Clear existing attendance records
    await Attendance.deleteMany({});
    console.log('Existing attendance records cleared.');

    // Fetch staff members
    const staffMembers = await StaffMember.find();
    if (staffMembers.length === 0) {
      console.log('No staff members found.');
      return;
    }

    // Create attendance records
    const attendances = staffMembers.map((staff) => ({
      userId: staff._id,
      start: new Date(2024, 8, 1, 9, 0, 0), // Same start time for simplicity
      end: new Date(2024, 8, 1, 17, 0, 0),  // Same end time for simplicity
      ot: staff.role === 'Manager' ? 2 : 0, // Managers get 2 hours OT, others get 0
    }));

    // Insert attendance records
    await Attendance.insertMany(attendances);
    console.log('Attendance records seeded successfully');
  } catch (err) {
    console.error('Error seeding attendance:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedAttendance();
