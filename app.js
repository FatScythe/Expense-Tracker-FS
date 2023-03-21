require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { connect, set } = require("mongoose");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

// Router
const authRouter = require("./routes/authRoute");
const transRouter = require("./routes/transactionRoute");
const pfRouter = require("./routes/pfRoute");

// Middleware
const errorHandlerMW = require("./middleware/errorHandler");
const notFoundMW = require("./middleware/notFound");
const authMW = require("./middleware/authenticateUser");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trans", authMW, transRouter);
app.use("/api/v1/update", authMW, pfRouter);

app.get("*", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Middlewares
app.use(errorHandlerMW);
app.use(notFoundMW);

const PORT = process.env.PORT || 5000;

const start = async (req, res) => {
  await set("strictQuery", true);
  await connect(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
};

start();
