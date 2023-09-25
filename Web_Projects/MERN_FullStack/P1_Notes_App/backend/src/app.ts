import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import noteRoutes from './routes/notes'
import createHttpError, {isHttpError} from "http-errors";

const app = express();

// middlewares
app.use(morgan("dev"));   // for logging
app.use(express.json());  // express accept json body, now we can send json to server

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// ! error middleware: what is left is passed to here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
