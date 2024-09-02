const Attendance = require('../models/attendence.model');

// Create a new attendance record
exports.createAttendanceRecord = async (req, res) => {
  try {
    const { userId, start, end, ot } = req.body;

    const newAttendance = new Attendance({
      userId,
      start,
      end,
      ot,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all attendance records
exports.getAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('userId', 'username');
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an attendance record by ID
exports.getAttendanceRecordById = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const attendanceRecord = await Attendance.findById(attendanceId).populate('userId', 'username');

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json(attendanceRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an attendance record by ID
exports.updateAttendanceRecord = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { start, end, ot } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { start, end, ot },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json(updatedAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an attendance record by ID
exports.deleteAttendanceRecord = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({ message: "Attendance record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
