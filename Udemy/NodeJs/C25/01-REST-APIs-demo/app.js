const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// middlewares
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  // set headers for every response
  res.setHeader("Access-Control-Allow-Origin", "*"); // add this header
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // allow set Header
  next();
});

app.use("/feed", feedRoutes);

mongoose.connect("url").then((retult) => {
  app.listen(8080);
});
app.listen(8080);
