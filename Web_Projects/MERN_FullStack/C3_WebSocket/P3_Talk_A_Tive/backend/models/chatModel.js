const mongoose = require("mongoose");

const chatModel = mongoose.schema(
  {
    chatName: { type: string, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, // this is managed by mongoose
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
