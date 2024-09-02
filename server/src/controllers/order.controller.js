const Order = require('../models/order.model');
const Food = require("../models/food.model");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({ path: 'meals.food' });

        if(orders.length === 0){
            return res.status(200).json({message: "Not Found"});
        }

        return res.status(201).json(orders);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

exports.addOrder = async (req, res) => {
    try {

        const newOrder = {
            userId: req.body.userId,
            meals: req.body.meals,
            totalPrice: req.body.totalPrice,
            isCompleted: req.body.isCompleted,
        }

        const order = await Order.create(newOrder);

        return res.status(201).json(order);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id; 

        
        const updates = {
            meals: req.body.meals, 
            isCompleted: req.body.isCompleted
        };

        
        Object.keys(updates).forEach((key) => {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        });

        
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, {
            new: true, 
            runValidators: true 
        });

        
        if (!updatedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }

        
        return res.status(200).json(updatedOrder);
    } catch (error) {
        
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const result = await Food.findByIdAndDelete(orderId);

        if (!result) {
            return res.status(400).send({ message: "Product cannot be found" });
        }

        return res.status(200).send({ message: "Order deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.viewOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Food.findById(orderId);
        return res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};