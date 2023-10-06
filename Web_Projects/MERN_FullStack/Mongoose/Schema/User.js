const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number!`,
    },
  },
  email: { type: String, minLength: 10, required: true, lowercase: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ! reference to another document in the same collection
  hobbies: [String], // array of strings,
  address: addressSchema,
});

// ! hooks ---------------------------------------------------
//  add a instance method to the schema
userSchema.methods.sayHi = function () {
  // ! note has to use real function, not arrow function
  console.log(`Hi, my name is ${this.name}`);
};

// customized static method, this is a function can be called upon User
userSchema.statics.findByName = function (name) {
  // ! note has to use real function, not arrow function
  return this.where({ name: new RegExp(name, "i") });
};

// customized chainable query method, note not a function, cannot call upon User
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// a virtual field of a user document
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// ! middleware -----------------------------------------------
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  throw new Error("failed to save!");
  next();
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

// 'User" collection
module.exports = mongoose.model("User", userSchema);
