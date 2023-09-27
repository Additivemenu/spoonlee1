const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && // jwt token here
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization);

    try {
      // Bearer sfsafnwajejdanda
      token = req.headers.authorization.split(" ")[1]; // just take the token content
      console.log(token);

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      // ! attach the authenticated user to request
      req.user = await User.findById(decoded.id).select("-password"); // ! return user without password from db
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
