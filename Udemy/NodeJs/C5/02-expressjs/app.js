const express = require("express"); // hold cmd to see source code

const app = express();

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In 2nd middleware!");
  res.send("<h1>The 'Add Product Page'</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In 3rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

app.listen(3000);
