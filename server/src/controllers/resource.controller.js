const Resource = require("../models/resource.model.js");

exports.getResources = async (req, res) => {
  try {
    const resource = await Resource.find();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource)
      return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addResource = async (req, res) => {
  try {
    const {
      resourceId,
      resourceName,
      resourceType,
      availableQuantity,
      location,
      price,
      repairStatus,
      maintainanceStatus,
    } = req.body;
    const resource = new Resource({
      resourceId,
      resourceName,
      resourceType,
      availableQuantity,
      location,
      price,
      repairStatus,
      maintainanceStatus,
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      req.body,
      { new: true }
    );
    res.json(updatedResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    await Resource.findByIdAndDelete(resourceId);
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
