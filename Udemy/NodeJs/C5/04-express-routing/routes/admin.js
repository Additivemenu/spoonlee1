const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
// additional filtering, only run at post request
// if app.use(...), it will also run at get request
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  console.log("in post: /product");
  res.redirect("/");
});

module.exports = router;
