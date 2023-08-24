const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const express = require("express");
const router = express.Router();

// the root path
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'}); // render template using configed template engine
});

module.exports = router;
