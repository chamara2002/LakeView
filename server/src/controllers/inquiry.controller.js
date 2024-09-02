// services/inquiryService.js
const Inquiry = require('../models/inquiry.model'); // Adjust the path as needed


// Function to get all inquiries
exports.getAllInquiries = async (req,res) => {
    try {
        const inquiries = await Inquiry.find();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Function to add an inquiry
exports.addInquiry = async (req,res) => {
    try {
        const inquiry = {
            userName: req.body.userName,
            user: req.body.user,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            inquiryCategory: req.body.inquiryCategory,
            inquiryMessage: req.body.inquiryMessage,
        };

        const newInquiry = await Inquiry.create(inquiry);

        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Function to get one inquiry
exports.getOneInquiry = async (req,res) => {
    try {
        const id = req.params.id;

        const inquiry = await Inquiry.findById(id);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        return res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update an inquiry
exports.updateInquiry = async (req,res) => {
    try {
        const id = req.params.id;
        const inquiry = await Inquiry.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        
        return res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}

// Function to delete an inquiry
exports.deleteInquiry = async (req,res) => {
    try {
        const id = req.params.id;
        const inquiry = await Inquiry.findByIdAndDelete(id);
        
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        
        return res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}