const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const cloudinary = require("cloudinary").v2;
const limitter = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
require("dotenv").config();
require("express-async-errors");

//Builtin MiddleWares
app.use(express.urlencoded());
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(sanitize());
app.use(
  limitter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

//Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//API Routes
const ProjectRouter = require("./routes/project");
const AdminRouter = require("./routes/admin");
app.use("/api/v1/projects", ProjectRouter);
app.use("/api/v1/admin", AdminRouter);
//Error Handle
const NotFound = require("./middlewares/not-found");
const ErrorHandle = require("./middlewares/error-handle");
app.use(NotFound);
app.use(ErrorHandle);

//Start
const port = process.env.PORT || 5000;
const connectPortfolio = require("./connections");
const start = async () => {
  try {
    await connectPortfolio();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

start();
