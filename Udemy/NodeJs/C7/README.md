C7

44min content

# Intro

:gem: code is based on previous class 



Model View Controller (MVC)

seperation of responsibility for you system

+ Model

  + represents data in your code;
  + work with your data e..g save, fetch
+ View

  + what user sees
  + decoupled from your application code
+ Controller

  + Connect your model and view
  + Routes

we already have view, now we add controller and model



# Add controller



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

100- 看至此
