const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
    
    taskId: {
        type: String,
        required: true,
        unique: true
      },
      taskName: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], // Example statuses
        default: 'Pending'
      },
      assignedTo: {
        type: String
      },
      scheduledDate: {
        type: Date
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema)