C24

REST API basics

1h content



# Abstract

Key takeaway

+ REST APIs: decouping frontend & backend, only exchange data, no UI logic exchange
+ app > router > controller 
+ Cross Origin Resources Sharing (CORS ) error
+ app.js的expressjs的代码也是一行一行执行的! 每一个request进来被router direct到不同的controller里面处理business logic再返回response



# Intro

前面全是用ejs template 来render html 并serve给client, 其实并没有做到前后端分离



REST APIs: decouping Frontend and Backend

+ what is REST APIs
+ why use/build REST APIs
+ Core REST Concepts & Principles
+ First REST API!



not every Frontend requires HTML pages!

+ mobile apps, they don't use HTML to build frontend
+ single page web apps, like udemy (react.js属于这类)
+ sometime we just want data don't want any HTML, e.g. service APIs such as Google Map APIs 

So a different kind of response is needed!  REST: Representational State Transfer

+ transfer data iinstead of User Interfaces



:pencil: [RESTful APIs](./sub_topics/RESTful.md)

说白了就是一个url path 对应一个callback function for business logic， 只在前后端之间传递data, 不传递ui structure e.g. HTML



Data format: 

+ XML
+ JSON



# Routing & HTTP methods

362-



Routing: API endpoints

HTTP methods: more than just GET & POST

+ GET : get a resource from server
+ POST: create or append resouce on server
+ PUT: create or overwrite a resource on server
+ PATCH: update parts of an existing resources on server
+ DELETE: delete a resource on server
+ OPTIONS: determine whether follow-up request is allowed (sent automatically)



REST APIs: core principles 

363

+ :bangbang: **Uniform interface**
  + clearly defined API endpoints with clearly defined request + response data structure
+ :bangbang: Stateless interaction
  + server and client don't store any connection history, evrey request is handled seperately

+ Cacheable
  + server may set caching headers to allow the client to cache responses
+ client-server
  + server and client are seperated, client is not concerned with persistent data storage

+ Layered System
  + server may forward requests to other APIs
+ Code on demand
  + Executable code may be transferred from server to client



363-364

## Get, post demo



app.js

```js
const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

// middlewares
app.use(bodyParser.json()); // application/json

app.use("/feed", feedRoutes);

app.listen(8080);
```

routes > feed.js

```js
const express = require("express");
const feedController = require("../controller/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

router.post('/post', feedController.createPost)

module.exports = router;

```

controllers > feed.js

```js
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

exports.createPost = (req, res, next) => {
  // body-parser will take care of this
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  // create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
```







## :moon: Client & CORS error 

366-

看至此处

Codepen: for simulating simple frontend app



```html
<button id="get">Get all Posts</button>
<button id="post">Create a Post</button>
```

```js
const getButton = document.getElementById('get')
const postButton = document.getElementById('post')

getButton.addEventListener('click', ()=>{
  fetch('http://localhost:8080/feed/posts')
    .then(res => res.json())
  .then(resData => console.log(resData))
    .catch(err => console.log(err));  // browser built-in method
})
```

when click on getButton to send the http request, we unexpectedly get: CORS error warning



:bangbang: CORS error: Cross-Origin Resoucre sharing => not allowed by browser (a security mechanism) if client & server run on different (ip + port)

we need to tell the browser: you may accept the response sent by my server. This is done by adding header on server: 

app.js

+ add a middleware to set necessary headers for all responses

```js
const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

// middlewares
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {   // set headers for every response
  res.setHeader('Access-Control-Allow-Origin', '*');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/feed", feedRoutes);

app.listen(8080);
```

now when click on getPost button, we can successfully get the data from server





## Send post request

367-



for post request

+ set up request body and necessary request header 

```js
const getButton = document.getElementById("get");
const postButton = document.getElementById("post");

getButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/posts")
    .then((res) => res.json())
    .then((resData) => console.log(resData))
    .catch((err) => console.log(err)); // browser built-in method
});

postButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/post", {
    method: "POST",
    body: JSON.stringify({
      title: 'A codepen post',
      content: 'Created via codepen'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((resData) => console.log(resData))
    .catch((err) => console.log(err)); // browser built-in method;
});
```

