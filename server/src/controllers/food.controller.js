const Food = require("../models/food.model");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

  createParentPath: true,
});

const upload = multer({ storage: storage });

// exports.addFood = [
//   upload.single("imageUrl"),
//   async (req, res) => {
//     try {
//       const newFood = {
//         name: req.body.name,
//         ingredients: req.body.ingredients,
//         category: req.body.category,
//         price: req.body.price,
//         isAvailable: req.body.isAvailable,
//         imageUrl: req.body.imageUrl,
//       };

//       const food = new Food(newFood);
//       await food.save();
//       return res.status(201).json(food);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// ];

exports.addFood = async (req, res) => {
  try {
    const { name, ingredients, category, price, isAvailable, imageUrl } = req.body;

    // Validate required fields
    if (!name || !ingredients || !category || !price) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Create a new food item
    const newFood = new Food({
      name,
      ingredients,  // Assuming ingredients is already an array
      category,
      price,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      imageUrl,
    });

    // Save the food item to the database
    const savedFood = await newFood.save();

    // Respond with the newly created food item
    return res.status(201).json(savedFood);
  } catch (error) {
    console.error('Error adding food:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.getFood = async (req, res) => {
  try {
    const food = await Food.find();

    if(food.length === 0){
      return res.status(404).json({message: "Not Found"});
    }

    return res.json(food);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateFood = [
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const foodId = req.params.id;

      const updateFood = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        category: req.body.category,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
      };


      if (req.file) {
        updateFood.imageUrl = req.file.path;
      }

      const updatedFood = await Food.findByIdAndUpdate(foodId, updateFood, {
        new: true,
      });

      if (!updatedFood) {
        return res.status(404).send({ message: "Food not found" });
      }

      return res
          .status(200)
          .send({ message: "Food has been updated successfully", food: updatedFood });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const result = await Food.findByIdAndDelete(foodId);

    if (!result) {
      return res.status(400).send({ message: "Product cannot be found" });
    }

    return res.status(200).send({ message: "Food deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.viewOneFood = async (req,res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        return res.status(200).json(food);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
