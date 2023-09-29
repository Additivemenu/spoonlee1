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

涉及2个API的调用:

+ send a message in selected chat
+ Fetch all messages in selected chat



render messages 16min- 29min

+ <span style="color: yellow">ScrollableChat.js</span>

```js
npm i react-scrollable-feed
```

+ :bangbang: 根据message sender的不同， 进行不同的styling 与conditional rendering (还能这样!)





## :bangbang: Real Time Messaing  

C15

socket.io

https://socket.io/

server + client closely intertwine

+ in client side, socket io code is intertwine with REST APIs  handler. Handler or useEffect() logics really matters!
+ in server side, socket io code is decouped from REST APIs
  + by using `socket.on()` `socket.emit()` , client and server can communicate bidirectionally 



backend

```js
npm install socket.io
```





frontend

```js
npm i socket.io-client
```





---

以下对应

```js
io.on("connection", (socket) => {
	// socket io api 1
  
  // socket io api 2
});
```





+ socket io server set up 2-4min
  + note we set a timeout to socket
+ socket io client set up 4-10min 
  + <span style="color: yellow">SingleChat.js</span>
+ :bangbang: join a chat 10-12min
+ :bangbang: real time messaging 12min-21min
  + previously, our messaging is not in real-time, a user has to refresh the page to trigger useEffect in SingleChat.js to re-fetch all chat messages in selected chat. This is an active request from client. We now need the server to push the new messages to all other users actively. 
  + 类似observer pattern, sender 1st send a message to server then server emit that message to all other users in the chat ( observer list registed by joining a chat)

+ Real time typing visual feedback 21min-
  + other users can see the opposite is typing
  + add animation to loading visual feedback 29min-[lottie web]( https://lottiefiles.com/search?q=typing&category=animations) => not important, not include in code











## Real Time Notification

C16

socket.io



when user not selecting any chats, someone send a message to the user, the user should be notified in real-time. Similar in real-time chatting, when someone send a message to server, server immediately emit that message to other users 









# Deploy

C17

10min



deploying fullstack app to Render