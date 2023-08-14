const express = require("express"); // hold cmd to see source code

const app = express();

app.use("/user", (req, res, next) => {
  console.log("In 1nd middleware!");
  res.send("<h1>Users' Page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In 2rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});
app.listen(3001);