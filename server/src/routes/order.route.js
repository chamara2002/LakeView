const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js');

router.get('/', orderController.getOrders);
router.post("/add-order", orderController.addOrder);
router.put("/update/:id", orderController.updateOrder);
router.get('/:id',orderController.viewOneOrder)
router.delete("/delete/:id",orderController.deleteOrder);

module.exports = router;