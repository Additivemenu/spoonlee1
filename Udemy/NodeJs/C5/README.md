5

# Intro



## What is Express.js



Express.js is a back-end web application framework for building *<u>RESTful APIs</u>* with Node.js. It is designed for building web applications and APIs. [It has been called the de facto standard server framework for Node.js](https://en.wikipedia.org/wiki/Expressjs)[1](https://en.wikipedia.org/wiki/Expressjs). Express.js works on top of Node.js web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing. [It adds helpful utilities to Node.js HTTP objects and facilitates the rendering of dynamic HTTP objects](https://www.geeksforgeeks.org/express-js/)[2](https://www.geeksforgeeks.org/express-js/).



## Install Express.js



install express.js to you local path

```console
npm install --save express
```



## middleware 

Express.js is all about middleware

<img src="./src_md/middleware1.png" style="zoom: 33%;" />



app.js

- `app.use()` is a method to set up middleware in Express. Middleware are functions that process incoming requests.

```js
const express = require("express"); // hold cmd to see source code

const app = express();

// middleware1
app.use((req, res, next) => {
  console.log("In the middleware!");
  next(); // call this to allow the request to continue to the next middleware in line
});
// middleware2
app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

app.listen(3000);	// create a server that intake app as request-response handler listening on port3000
```

runn app.js, check out at localhost:3000, you will see

```console
In the middleware!
In another middleware!
```

and browser received the html we sent in the 2nd middleware





## Handling different routes

63

check app.use() offical doc:

[Express 5.x - API Reference (expressjs.com)](http://expressjs.com/en/5x/api.html#app.use)

:gem: app.js

```js
const express = require("express"); // hold cmd to see source code

const app = express();

// 1st middleware
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});
// 2nd middleware
app.use("/add-product", (req, res, next) => {
  console.log("In 2nd middleware!");
  res.send("<h1>The 'Add Product Page'</h1>");
});
// 3rd middleware
app.use("/", (req, res, next) => {
  console.log("In 3rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

app.listen(3000);
```



**Important Note on Middleware Ordering**: *<u>Middleware and routes in Express are executed in the order they're defined.</u>* This means that the third middleware (root route "/") will only run for requests that haven't been handled by previous middleware. Given the current code, if you visit the root route ("/"), only the first and third middleware will run. If you visit "/add-product", the first and second middleware will run.

However, because both the second and third middleware send responses (using `res.send()`), it's essential to ensure that no request matches both routes. If that were to happen, there would be an error because you can't send multiple responses to a single request. In this code, there's no conflict because the specific path "/add-product" will only trigger the second middleware, and the more general path "/" will only trigger the third middleware.



:bangbang: notes:  the order of middleware and route definitions in Express is crucial: 

+ ***<u>More specific paths or routes should be defined before more general ones</u>*** to ensure that they are correctly matched and handled.

if you define app.js as:

```js
const express = require("express"); // hold cmd to see source code

const app = express();

// 1st middleware
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

// 2rd middleware
app.use("/", (req, res, next) => {
  console.log("In 3rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

// 3nd middleware
app.use("/add-product", (req, res, next) => {
  console.log("In 2nd middleware!");
  res.send("<h1>The 'Add Product Page'</h1>");
});

app.listen(3000);
```

- now if you try to access `'/add-product'` in your browser, you would expect the third middleware to handle this request. However, because the second middleware with the `'/'` route is defined first, it will catch all incoming requests (because `'/'` matches all routes).
- This means the response from the second middleware will be sent, and the third middleware will never get a chance to handle the `'/add-product'` route.



## Assignment2

```console
npm init

npm install --save-dev nodemon

npm install --save express
```

app.js

```js
const express = require("express"); // hold cmd to see source code

const app = express();

app.use("/user", (req, res, next) => {
  console.log("In 1nd middleware!");
  res.send("<h1>Users' Page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In 2rd middleware!");
  res.send("<h1>Hello From Express.js</h1>");
});

app.listen(3001);
```





## Parsing incoming requests

64





