const StaffMember = require("../models/staffMember.model.js");

/*
 * @function getStaffMembers
 * @description View all staff members
 * @returns {Promise<StaffMember[]>} A promise that resolves with an array of all staff members
 */
exports.getStaffMembers = async (req, res) => {
  try {
    const staffMembers = await StaffMember.find();
    res.json(staffMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// * @function getStaffMemberById
// * @description View a single staff member by ID
// * @param {string} id The ID of the staff member to find
// * @returns {Promise<StaffMember>} A promise that resolves with the found staff member
// * @throws {Error} Throws an error if the staff member is not found
exports.getStaffMemberById = async (req, res) => {
  try {
    const staffMember = await StaffMember.findById(req.params.id);
    if (!staffMember) {
      throw new Error("Staff member not found");
    }
    res.json(staffMember);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// * @function createStaffMember
// * @description Create a new staff member
// * @param {Object} req.body The request body containing the staff member details
// * @param {string} req.body.username The username of the staff member
// * @param {string} req.body.password The password of the staff member
// * @param {string} req.body.role The role of the staff member
// * @param {number} req.body.salary The salary of the staff member
// * @returns {Promise<StaffMember>} A promise that resolves with the newly created staff member
exports.createStaffMember = async (req, res) => {
  try {
    const { username, email, nic, address, phone, password, role, salary } =
      req.body;
    const staffMember = new StaffMember({
      username,
      email,
      nic,
      address,
      phone,
      password,
      role,
      salary,
    });
    await staffMember.save();
    res.status(201).json(staffMember);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// * @function updateStaffMember
// * @description Update a staff member
// * @param {Object} req.body The request body containing the updated staff member details
// * @param {string} req.params.id The ID of the staff member to update
// * @returns {Promise<StaffMember>} A promise that resolves with the updated staff member
exports.updateStaffMember = async (req, res) => {
  try {
    const staffMemberId = req.params.id;
    const updatedStaffMember = await StaffMember.findByIdAndUpdate(
      staffMemberId,
      req.body,
      { new: true }
    );
    res.json(updatedStaffMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// * @function deleteStaffMember
// * @description Delete a staff member
// * @param {string} req.params.id The ID of the staff member to delete
// * @returns {Promise<StaffMember>} A promise that resolves with the deleted staff member
exports.deleteStaffMember = async (req, res) => {
  try {
    const staffMemberId = req.params.id;
    const deletedStaffMember = await StaffMember.findByIdAndDelete(
      staffMemberId
    );
    res.json(deletedStaffMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// * @function login
// * @description Login a staff member
// * @param {Object} req.body The request body containing the login details
// * @param {string} req.body.username The username of the staff member
// * @param {string} req.body.password The password of the staff member
// * @returns {Promise<Object>} A promise that resolves with the staff member details
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const staffMember = await StaffMember.findOne({ username });
    if (!staffMember) {
      throw new Error("Staff member not found");
    }
    const isPasswordValid = await staffMember.verifyPassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }
    res.json(staffMember);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
