const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const generateToken = require("../config/generateToken");

// do a step, then check error,
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // ! validate input from req
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields!");
  }

  const userExists = await User.findOne({ email }); // ! database manipulation: check if user exist
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    // ! Database Manipulateion: create user
    name,
    email,
    password,
    pic,
  });

  if (user) {
    // return response to client
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});   // ! database manipulation

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
