const express = require('express');
const router = express.Router();
const lostNFoundController = require('../controllers/lostNfound.controller');

router.post('/add-lost-and-found', lostNFoundController.addLostAndFound);
router.get('/all-lost-and-found', lostNFoundController.allLostNFound);
router.get('/one-lost-and-found/:id', lostNFoundController.oneLostNFound);
router.put('/update-lost-and-found/:id', lostNFoundController.updateLostAndFound);
router.delete('/delete-lost-and-found/:id', lostNFoundController.deleteLostAndFound);

module.exports = router;