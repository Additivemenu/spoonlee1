const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Shawn",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  // ! validation on server
  const errors = validationResult(req);
  if (!errors.isEmpty()) {  // server validation failed
    return res
      .status(422)
      .json({
        message: "Validation failed, entered data is incorrect",
        errors: errors.array(),
      });
  }
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
