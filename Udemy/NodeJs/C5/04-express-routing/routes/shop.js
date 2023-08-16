const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("In 3rd middleware!");
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
