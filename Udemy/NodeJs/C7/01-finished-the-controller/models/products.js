const fs = require("fs");
const path = require("path");

// helper function and variables -----------------
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  // method on class, not on obj
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent)); // string => JS obj or array
    }
  });
};

// exports class ---------------------------
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this); // this refer to this obj
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // cb is a callback that takes an input as products list
    getProductsFromFile(cb);
  }
};
