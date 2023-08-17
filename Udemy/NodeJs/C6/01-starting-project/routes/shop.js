const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const express = require("express");
const router = express.Router();

// the root path
router.get("/", (req, res, next) => {
  console.log("shop.js: ", adminData.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
