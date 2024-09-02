const LostNFound = require("../models/lostNfound.model");

exports.addLostAndFound = async (req, res) => {
  try {
    const lostNFound = {
      userName: req.body.userName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      foundItemsCategory: req.body.foundItemsCategory,
      userId: req.body.userId,
      lostPlace: req.body.lostPlace,
      foundItem: req.body.foundItem,
      foundItemPlace: req.body.foundItem,
      isFound: req.body.isFound,
      founder: req.body.founder,
    };

    const newLostNFound = await LostNFound.create(lostNFound);

    return res.status(201).json(newLostNFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.allLostNFound = async (req, res) => {
  try {
    const lostNFounds = await LostNFound.find().populate({
      path: "userName.Customer",
    });

    if (lostNFounds.length === 0) {
      return res.status(200).json({ message: "No lost and found items" });
    }

    return res.status(200).json(lostNFounds);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.oneLostNFound = async (req, res) => {
  try {
    const id = req.params.id;

    const lostNFound = await LostNFound.findById(id).populate({
      path: "userName.Customer",
    });

    if (!lostNFound) {
      return res.status(404).json({ message: "Lost and found item not found" });
    }

    return res.status(200).json(lostNFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLostAndFound = async (req, res) => {
  try {
   
    const { id } = req.params;
    
    
    const updateData = req.body;

    
    const updatedItem = await LostNFound.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } 
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    
    res.status(200).json(updatedItem);

  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
}

exports.deleteLostAndFound = async (req, res) => {
  try {
    
    const id = req.params.id;

    const deletedItem = await LostNFound.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(deletedItem);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}