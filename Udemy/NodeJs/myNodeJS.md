A good idea of learning: merge all your learning into a single app 

All lecture materials is in the last module of each class



:book: [node offical doc guide](https://nodejs.org/en/docs/guides)

:book: [node official api docs](https://nodejs.org/dist/latest/docs/api/)



## Course outline

Part1: node.js basics

| Class                      | Title                                                    | Description                                                  |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| C1                         | Course introduction                                      |                                                              |
| C2                         | Optional: JS refresher                                   |                                                              |
| [3](./C3/README.md)        | Understanding the basics                                 | vanilla node.js to build a simple server                     |
| [4](./C4/README.md)        | Improved Development Workflow and debugging              | npm <br/>nodemon <br>Global Features vs Core Modules vs Third-Party Modules <br>Debugger |
| :star: [5](./C5/README.md) | Working with Express.js                                  |                                                              |
| :star: [6](./C6/README.md) | Working with Dynamic Content & Adding Templating Engines |                                                              |
| :star: [7](./C7/README.md) | Modal View Controller (MVC)                              |                                                              |
| 8                          | Enchanting App                                           |                                                              |
| 9                          | Dynamic Routes &  Advanced Models                        |                                                              |

Part2: NodeJs with Database

| Class | Title                  | Description |
| ----- | ---------------------- | ----------- |
| 10    | Node + SQL             |             |
| 11    | Using Sequelize        |             |
| 12    | Node + NoSQL (MongoDB) |             |
| 13    | Using Mongoose         |             |

Part3: Security & Validations

| Class     | Title                    | Description |
| --------- | ------------------------ | ----------- |
| 14        | Sessions & cookies       |             |
| 15        | Athentication            |             |
| 16        | Sending E-Mails          |             |
| 17        | Authentication Deep Dive |             |
| :star: 18 | User Input Validation    |             |
| 19        | Error Handling           |             |

Part4: Some common API

| Class | Title                    | Description |
| ----- | ------------------------ | ----------- |
| 20    | File Uploads & Downloads |             |
| 21    | Pagination               |             |
| 22    | Async Requests           |             |
| 23    | Handling Payments        |             |

Part5: Modern Node.Js topic

| Class     | Title                                             | Description |
| --------- | ------------------------------------------------- | ----------- |
| :star: 24 | REST API basics                                   |             |
| :star: 25 | Advanced REST API Features: :gem: a practical app |             |
| 26        | Using async-await                                 |             |
| :star: 27 | Websocket & Socket.io                             |             |
| 28        | GraphQL (in parallel to REST API)                 |             |
| 29        | Deployment                                        |             |
| 30        | Node.js beyond web servers                        |             |
| :star: 31 | Node + TypeScript, Deno                           |             |
|           |                                                   |             |





## C1 Intro

what is Node.js?

A JavaScript Runtime, allows you to run JS not only on browser but also outside of browser, which giving more additional features e.g. file I/O.  Google for more on V8 engine



Join online community https://academind.com/community/



Installing Node.Js and creating our first app

```terminal
node myNodeJsApp.js		// run a js file
```



Understand the Role & Usage of Node.js

Node.Js is a JavaScript Runtime. You can use it for more than just server side code,  it can also be used for Utility Scripts, Build Tools ...

Node.Js's role in Web Development

+ Run server: create server & listen to incoming requests
+ Business logic: handle request, validate input, connect to database
+ Responses: return responses (Rendered HTML, JSON, ...)



Two mode of running node.js

+ REPL mode: just type "node" in terminal and run code interactively in terminal

+ Execute the file: write js in files 





