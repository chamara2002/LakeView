const express = require('express');
const router = express.Router();


const staffMembers = require('../controllers/staffMember.controller');

router.get('/', staffMembers.getStaffMembers); // get all resources
router.post('/add', staffMembers.createStaffMember); // add new resource
router.put('/update/:id', staffMembers.updateStaffMember); // update resource
router.delete('/delete/:id', staffMembers.deleteStaffMember); // delete resource
router.get('/:id', staffMembers.getStaffMemberById); // get staff member by id


module.exports = router