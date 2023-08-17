C6 Working with dynamic content & template engine

78-95



# Abstract 

Manage data (without database)

Render dynamic content in our view

+ using Template engine



# Hands-on

## sharing data across requests & users

Continue project demo from last project



admin.js

+ 定义一个array来存储user提交的product
  + also export it from admin.js
+ 这种方式会使得data is shared across requests & users, i.e. multiple users see the same data in the array (:question: 似乎通过express()得到的router是单例的? )
  + we later will explore how to make data share only across requests 

```js
const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
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
```

shop.js

+ import adminData from admin.js, 并console log products array

```js
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
```

app.js

```js
const path = require("path");
const express = require("express"); // hold cmd to see source code
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // register request body parser
app.use(express.static(path.join(__dirname, "public")));

// routes handling middleware ---------------
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// page not found middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
```



# Template engine

80-



## Installing & implementing Pug



