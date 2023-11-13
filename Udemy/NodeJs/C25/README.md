C25

REST APIs - practical application

2.5h content





# Abstract







# Intro

+ plan project, API
+ CRUD operation & endpoints
+ Validation data
+ image upload
+ Authentication



:bangbang: 371 high-level overview of preview course and this course

+ Diff between view-baed app and now REST app
  + not longer need cookie & sessions



## Frontend setup

372-

a ReactJS project (class component. not using Axios)

00-frontend-starting-setup: a post website



## Fetch list of posts

373-

build endpoint 

```js
GET: localhost:8080/feed/posts
```





## Create a Post

```js
POST: localhost:8080/feed/post
request headers: {
   "Content-Type": "application/json",
}
request body: {
   title: postData.title,
   content: postData.content,
}
```

:bangbang: note the data format needs to match perfectly between backend and frontend! check your spelling for the variable name don't make it wrong!

+ later on we will set Post model to enforce this!





## Add server side validation

```console
npm install --save express-validator
```

client side can do validation for user input, server can also do this



router > feed.js

```js
// create a post
router.post(
  "/post",
  [ 
    check("title").trim().isLength({ min: 5 }),   // ! server validation
    check("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);
```

controller > feed.js

```js
exports.createPost = (req, res, next) => {
  // ! validation on server *************
  const errors = validationResult(req);
  if (!errors.isEmpty()) {  // server validation failed
    return res
      .status(422)
      .json({
        message: "Validation failed, entered data is incorrect",
        errors: errors.array(),
      });
  }
  // ************************************
  // body-parser will take care of this
  const title = req.body.title;
  const content = req.body.content;

  console.log(`request body is: `, req.body);
  // ! return response
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: "Maximilian" },
      createdAt: new Date(),
    },
  });
};
```



## Setup a post model

377

```console
npm install --save mongoose
```

看到这里

need to look back to see how to setup mongoose database

