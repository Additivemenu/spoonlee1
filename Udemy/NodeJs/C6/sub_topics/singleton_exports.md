Considering the below code:

```js
const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

const products = [];  // temporary data ***********

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



<u>**In Node.js, when you require (or import) a module, it is effectively treated as a singleton.**</u> This means that regardless of how many times you require the module across your application, you'll always get back the same instance of the module's exports.

To illustrate with your file:

If you have:

```javascript
// adminRoutes.js
...
exports.routes = router;
exports.products = products;
```

And then in two other files you require it:

```javascript
// server.js
const adminRoutes = require('./adminRoutes');

// anotherModule.js
const adminRoutes2 = require('./adminRoutes');
```



Both `adminRoutes` and `adminRoutes2` will reference the same `router` and `products` objects. For instance, if you add a product to `products` in `server.js`, you'll see that product when you access `products` from `anotherModule.js`.

This behavior is due to Node.js's module caching. The first time a module is loaded, its exports are cached, and subsequent calls to `require` for that module will retrieve the cached exports.

This "singleton" behavior is particularly useful for configuration objects, shared resources like database connections, and, as in your case, shared data stores or routes (though for larger apps, one might opt for more scalable storage solutions).