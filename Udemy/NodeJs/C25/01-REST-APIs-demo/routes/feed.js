const express = require("express");
const { check } = require("express-validator");

const feedController = require("../controller/feed");

const router = express.Router();

// GET /feed/posts: get all posts
router.get("/posts", feedController.getPosts);

// create a post
router.post(
  "/post",
  [
    check("title").trim().isLength({ min: 5 }),   // ! server validation
    check("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = router;
