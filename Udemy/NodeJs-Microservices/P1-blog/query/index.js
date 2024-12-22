const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // contains a list of full post with all comments associated

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // assemble the data structure
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content });
  }

  console.log("query service - current posts:", posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("Query Service listening on 4002");
});
