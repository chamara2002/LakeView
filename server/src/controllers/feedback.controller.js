const Feedback = require('../models/feedback.model');

exports.addFeedback = async (req, res) => {
    try {
        const newFeedback = {
            userId: req.body.userId,
            message: req.body.message,
            rating: req.body.rating || 0,
            reply : req.body.reply || null,
        };

        const feedback = new Feedback(newFeedback);
        await feedback.save();

        return res.status(201).json(feedback);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try{
        const feedbacks = await Feedback.find();

        if(feedbacks.length === 0){
            return res.status(200).json({message: "No feedbacks"});
        }

        return res.status(201).json(feedbacks);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

exports.getFeedback = async (req, res) => {
    try {

        const id = req.params.id;
        const feedback = await Feedback.findById(id);

        if(!feedback){
            return res.status(200).json({message: "feedback not found"});
        }

        return res.status(201).json(feedback);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

exports.updateFeedback = async (req, res) => {
    try {

        const id = req.params.id;

        const updateFeedback = {
            userId: req.body.userId, // user should not be updated
            message: req.body.message,
            rating: req.body.rating,
            reply: req.body.reply,
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, updateFeedback, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json(updatedFeedback);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await Feedback.findByIdAndDelete(id);

        if (!result) {
            return res.status(200).json({message: "Feedback not found"});
        }

        return res.status(200).json({message: "Feedback deleted"});

    }catch (error) {
        res.status(500).send({error: error.message});
    }
}