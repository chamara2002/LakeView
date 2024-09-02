const Leaves = require('../models/leaves.model'); // Adjust the path as needed

// Create a new leave request
exports.createLeaveRequest = async (req, res) => {
  try {
    const { startDate, endDate, leaveReason, employeeId } = req.body;

    const newLeave = new Leaves({
      startDate,
      endDate,
      leaveReason,
      employeeId,
    });

    await newLeave.save();
    res.status(201).json(newLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leaves.find().populate('employeeId', 'username');
    if (leaveRequests.length === 0) {
      return res.status(404).json({ message: "No leave requests found" });
    }
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a leave request
exports.approveLeaveRequest = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leaveRequest = await Leaves.findById(leaveId);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leaveRequest.leaveStatus = true;
    await leaveRequest.save();

    res.json({ message: "Leave request approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a leave request
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leaveRequest = await Leaves.findByIdAndDelete(leaveId);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({ message: "Leave request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a leave request by ID
exports.getLeaveById = async (req, res) => {
    try {
      const { leaveId } = req.params;
      const leaveRequest = await Leaves.findById(leaveId).populate('employeeId', 'username');
  
      if (!leaveRequest) {
        return res.status(404).json({ message: "Leave request not found" });
      }
  
      res.json(leaveRequest);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
