C28 GraphQL



REST on Steroids



# Intro



+ what is 
+ GraphQL vs REST
+ how to use GraphQL



what is GraphQL?

REST API: stateless, client-independent API for exchanging data

GraphQL API: stateless, client-independent API for exchanging data with higher query flexibility



REST API limitations: data format returned from a REST API is fixed

+ We may just want a part of the info extract from a REST API 
  + Solution1:  create more REST API endpoint => lots of endpoints => not flexible, hard to maintain
  + Solution2: add query parameters => API becomes hard to understand
  + Solution3: use GraphQL



How does GraphQL work?

graphQL query is similar to database query language, just declare the data structure should be returned

+ single endpoint if using graphQL (POST/graphql)

<img src="./src_md/graphql-intro1.png" style="zoom:50%;" />



graphQL Analogy to REST apis

use POST because Request Body defines Data Structure of retrieved data (the data should be returned)

+ Type definition
+ Query
+ Mutation
+ Subscription
+ ...

<img src="./src_md/graphql-intro2.png" style="zoom:50%;" />



+ server-side resolver analyses request body, fetches and prepares and returns data

<img src="./src_md/graphql-intro3.png" style="zoom:50%;" />







# Hands-on



## setup

learn more GraphQL at https://graphql.org

```shell
npm i --save graphql express-graphql
```



:gem: ​Hello world demo

```js
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const { graphqlHTTP } = require("express-graphql"); // To expose our graphql endpoint to public
const { buildSchema } = require("graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

const app = express();

// middleware for response headers ---------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// middleware for graphql -------------------------
const schema = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    schema {
        query: RootQuery
    }
`);

// Root resolver
const root = {
  hello: () => {
    return {
      text: "Hello World!",
      views: 1245,
    };
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables the GraphiQL interface
  })
);

// middleware for handling errors -----------------
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(8080);
```



vist server address at browser to check on graphQL interface



## Mutation

### Defining a Mutation Schema



```js
const { buildSchema } = require("graphql");

module.export = buildSchema(`

    type Post{
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User{
        _id: ID!
        email: String!
        name: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserInputData{
        email: String!
        name: String!
        password: String!
    }

    type RootMutation{
        createUser(userInput: UserInputData): User!
    }

    schema{
        mutation: RootMutation
    }
`);
```



### Adding a Mutation Resolver

up here

