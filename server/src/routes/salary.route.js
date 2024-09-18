const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salary.controller'); 

router.post('/attendance', salaryController.createAttendanceRecord);
router.get('/attendance', salaryController.getAllAttendanceRecords);
router.get('/attendance/:attendanceId', salaryController.getAttendanceRecordById);
router.put('/attendance/:attendanceId', salaryController.updateAttendanceRecord);
router.delete('/attendance/:attendanceId', salaryController.deleteAttendanceRecord);

module.exports = router;
