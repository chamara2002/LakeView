const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendence.controller'); // Adjust the path as needed

router.post('/attendance', attendanceController.createAttendanceRecord);
router.get('/attendance', attendanceController.getAllAttendanceRecords);
router.get('/attendance/:attendanceId', attendanceController.getAttendanceRecordById);
router.put('/attendance/:attendanceId', attendanceController.updateAttendanceRecord);
router.delete('/attendance/:attendanceId', attendanceController.deleteAttendanceRecord);

module.exports = router;
