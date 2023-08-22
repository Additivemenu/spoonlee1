C6 Working with dynamic content & template engine

78-95



# Abstract 

+ Manage data (without database)

+ Render dynamic content in our view
  + using Template engine to dynamically manipulate html elements by intaking customized parameters from render() method. Quite similar to React, but in an imperative way




# 1. Hands-on

## sharing data across requests & users

Continue project demo from last project



admin.js

+ 定义一个array来存储user提交的product
  + also export it from admin.js
+ 这种方式会使得data is shared across requests & users, i.e. multiple users see the same data in the array (:question: 似乎通过express()得到的router是单例的? 确实是这样 :bangbang: [singleton exports in node.js](./sub_topics/singleton_exports.md)
  + we later will explore how to make data share only across requests (like access control?)

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



# 2. Template engine

80-

Available template engines inclue:

+ EJS
+ Pug (Jade)
+ Handlebars

gpt for respective features



install template engines

```console
npm install --save ejs pug express-handlebars
```



## 2.1 Pug

81-87



### Start up

---

app.js

+ Set up some Configurations like we do in application.properties in Spring Boot

```js
const path = require("path");
const express = require("express"); // hold cmd to see source code
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// like appliaction.properties **************
app.set('view engine', 'pug');  // tell express we are gonna use pug as template engine
app.set('views', 'views')  // tell express where to find the views (rootpath/views)
// ******************************************

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

shop.pug

+ pug版本的类html的写法

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title MyShop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body 
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/") Add Product
                    
```

shop.js

+ 在shop.js里, render pug template, 返回给browser的是render好的html file
  + 就和python的Jinja一样

```js
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const express = require("express");
const router = express.Router();

// the root path
router.get("/", (req, res, next) => {
  res.render('shop'); // render template using configed template engine
});

module.exports = router;
```



### Outputing dynamic content 

---

82

shop.js

+ 这里我们用res.render()方法来render 名为shop.pug的文件
  + input to that template file is `{prods: products, docTitle: 'Shop'}`. 
  + very similar to Jinja in python!

```js
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const express = require("express");
const router = express.Router();

// the root path
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, docTitle: 'Shop'}); // render template using configed template engine
});

module.exports = router;
```

shop.pug 

+ Shop html的pug版本
  + 和react 查不多, dynamically manipulate the content and elements of a html in a programmatical way

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{docTitle}
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body 
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        main
            if prods.length > 0
                .grid
                    //- render a list of products
                    each product in prods       
                        article.card.product-item
                            header.card__header
                                h1.product__title #{product.title}
                            div.card__image
                                img(src="a img link here", alt="A Book")
                            div.card__content
                                h2.product__price $19.99
                                p.product__description A very interesting book about so many even more interesting things!
                            .card__actions
                                button.btn Add to Cart
            else
                h1 No Products
```



同理把404.html, add-product.html 转化为pug file, 并在对应的express.js的API代码中render它们. 不展示代码了



more on pug [Getting Started – Pug (pugjs.org)](https://pugjs.org/api/getting-started.html)



### Create Layout

---

Views > layouts > main-layout.pug

+ use `block` to decalre a placeholder

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Page Not Found
        link(rel="stylesheet", href="/css/main.css")
        block styles 
    body 
        header.main-header
                    nav.main-header__nav
                        ul.main-header__item-list
                            li.main-header__item
                                a.active(href="/") Shop
                            li.main-header__item
                                a(href="/admin/add-product") Add Product
        block content
```



In other pug file, we can resue the main layout by extending from it:

404.pug

```pug
extends layouts/main-layout.pug

block content 
    h1 Page Not Found! 
```

add-product.pug

```pug
extends layouts/main-layout.pug

block styles
    link(rel="stylesheet", href="/css/product.css")

block content   
    main
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text", name="title")#title
            
            button.btn(type="submit") Add Product
```



but how to set 'active' when navigating between pages?

+ just pass a argument to render() method 

admin.js

```js
// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render('add-product', {pageTitle: "Add Product", path:'admin/add-product'})
});
```

shop.js

```js
// the root path
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'}); // render template using configed template engine
});
```

app.js

```js
// page not found middleware
app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

```



main-layout.pug

+ we make `pageTitle` and `path` as argument to render() method in express middlewares, now we use them directly in the pug template file

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles 
    body 
        header.main-header
                    nav.main-header__nav
                        ul.main-header__item-list
                            li.main-header__item
                                a(href="/", class=(path==='/'?'active':'')) Shop
                            li.main-header__item
                                a(href="/admin/add-product", class=(path==='admin/add-product'?'active':'')) Add Product
        block content
```







## 2.2 Handlebars

88-90

有需求再看





## 2.3 EJS

91-92

有需求再看

貌似比前两个template engine 的语法更加简洁







# 3. :gem: Assignment 

practice for template engine
