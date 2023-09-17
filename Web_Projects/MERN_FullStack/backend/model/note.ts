// contains note model
import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(   // ! this is a mongoose schema!
  {
    title: {
      type: String, // note capital S
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

// ts
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
