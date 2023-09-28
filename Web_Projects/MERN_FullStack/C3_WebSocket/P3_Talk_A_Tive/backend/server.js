const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const colors = require("colors"); // coloring console.log() in terminal

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // !tell server to access json data

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler); // ! general error handler

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}`.yellow.bold)
);
