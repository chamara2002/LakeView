const express = require('express');
const router = express.Router();


const resourceController = require('../controllers/resource.controller.js');

router.get('/resources', resourceController.getResources); // get all resources
router.post('/resources', resourceController.addResource); // add new resource
router.put('/resources/:id', resourceController.updateResource); // update resource
router.delete('/resources/:id', resourceController.deleteResource); // delete resource
router.get('/resources/:id', resourceController.getResourceById); // get resource by ID

module.exports = router