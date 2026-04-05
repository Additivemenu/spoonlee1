import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  // https://expressjs.com/en/guide/error-handling.html
  // in async handler, without express-async-errors,
  // we need to pass the error to next function so that downstream middleware can catch it
  // next(new NotFoundError());

  // in async handler, with express-async-errors,
  // we just throw error as normal,
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  // this will connect to service name defined in auth-mongo-depl.yaml
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Successfully Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

// some node versions do not support top-level await, so we need to wrap it in a function and
start();
