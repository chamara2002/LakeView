const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller.js');


router.get('/maintenances', maintenanceController.getMaintenance);
router.post('/maintenances', maintenanceController.addMaintenance);
router.put('/maintenances/:id', maintenanceController.updateMaintenance);
router.delete('/maintenances/:id', maintenanceController.deleteMaintenance);

module.exports = router