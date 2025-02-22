const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // persist comment
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // ! send an event to event bus, this will change information in other services
  await axios.post("http:localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    // ! update the comment status data
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    commentsByPostId[postId] = comments;

    // emit a new event to the event bus
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
        },
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comment service is listening on 4001");
});
