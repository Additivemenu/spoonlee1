1.5hrs



# 1. Chat but not in real-time

After building the general UI, now we turn to the core business logic of a chat-app: messaging. 

+ but before we build a real-time chat-app, we firstly built a chat app that allows users to 
  + send message in selected chat (and persist message to DB)
  + fetch all messages of the selected chat



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





# 2. Real-time chat

Previously, our messaging is not in real-time, a user has to refresh the page to trigger useEffect in SingleChat.js to re-fetch all chat messages in selected chat. This is an active request from client. We now need the server to push the new messages to all other users actively. 

On top of section1, now we are able to add some event-driven 2-way communication mechanisms to build a real-time chat app, leveraging socket IO. 

本质上还是observer pattern, 讲究一个接化发:

```js
1. userA send a message to server 
2. server emit that message to all other users in the observer List registered previously
3. other user receive emitted message and use that data to do something 
```

:star: 至此, 总结react state常分为: 

```js
1. Item list that contains a list of item to be rendered
2. boolean state indicating whether a process is going on (e.g. isLoading, isModalOpen)
3. a single object or value that represents user's input to App
	3.1 input bar's text input
  3.2 a object or item in UI that user selected (e.g. selectedChat)
4. boolean state acts as a switch or trigger to an action (e.g. fetchAgain)

```

:pencil: [common react states](./sub_topics/reactStatesPattern.md)





## 2.1 :bangbang: Real Time Messaing  

C15

socket.io

https://socket.io/

server + client closely intertwine

+ in client side, socket io code is intertwine with REST APIs  handler. Handler or useEffect() logics really matters!
+ in server side, socket io code is decouped from REST APIs
  + by using `socket.on()` `socket.emit()` , client and server can communicate bidirectionally 





### timeline

+ socket io server set up 2-4min
  + note we set a timeout to socket
+ socket io client set up 4-10min 
  + <span style="color: yellow">SingleChat.js</span>
+ :bangbang: join a chat 10-12min
+ :bangbang: real time messaging 12min-21min
  + 类似observer pattern, sender firstly send a message to server then server emit that message to all other users in the chat ( observer list registed by joining a chat)

+ Real time typing visual feedback 21min-
  + other users can see the opposite is typing
  + add animation to loading visual feedback 29min-[lottie web]( https://lottiefiles.com/search?q=typing&category=animations) => not important, not include in code





### backend

```js
npm install socket.io
```



简言之, 几乎所有socket io 的API都写在以下结构里, 和REST APIs 写法在server上decouple, 但在client上会有一定程度couping (通常在handler, useEffect()里)

```js
io.on("connection", (socket) => {
	// socket io api 1
  
  // socket io api 2
});
```





<span style="color: yellow">server.js</span>

```js
const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const colors = require("colors"); // coloring console.log() in terminal

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // !tell server to access json data

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler); // ! general error handler

const PORT = process.env.PORT || 8080;
const server = app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}`.yellow.bold)
);

// ! socket io =============================================== //
const io = require("socket.io")(server, {
  pingTimeout: 3600000,
  cors: {
    origin: "http://localhost:3000", //
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");

  // respond to client's setup event:
  socket.on("setup", (userData) => {
    // userData is the logged-in user from frontend
    socket.join(userData._id);
    console.log(`a user ${userData._id} is connected to socket io`.yellow.bold);
    socket.emit("connected");
  });

  socket.on("join chat", (chatRoom) => {
    socket.join(chatRoom); // ! like get registered in the observer list
    console.log(`a user joined room ${chatRoom}`.red.bold);
  });

  socket.on("typing", (chatRoom) => {
    socket.to(chatRoom).emit("typing");
  });
  socket.on("stop typing", (chatRoom) => {
    socket.in(chatRoom).emit("stop typing");
  });

  // ! 接化发new message -------------------------------------------------------- //
  socket.on("new message", (newMessageReceived) => {
    // newMessageReceived is the message sent from frontend
    let chat = newMessageReceived.chat;
    if (!chat.users) {
      console.log("chat.users is undefined");
      return;
    }

    // send message to all users in the chat except the sender
    console.log(
      `${newMessageReceived.sender._id} sent a message to chat ${chat._id}}, now emit it to other users for real-time chat`
        .yellow.bold
    );
    chat.users.forEach((user) => {
      // like loop over the observer list
      if (user._id === newMessageReceived.sender._id) {
        return; // skip the sender
      }
      socket.in(user._id).emit("message received", newMessageReceived); // ! select a user then send message to that user
    });
  });

  // turn off socket if user leave
  socket.off("setup", ()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
});
```







### frontend

```js
npm i socket.io-client
```

too many code, not shown, but mainly falls onto <span style="color: yellow">SingleChat.js</span> handlers and useEffect()













## 2.2 Real Time Notification

C16

socket.io



when user not selecting any chats, someone send a message to the user, the user should be notified in real-time. Similar in real-time chatting, when someone send a message to server, server immediately emit that message to other users 

+ <span style="color: yellow">SingleChat.js</span>
  + Notification Message logic 
+ <span style="color: yellow">SideDrawer.js</span> => alert icon on top right
  + Notification rendering in UI  5min-13min
  + Notification indicator
    + 貌似depedency 和react 18不兼容, not implement in code 





# 3. Deploy

C17

10min



deploying fullstack app to Render