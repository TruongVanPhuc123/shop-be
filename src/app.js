const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { sendResponse } = require("./helpers/utils");
const indexRouter = require("./routes/index");
const app = express();
const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Connected to MongoDB: " + mongodbUrl))
  .catch((e) => console.log(e));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Route Not Found");
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error", err);
  return sendResponse(
    res,
    res.statusCode ? err.statusCode : 500,
    false,
    null,
    err.message,
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});

module.exports = app;
