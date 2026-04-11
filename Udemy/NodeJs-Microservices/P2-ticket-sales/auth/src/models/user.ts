import mongoose from "mongoose";
import { Password } from "../services/password";

// * 1. TypeScript does not know the shape of user document, so we need to define an interface for it
//* 2. UserAttrs is the interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

//! an interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

/**
 * finally the schema
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String, // type to mongoose, not to typescript
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// mongoose hook, this will run before saving a user document to database
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  // in newer mongoose versions, no need to call done() when using async/await without the callback parameter
});

//! attaching a custom static method to create new user with type checking for the attributes
userSchema.statics.build = (attrs: UserAttrs) => {
  //! note new User() will not do type check on schema shape
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
