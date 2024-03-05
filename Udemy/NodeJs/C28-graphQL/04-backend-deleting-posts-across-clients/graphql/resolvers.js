const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.export = {
  // args is obj that containers all the args that are passed to the createUser mutation schema
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error; // error handling in future course
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);

    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
};
