const Maintenance =require('../models/games.model.js');


exports.getMaintenance = async (req, res) => {
    try {
        const maintenances = await Maintenance.find();
        res.json(maintenances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addMaintenance = async (req, res) => {
    try {
        const { taskId, taskName, description, status, assignedTo, scheduledDate } = req.body;
        const maintenance = new Maintenance({ taskId, taskName, description, status, assignedTo, scheduledDate });
        await maintenance.save();
        res.status(201).json(maintenance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.updateMaintenance = async (req, res) => {
    try {
        const maintenanceId = req.params.id;
        const updatedMaintenance = await Maintenance.findByIdAndUpdate(maintenanceId, req.body, { new: true });
        res.json(updatedMaintenance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenanceId = req.params.id;
        await Maintenance.findByIdAndDelete(maintenanceId);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}