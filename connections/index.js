const mongoose = require("mongoose");
require("dotenv").config();

const connectPortfolio = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected To DB"))
    .catch((err) => console.error(err));
};

module.exports = connectPortfolio