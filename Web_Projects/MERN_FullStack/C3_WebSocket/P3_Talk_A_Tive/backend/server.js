const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");     // coloring console.log() in terminal

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id)
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}`.yellow.bold)
);
