const mongoose = require("mongoose");
const User = require("./Schema/User"); // import User model

mongoose.connect("mongodb://localhost/testdb");

async function createUser() {
  try {
    const user = await User.create({
      // ! User.create() go through schema validation, but some methods do not
      name: "shawn",
      age: 26,
      email: "TEST@gmail.com",
      hobbies: ["Weight Lifting", "Bowling"],
      address: {
        street: "123 Fake St",
        city: "Boston",
      },
    }); // create a user document in the User collection
    console.log(user);
    
  } catch (err) {
    console.log(err.message);
  }
}

async function getUser() {
  try {
    const users = await User.findById("6517b63b2aa1d45e2dabb3c2");
    console.log(users);

    const user2 = await User.exists({ name: "shawn" });
    console.log(user2);

    const user3 = await User.where("name")
      .equals("shawn")
      .where("age")
      .gte(26)
      .populate("bestFriend") // like doing a join
      .limit(1);

    await user3[0].save();

    console.log(user3);


    user3[0].sayHi();
  } catch (err) {
    console.log(err.message);
  }
}

// createUser();
getUser();
