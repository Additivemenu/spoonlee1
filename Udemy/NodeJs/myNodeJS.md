A good idea of learning: merge all your learning into a single app 

All lecture materials is in the last module of each class



:book: [node offical doc guide](https://nodejs.org/en/docs/guides)

:book: [node official api docs](https://nodejs.org/dist/latest/docs/api/)



## Course outline

:bangbang: [JavaScript basics](./JS/README.md)



40h in total

most classes is between 1h~2h

先集中看RESTful API那块



Part1: node.js basics (server-side rendering)

| Class               | Title                                                    | Description                                                  |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| C1                  | Course introduction                                      |                                                              |
| C2                  | Optional: JS refresher                                   |                                                              |
| [3](./C3/README.md) | Understanding the basics                                 | vanilla node.js to build a simple server                     |
| [4](./C4/README.md) | Improved Development Workflow and debugging              | npm <br/>nodemon <br>Global Features vs Core Modules vs Third-Party Modules <br>Debugger |
| [5](./C5/README.md) | :star::star:Working with Express.js                      | middleware <br>router                                        |
| [6](./C6/README.md) | Working with Dynamic Content & Adding Templating Engines | MVC中的View <br>EJS,  similar to Jinja in python <br>pass argument to template from router |
| [7](./C7/README.md) | :star: Modal View Controller (MVC)                       | server side rendering <br>app -> router -> controller -> model <br>:bangbang: callback本质: 和Strategy Pattern很像 |
| [8](./C8/README.md) | Optional: Enchanting App                                 | a practice class                                             |
| [9](./C9/README.md) | Dynamic Routes &  Advanced Models                        |                                                              |

Part2: NodeJs with Database

| Class                 | Title                  | Description |
| --------------------- | ---------------------- | ----------- |
| [10](./C10/README.md) | Node + SQL             |             |
| [11](./C11/README.md) | Using Sequelize        |             |
| [12](./C12/README.md) | Node + NoSQL (MongoDB) |             |
| [13](./C13/README.md) | Using Mongoose         |             |

Part3: Security & Validations

| Class     | Title                    | Description |
| --------- | ------------------------ | ----------- |
| 14        | Sessions & cookies       |             |
| 15        | Athentication            |             |
| 16        | Sending E-Mails          |             |
| 17        | Authentication Deep Dive |             |
| :star: 18 | User Input Validation    |             |
| :star: 19 | Error Handling           |             |

Part4: Some common API 

| Class     | Title                    | Description |
| --------- | ------------------------ | ----------- |
| 20        | File Uploads & Downloads |             |
| 21        | Pagination               |             |
| :star: 22 | Async Requests           |             |
| 23        | Handling Payments        |             |

:bangbang: Part5: Modern Node.Js topic

+ REST API
+ socket io
+ GraphQL
+ Testing
+ Typescript & NodeJs
+ Deno

| Class                         | Title                                                        | Description                  |
| ----------------------------- | ------------------------------------------------------------ | ---------------------------- |
| [24](./C24/README.md)         | :star::star: REST API basics                                 | decouping Frontend & Backend |
| [25](./C25/README.md)         | :star::star: Advanced REST API Features: :gem: a practical app |                              |
| [26](./C26/README.md)         | Using async-await                                            |                              |
| [27](./C27/README.md)         | :star: Websocket & Socket.io                                 |                              |
| [28](./C28-graphQL/README.md) | :star: GraphQL (in parallel to REST API)                     |                              |
| [29](./C29/README.md)         | Deploying our App                                            |                              |
| 30                            | :bangbang: Testing Node.js                                   |                              |
| 31                            | Node.js as building tool & using npm                         |                              |



Modern Node.js

| Class | Title                      | Description |
| ----- | -------------------------- | ----------- |
| 32    | Modern Javascript & Nodejs |             |
| 33    | :star: NodeJS & Typescript |             |
| 34    | An introduction to Deno    |             |
| 35    | Deno CRUD & Database       |             |



## :bangbang: Demos

:gem: [demos](./GPT_demo/README.md)



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





