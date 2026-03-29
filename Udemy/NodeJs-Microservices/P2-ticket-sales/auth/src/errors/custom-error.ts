export abstract class CustomError extends Error {
  abstract statusCode: number;

  // abstract class cannot be instantiated, but can be extended by other classes, and those classes must implement the abstract methods and properties
  constructor(message: string){
    super(message);

    // only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
