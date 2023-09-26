https://www.youtube.com/watch?v=3vRcB0P84t4&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf

mainly to learn mongoDB and web socket (socket io)





# Key Takeaways

Server

+ MongoDB schema
+ Connect MongoDB



Client

+ React Router

+ Chakra UI lib

  





# 1. Intro

## App demo

C1

## What is MERN 

C2



https://www.mongodb.com/zh-cn/nosql-explained/nosql-vs-sql



# 2. Basics

1hrs

## Environment setup

VScode extension

```ts
auto rename tag
Bracket Pair Colorizer 2
ES7 React snippets
JavaScript (ES6) code snippets
```



## Server startup

C4

```ts
npm i dotenv		// for .env
```

Server.js

```js
const express = require("express");
const { chats } = require("./data/data");  // see data.js, some dummy data
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id)
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));

```





## Client startup

C5

https://chakra-ui.com/

:bangbang: 似乎这个ui lib 比视频做的时候有很多更新... 可能会有兼容性问题, 可能也是为什么他给的code npm install不成功



```js
npm i react-router-dom@5
```

index.js

+ wrap "<App/>" with `ChakraProvider` , `BrowserRouter`  to enable Chakra UI and React Router

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

App.js

```js
import "./App.css";
import { Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/chats" component={ChatPage}/>
    </div>
  );
}

export default App;

```

Pages> HomePage.js

```js
import React from 'react'

const HomePage = () => {
  return (
    <div>
      Home
    </div>
  )
}

export default HomePage
```

Pages > ChatPage.js

+ 同理需要config CORS, 这里选择在front end package.json 里加`  "proxy": "http://127.0.0.1:8081",  `

```js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    console.log(data);

    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
```



so far so good!



## Defining Schema and Models with mongoose

C6

```js
 npm i mongoose
```

Backend: 

models > chatModel.js

```js
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
```

Models: messageModel.js

```js
const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
```

models: userModel.js

```js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
```



## Login and Signup Form

C7

App.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Work+Sans:wght@300&display=swap');

.App{
  min-height: 100vh;
  display: flex;
  background-image: url("./Assets/background.png");
  background-size: cover;
  background-position: center;
  color: black;
}
```





HomePage.js

https://chakra-ui.com/docs/components/container/usage

+ use of Chakra UI components
  + config styling directly in the component props

```js
import React from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          textAlign="center"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
```

Components > Auth > Login.js

```js
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const clickHanlder = () => {
    setShow((prev) => !prev);
  };

  const submitHandler = () => {};

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={clickHanlder}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
```





Components > Auth > SignUp.js

```js
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const postDetails = (pics) => {};

  const submitHandler = () => {};

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
```





## Connect MongoDB to Server

C8

```js
npm i mongoose
npm i colors // for coloring console.log() in terminal
```





MongoDB Atlas setup: database, user, user's password (for constructing URI accessing database)

.env

```env
PORT=8081
MONGO_URI="mongodb+srv://spoonlee24k:<password here!!>@cluster0.lw9ymvn.mongodb.net/?retryWrites=true&w=majority"
```



backend > config > db.js

```js
const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error when connecting with MongoDB: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
```

app.js

```ts
const app = express();
dotenv.config();
connectDB();			// invoke after dotenv 
```









# 3. Advanced 

C9-C12

3hrs 



## User Authentication

C9





## Search User and Create chat APIs

C10



## Build Chat Page UI

C11



## Group chat UI

C12



# 4. Messaging

2 hrs

## Send message API (one-to-one, group-chat)

C13



## SIngle And Group Chat Message in React

C14



## Real Time Messaing and notification

C15, 16



# 5. Deploy

C17
