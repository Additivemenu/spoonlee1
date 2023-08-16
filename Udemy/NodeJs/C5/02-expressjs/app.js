const express = require("express"); // hold cmd to see source code
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false})); // register request body parser


// routes handling middleware ---------------
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In 2nd middleware!");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</buttom></form>'
  );
});

// additional filtering, only run at post request
// if app.use(...), it will also run at get request
app.post("/product", (req, res, next) => {
  console.log(req.body);
  console.log("in post: /product")
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("In 3rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

app.listen(3000);
