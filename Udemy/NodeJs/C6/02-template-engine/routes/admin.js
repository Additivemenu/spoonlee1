const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render('add-product', {pageTitle: "Add Product"})
});

// /admin/add-product => POST
// additional filtering, only run at post request
// if app.use(...), it will also run at get request
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
