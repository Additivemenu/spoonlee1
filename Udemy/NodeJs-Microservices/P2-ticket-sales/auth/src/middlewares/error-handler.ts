import e, { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { CustomError } from "../errors/custom-error";

/**
 * ! also error normaliser, so could have consistent error response format
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // all errors that we throw in our code should be instances of CustomError, so that we can handle them in a consistent way, and return a consistent error response format to the client
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: err.message || "Something went wrong",
      },
    ],
  });
};
