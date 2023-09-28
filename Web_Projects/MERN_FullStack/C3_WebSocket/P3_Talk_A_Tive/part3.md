# Messaging

1.5 hrs



## Send message API (one-to-one, group-chat)

C13

server coding: REST APIs



<span style="color: yellow">sever.js</span>

```js
app.use("/api/message", messageRoutes);
```

<span style="color: yellow">messageRoute.js</span>

```js
const express = require("express");

const {protect} = require("../middlewares/authMiddleware")
const {sendMessage, allMessages} = require("../controllers/messageControllers")

const router = express.Router();

// /api/message
router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

module.exports = router;
```



Controllers > <span style="color: yellow">messageControllers.js</span>

+ send a message in a chat 
  + :bangbang: wait, where does the message is stored in the chat? - message has a field "chat" that's already referencing to the chat it belongs to (like a foreign key)

+ fetch all messages of a chat

```js
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");


// ========================================================================== 
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage); // ! DB
	
    // populate message's attributes 
    message = await message.populate("sender", "name pic"); // populate "sender"'s "name, pic" 
    message = await message.populate("chat"); // populate with "chat"'s all attributes
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
	
    // update other collections related
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
	
    // return message back 
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// ========================================================================== 
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }) // ! DB
      .populate("sender", "name pic email") // populate "sender"'s "name, pic, email" attributes
      .populate("chat"); // populate with "chat"'s all attributes

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
```



so far so good





## :moon: Single And Group Chat Message in React

C14

REST APIs

client coding: integrate with APIs in previous class: one-on-one chatting





<span style="color: yellow">SingleChat.js</span>

+ send a message in selected chat
+ Fetch all messages in selected chat



render messages 16min- 29min

+ <span style="color: yellow">ScrollableChat.js</span>

```js
npm i react-scrollable-feed
```

+ :bangbang: 根据message sender的不同， 进行不同的styling 与conditional rendering (还能这样!)





## :moon: Real Time Messaing  

C15

socket.io



now turn to group chatting



UP TO HERE







## Real Time Notification

C16

socket.io









# Deploy

C17

10min



deploying fullstack app to Render