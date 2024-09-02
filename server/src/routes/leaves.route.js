const express = require('express');
const router = express.Router();
const leavesController = require('../controllers/leaves.controller'); 

router.post('/leaves', leavesController.createLeaveRequest);
router.get('/leaves', leavesController.getAllLeaveRequests);
router.get('/leaves/:leaveId', leavesController.getLeaveById); 
router.put('/leaves/:leaveId/approve', leavesController.approveLeaveRequest);
router.delete('/leaves/:leaveId', leavesController.deleteLeaveRequest);

module.exports = router;
