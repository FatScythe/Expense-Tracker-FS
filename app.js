require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const { connect, set } = require("mongoose");

app.use(express.json());

// Router
const authRouter = require("./routes/authRoute");
const transRouter = require("./routes/transactionRoute");

// Middleware
const errorHandlerMW = require("./middleware/errorHandler");
const notFoundMW = require("./middleware/notFound");
const authMW = require("./middleware/authenticateUser");

app.get("/", async (req, res) => {
  res.send("Expense Tracker");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trans", authMW, transRouter);

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
