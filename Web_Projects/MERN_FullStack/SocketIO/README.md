Resources: 

https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=29s



# Key Takeaway

socket IO is to give server ability for initiating active messaging to client, not really for persistent connection (HTTP can also maintain persistent connection)



+ socket io needs implementation on both server and client side
+ concept of socket, room
  + a socket is per user, it is returned by server on "connection" to each client
    + a series of socekt methods: join, to, on, emit ...
    + Pass not only parameters, but also callbacks (similar to Java RMI)
  + by default, every client is in a room by its socket id
    + user can join as many rooms as he wants
+ socket io admin dashboard to monitor traffic in real-time
+ namesapce 
  + can seperate different connection logic







# pre-cursor

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="../script.js" type="module"></script>
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #message-container {
        width: 50%;
        height: 70vh;
        overflow-y: scroll;
        border: 1px solid black;
      }
      #form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .message-input-container {
        display: flex;
        align-items: center;
      }
      .room-input-container {
        display: flex;
        align-items: center;
      }
    </style>
    <title>Document</title>
  </head>
  <body>
    <!-- display -->
    <div id="message-container"></div>
    <!-- user input -->
    <form id="form">
      <div class="message-input-container">
        <label for="message-input">Message</label>
        <input type="text" id="message-input" />
        <button type="submit" id="send-button">Send</button>
      </div>

      <div class="room-input-container">
        <label for="room-input">Room</label>
        <input type="text" id="room-input" />
        <button type="button" id="room-button">Join</button>
      </div>
    </form>
  </body>
</html>
```

script.js

```js
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}
```



note we used snowpack for build project

```json
{
  "name": "client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "snowpack dev",
    "build": "snowpack build",
    "preview": "snowpack build && snowpack dev"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "socket.io-client": "^4.7.2"
  },
  "devDependencies": {
    "snowpack": "^3.8.8"
  }
}
```

To start the project, run `npm start` , it will use port 8080 by default







# 1. socket io basics

socket io: keep persistent connection between client and server



## io & socket

Client: script.js

+ `socket.on()` is like a persistent listening 
+ `socket.emit()` is like an active, transient action

```js
import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

// ! ---------------------------------------------
const socket = io("http://localhost:8080"); // ! get the socket object from the server
socket.on("connect", () => {
  // runs when the client connects to the server
  displayMessage(`You are connected, socket id: ${socket.id}`);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});
// ! ---------------------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);
  socket.emit("send-message", message);   // ! 

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

// display a message in display area
function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

```



Server: server.js

+ `io`, `socket` meaning

+ `io.emit()`
+ `socket.broadcast.emit()`

```js
const io = require("socket.io")(8080, {
  cors: {
    origin: "*", // accept all origins
    methods: ["GET", "POST"],
  },
});

// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
  // ! so code in this callback is per user since socket is per user
  console.log("New User Connected", `, socket id: ${socket.id}`);

  socket.on("send-message", (message) => {
    // io.emit("receive-message", `server received message: ${message}`);  // ! io.emit() sends to all users
    socket.broadcast.emit("receive-message", `server received message: ${message}`) // ! socket.broadcast.emit() sends to all users except the sender
    console.log("client just sent a message: ", message);
  });
});

```





## rooms

by default every socket is in a room by its id



client > script.js

```js
import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

// ! ---------------------------------------------
const socket = io("http://localhost:8080"); // ! get the socket object from the server
socket.on("connect", () => {
  // runs when the client connects to the server
  displayMessage(`You are connected, socket id: ${socket.id}`);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});
// ! ---------------------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);
  socket.emit("send-message", message, room);   // ! send message to room 

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  socket.emit('join-room', room)
});

// display a message in display area
function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

```



server.js

+ a user can join a room by `socket.join()`
  + a user can join as many rooms as he/she wants
+ it is possible to point to a room by `socket.to()`

```js
const io = require("socket.io")(8080, {
  cors: {
    origin: "*", // accept all origins
    methods: ["GET", "POST"],
  },
});

// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
  // ! so code in this callback is per user since socket is per user
  console.log("New User Connected", `, socket id: ${socket.id}`);

  socket.on("send-message", (message, room) => {
    if (room === "") {
      // no room specified, send message to all users except the sender
      socket.broadcast.emit(
        "receive-message",
        `no room, server received message: ${message}`
      );
    } else {
      // for a targeted room, send message to all users in the room except the sender
      socket
        .to(room)
        .emit(
          "receive-message",
          `there is a room ${room},  server received message: ${message}`
        );
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

```



## :bangbang: emit callback

15min-

在前面code的基础上



script.js

+ pass a callback to server to allow server to directly manipulates client's component or states

```js
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  // ! here we pass a callback to server, but note it has to be the last argument
  socket.emit("join-room", room, (message) => {   
    displayMessage(message);
  });
});
```

server.js

+ server can invoke the callback passed, it works like a remote method invocation in Java

```js
// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
	// ... other codes

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`); // ! display message: `Joined ${room}` in frontend, like a remote method invocation
  });
});
```





# 2. More advanced feature 



## :moon: Admin dashboard

17min-

```js
npm i @socket.io/admin-ui
```

Make sure your CORS setting: 

```js
const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
//...
});

instrument(io, { auth: false });
```

now, visit 

```shell
https://admin.socket.io
```

to check everything about the socket io on server in real-time





## :question: Custom namespace

20min-



Server.js

+ it is also possible to have different endpoints for socket io (namespace):
  + "`http://localhost:3000" for default name space
  + "http://localhost:3000/user" for user name space

+ On client side, we can also pass authentication info on connection  with server

```js
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// /user nameSapce ---------------------------------------------
const userIo = io.of("/user"); // ! create a namespace
userIo.on("connection", (socket) => {
  console.log("connected to /user namespace with username: " + socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("Please send token"));
  }
});

function getUsernameFromToken(token) {
  return token;
}

// deafult namespace ---------------------------------------------
// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
  // ! so code in this callback is per user since socket is per user
  console.log("New User Connected", `, socket id: ${socket.id}`);

  socket.on("send-message", (message, room) => {
    if (room === "") {
      // no room specified, send message to all users except the sender
      socket.broadcast.emit(
        "receive-message",
        `no room, server received message: ${message}`
      );
    } else {
      // for a targeted room, send message to all users in the room except the sender
      socket
        .to(room)
        .emit(
          "receive-message",
          `there is a room ${room},  server received message: ${message}`
        );
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`); // ! display message: `Joined ${room}` in frontend, like a remote method invocation
  });

});

instrument(io, { auth: false });

```





client > script.js

+ here for `/user` nameSpace, we also pass a token on connection

```js
import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

// ! socket io-------------------------------------------------------------
// normal nameSpace ---------------
const socket = io("http://localhost:3000"); // ! get the socket object from the server
socket.on("connect", () => {
  // runs when the client connects to the server
  displayMessage(`You are connected, socket id: ${socket.id}`);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});

// /user namesapce ----------------
// get the socket object from the server, corresponding to `userIo.on("connection", ()=>{})` on server
// we can also attach a token to the handshake on connection, so that the server can verify the user
const userSocket = io("http://localhost:3000/user", {
  auth: { token: "Test" },
});
userSocket.on("connect_error", (err) => {
  displayMessage(err.message);
});
// ! --------------------------------------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);
  socket.emit("send-message", message, room); // ! send message to room

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  // ! here we pass a callback to server, but note it has to be the last argument
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});

// display a message in display area
function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}
```





chatGPT

---

In the provided script, two namespaces are defined: a general/default namespace and a custom namespace `/user`. Here's a breakdown of their relationship and their distinct roles:

1. **Default Namespace (`/`)**:
   The default namespace is where general connections to the Socket.IO server are handled. When clients connect to the server without specifying a namespace, they are connected to this default namespace. Event handlers within this namespace, such as those for `send-message` and `join-room`, apply to all connections within this namespace.

```javascript
io.on("connection", (socket) => {
    // Event handlers and logic for the default namespace
});
```

2. **User Namespace (`/user`)**:
   The `/user` namespace is a custom namespace that you have defined to handle a specific subset of connections. In this case, it appears to be designed for connections related to user interactions. Clients must specify this namespace when connecting to be handled within its context. Event handlers and middleware defined within this namespace only apply to connections within this namespace.

```javascript
const userIo = io.of("/user");
userIo.on("connection", (socket) => {
    // Event handlers and logic for the /user namespace
});
```

3. **Relationship**:
   - **Separation of Concerns**: By defining these two namespaces, you are logically separating different types of connections and their handling. This promotes a cleaner, more organized code structure, and allows for separation of concerns between general and user-specific connection handling.
   - **Independent Handling**: Each namespace operates independently. The event handlers, middleware, and logic defined within one namespace do not apply to the other. This independence allows for modular handling of different types of connections.
   - **Shared Server Instance**: Both namespaces are tied to the same Socket.IO server instance (`io`). This shared server instance facilitates common configurations like the CORS settings, but each namespace can have its own unique configurations and handlers.
   - **Potential for Shared Logic**: While the namespaces operate independently, they share the same server instance, which means that if needed, you could implement shared logic at the server level that applies to both namespaces.

In summary, the relationship between the two namespaces is that they provide a mechanism for organizing and handling different types of socket connections in a modular and independent manner, while still sharing the same underlying Socket.IO server instance.





## Disconnect & re-connect



Server.js

```js
// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
	// other socket methods...

  socket.on("ping", (n) => console.log(n));
});
```





Client > script.js

+ by default, socket io store all states when disconnected, when you re-connected to the server, it will send all the states back to you at once

```js
// other client code...

// socket connect disconnect demo ---------------------------------------------
let count = 0;
setInterval(() => {
  socket.emit("ping", ++count);
}, 1000); 

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;

  if (['c', 'C'].includes(e.key)) socket.connect();
  if (['d', 'D'].includes(e.key)) socket.disconnect();
});
```

```console
// on server side: 
1
2
3
// disconnect for 3 seconds, then reconnect 4, 5, 6 are sent at once
4
5
6  
7
```



to disable this storing behaviour, use `socket.volatile.emit()` 

```js
// other client code...

// socket connect disconnect demo ---------------------------------------------
let count = 0;
setInterval(() => {
  socket.volatile.emit("ping", ++count);
}, 1000); 

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;

  if (['c', 'C'].includes(e.key)) socket.connect();
  if (['d', 'D'].includes(e.key)) socket.disconnect();
});
```

```console
// on server side: 
1
2
3
// disconnect for 3 seconds, then reconnect 4, 5, 6 are not stored
7
```

