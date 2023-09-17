import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import noteRoutes from './routes/notes'

const app = express();

// middlewares
app.use(morgan("dev"));   // for logging
app.use(express.json());  // express accept json body, now we can send json to server

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(Error("Endpoint not found!"));
});

// ! error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
