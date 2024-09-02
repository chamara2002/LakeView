const express = require("express");
const cors = require("cors");
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const indexRouter = require("./src/routes/index");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

mogoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


module.exports = app;