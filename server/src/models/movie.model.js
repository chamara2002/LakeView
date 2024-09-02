const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    image:{type: String, required: true},
    language:{type: String, required: true},
    availableTimes: { type: [Date], default: [] },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    artists: { type: [String], default: [] },
    description: { type: String, required: true },
    ratings: [
      {
        customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
        score: { type: Number, required: true },
        feedback: { type: String },
      },
    ],
  },
  { timestamps: true }
);

MovieSchema.path("name").validate(async (value) => {
  const movieNameCount = await mongoose.models.Movie.countDocuments({
    name: value,
  });
  return !movieNameCount;
}, "Movie name already exists");

module.exports = mongoose.model("Movie", MovieSchema);
