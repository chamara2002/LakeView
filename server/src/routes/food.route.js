const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller.js');

router.get('/', foodController.getFood);
router.post("/add-food", foodController.addFood);
router.put("/update/:id", foodController.updateFood);
router.get('/:id',foodController.viewOneFood)
router.delete("/delete/:id",foodController.deleteFood);

module.exports = router;

