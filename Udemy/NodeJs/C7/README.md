C7

44min content







# Abstract

:gem: code is based on previous class 

```js
// expressJS:
app -> router -> controller -> model
										|
  							render(view, callbackHandler)

// SpringBoot:
app -> controller -> service -> model

```



Model View Controller (MVC) [MVC - MDN Web Docs Glossary: Definitions of Web-related terms | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

seperation of responsibility for you system

+ Model

  + represents data in your code;
  + work with your data e..g save, fetch
  + doesn't matter if you manage data in memory, files, databases (we will talk about db later)...
  + 其实就是SpringBoot里的models, 定义数据结构与CRUD的方法
+ View

  + what user sees
  + decoupled from your application code
+ Controller

  + Connect your model and view. Should only make sure that the two can communicate (in both directions)
  + Routes
  + 有点像SpringBoot里的Service

we already have view, now we add controller and model

:bangbang: 这里MVC并不是前后端分离的写法, 依然是服务端渲染, request 交给对应的route背后的controller, 返回渲染好的html page, 





# Add controller

目前为止:

```js
app(project entry) -> router(Url, controllerCallback) -> controller(for handling business logic)
```

+ 同一条HTTP path, 可以对应不同的METHOD



## app

+ entry of the project

  + config some settings

  + Middleware: register routers  or controller callbacks(the callback function in controller that handles business logic)

    + if register router, we can set the first HTTP path  filter here

    

app.js

```js
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

// config
app.set('view engine', 'ejs');		// config view engine
app.set('views', 'views');				// config view file path

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// middlewares: order matters!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// register routers & error controller ***************
app.use('/admin', adminRoutes);		// http path filter here
app.use(shopRoutes);

app.use(errorController.get404);
// ****************************************************

app.listen(3000);
```

## routers

+ Indirection layer that routes request from app to corresponding controller
  + filters for HTTP method
  + filters for HTTP path

admin.js

```js
const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
```

shop.js

```js
const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// router 
router.get('/', productsController.getProducts);

module.exports = router;
```

## controllers

+ just callback functions that handles (req, res, next) 
  + where real business logic is 
    + Of course in SpringBoot we have many more layers after controller, but here we just write  business logic in controller
  + :bangbang: no need to specify HTTP path here, we already done that in app and routers. 但是需要指定View(HTML file)的名字
    + res.render(viewName, {parameters to view}). 

products.js

```js
const products = [];

// path is actually 
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};
```

error.js

```js
exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
};
```





# Add model

100- 

App -> route -> controller -> model





models > Product.js

```js
const products = []; // array stores existing products, act as singleton due to Module Caching mechanism

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll(){    // method on class, not on obj
    return products;
  }
};
```



> In the provided code, the `products` array acts as a singleton because of the way Node.js modules work. Let's break down why this is the case:
>
> 1. **Module Caching**: When you `require` a module in Node.js for the first time, Node.js executes the module's code and caches the exported values. Any subsequent `require` calls for the same module <u>will not</u> re-execute the module's code but will retrieve the exported values from the cache.
>
> 2. **Singleton Behavior**: Because of this caching behavior, the `products` array is only initialized once, the first time the module is required. All subsequent imports of the module will use the same `products` array. This makes the `products` array act as a singleton, ensuring there's only one shared instance of the array across the entire application.
>
> 3. **Benefits**: This behavior is useful in scenarios where you want to share a single instance of data or a configuration across different parts of your application. In the provided code, the `products` array acts as an in-memory storage for products, and since it's a singleton, any changes made to it (like adding a new product) will be reflected across all parts of the application that use the `Product` class.
>
> 4. **Drawbacks**: While this behavior is beneficial in some scenarios, it's essential to be aware of it to avoid unintended side effects. For instance, if you were expecting a fresh instance of the `products` array each time you imported the module, you'd be mistaken.
>
> In summary, the `products` array acts as a singleton because of Node.js's module caching mechanism. This ensures that there's only one shared instance of the `products` array throughout the application, allowing for consistent in-memory storage of products.



> static: diff with Java?
>
> In JavaScript (as of ES6 and later), you can indeed declare static class properties, but the syntax and behavior are a bit different than in Java.
>
> Here's how you can declare a static property inside a class definition in JavaScript:
>
> ```javascript
> class Product {
>   static products = [];
> 
>   constructor(title) {
>     this.title = title;
>   }
> 
>   save() {
>     Product.products.push(this);
>   }
> 
>   static fetchAll() {
>     return Product.products;
>   }
> }
> ```
>
> In this example, `products` is a static property of the `Product` class. When you want to access or modify it, you use the class name (`Product.products`).
>
> However, there are a few things to note:
>
> 1. **Browser Support**: Not all browsers support static class properties. If you're building a frontend application, you might need to use a transpiler like Babel to ensure compatibility with older browsers.
>
> 2. **Node.js Support**: If you're using Node.js, support for static class properties depends on the version. Newer versions of Node.js (v12 and above) support this feature out of the box, but older versions might require Babel.
>
> 3. **Difference from Java**: In Java, static properties are quite common and are used in various scenarios. In JavaScript, while static properties are available, the language's prototypal inheritance and the module system often provide other ways to achieve similar goals. For instance, module-level variables (like the original `products` array outside the class) can mimic static-like behavior due to Node.js's module caching.
>
> In conclusion, while you can use static properties in JavaScript classes similar to Java, always consider the context (browser vs. Node.js) and the specific use case to determine the best approach.



## Storing  data files via the Model

101-102

这里用file来存储product list, 后面我们会讲用database来存



Fetching Data from files via the Model

后面代码refactor了, 这里代码就不展示了





## :bangbang: Refactor the file storage code

103

最终的代码:

controller > products.js

```js
const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save(); // persis to a file
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
```



models > product.js

+ :bangbang: note function `getProductsFromFile(callback)` takes a callback function as argument, this means this function will pass behaviour to its function body. It's a bit like Strategy Pattern in OOP,  
  + 当其他function 调用`getProductsFromFile(callback)`时，只需向它pass一个具体的callback来表示需要执行的behaviour, 从而达到代码复用的效果

```js
const fs = require("fs");
const path = require("path");

// helper function and variables -----------------
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// take a callback as argument, meaning some steps in the function body is uncertain
// similar to using Strategy Pattern in OOP language
const getProductsFromFile = (cb) => {
  // method on class, not on obj
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);		// this behaviour is uncertain ************************
    } else {
      cb(JSON.parse(fileContent)); // string => JS obj or array. this behaviour is uncertain ********
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
```



## :bangbang: Callback in JS & Java

接上面的models > product.js写法

:pencil: [callbacks in JS & Java](./sub_topics/callbacks.md)

