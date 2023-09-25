https://www.youtube.com/watch?v=FcxjCPeicvU&t=12944s

a private notes app
+ data is stored in MongoDB database
+ authentication using sessions & cookies
+ react bootstrap
+ in typescript

provides good basics for a simple fullstack project

other fullstack projects might include, check if you have time:
https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm
https://www.youtube.com/watch?v=k4lHXIzCEkM use material UI
https://www.youtube.com/watch?v=SuMRI_A8umQ&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=17



# Key takeaways

+ frontend, backend both needs model to confine the format of data
  + watch for data format when rendering them from the response get from backend
    + response needs to be unpacked to json format
    + json format data needs to be stringified to be rendered
+ React: pass className from outside to a component for cascading styling
+ here, axios is not used for communication but simply use `fetch()`





# Backend

## Project setup

### Node, Express, TS, Eslint setup



```js
npm install --save-dev typescript
npx tsc --init

npm i express
npm i --save-dev @types/express

npx tsc // compile ts to js, then you can run js file
node server.js
```

if version not compatible, you can just use versions in the video



in tsconfig file, add

```js
"outDir": "./dist", 
```

this will put compiled js file under directory dist



```js
// for easy run ts project
npm install --save-dev nodemon
npm install -D ts-node
npx nodemon src/server.ts	// 可以把这个写到script里  npm start
```

Eslint setup 39min-

```js
npm i -D eslint
npx eslint --init	// eslint config
```

```js
"lint": "eslint . --ext .ts"		// script for npm run lint: run eslint for checking
// 其实也可以用vscode的Eslint extension来让vscode自动检测, 不用手动run eslint了
```



### MongoDB Atlas + Mongoose setup

49min-

[Mongodb Atlas](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_apac-au_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas%20database&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624341&adgroup=115749705583&cq_cmp=12212624341&gad=1&gclid=Cj0KCQjwmICoBhDxARIsABXkXlIfA7m0maTdUlvIOg807o6P8KKIzqAaXz_kqPuUjdQ7f9HVy0aZHUQaAtB-EALw_wcB)

add ip address

create a mongodb cloud database 

Security config (a bit like Google API KEY setup)



connect MongoDB with your application

```js
npm i dotenv		// environment variable managing
npm i mongoose
npm i envalid		// enforcing environment variable type
```



server.ts

```ts
import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";

import app from "./app";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("server running on port: ", port);
    });
  })
  .catch(console.error);
```

app.ts

```ts
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("hello, world!");
  });

  export default app;
```

Util > validateEnv.ts

```ts
import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
});
```

.env

```ts
MONGO_CONNECTION_STRING=mongodb+srv://spoonlee24k:<your mongodb user password>@cluster0.yaihol6.mongodb.net/?retryWrites=true&w=majority
PORT=8080
```



### MongoDB model setup + Express error handling

https://mongoosejs.com/docs/documents.html



First we define model for database

```ts
// contains note model
import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,     // note capital S
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

export default model<Note>("Note", noteSchema)
```

Then in MongoDB Atlas webpage, just choose the connected db and mannually insert a record that obeys above model 



After that, we define following get request to retrieve the note model from db

```ts
import express, { NextFunction, Request, Response } from "express";

import NoteModel from "../model/note";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    // throw Error("blah!"); // simulate an error
    const notes = await NoteModel.find().exec(); // db query
    res.status(200).json(notes);
  } catch (error) {
    next(error); // forward to the next middleware
  }
});

app.use((req, res, next) => {
  next(Error("Endpoint not found!"));
});

// ! error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
```

Easy-peasy!





## Backend coding

1h40min-

### Routers, controllers & creating notes

改成server-app-router-controller 写法



server.ts

+ Environment variables 
+ database connection definition

```ts
import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";

import app from "./app";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("server running on port: ", port);
    });
  })
  .catch(console.error);

```

app.ts

+ regiser middlewares

```ts
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import noteRoutes from './routes/notes'

const app = express();

// middlewares
app.use(morgan("dev"));   // for logging
app.use(express.json());  // express accept json body, now we can send json to server

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(Error("Endpoint not found!"));
});

// ! error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
```

router > notes.ts

+ separation of responsibilities

```ts
import * as NotesController from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NotesController.getNotes); // not app.get() here

router.get("/:noteId", NotesController.getNote);     // get a single note

router.post("/", NotesController.createNote);

export default router;
```

controllers > notes.ts

+ Handling business logic. Just like Service in SpringBoot
+ `NoteModel` is like `SpringDataJPA`, a Facade to access database

```ts
import { RequestHandler } from "express";
import NoteModel from "../../model/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("blah!"); // simulate an error
    const notes = await NoteModel.find().exec(); // db query
    res.status(200).json(notes);
  } catch (error) {
    next(error); // forward to the next middleware
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await NoteModel.findById(noteId).exec();       //! like SpringDataJPA, a Facade to access database 
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const newNote = await NoteModel.create({   // ! like SpringDataJPA
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error); // pass to error handler
  }
};
```





:star: morgan 

---

```js
npm i morgan 	// for logging
npm i --save-dev @types/morgan  // need also downlaod ts type for this package
```

logging be like:

```shell
GET /api/notes/6501ab08c32b5dd187631917 200 35.260 ms - 81
GET /api/notes 200 25.110 ms - 436
```





### :bangbang: Express HTTP error handling

2h03min-

showing meaningful error message to front end is very crucial!

```ts
// use below package for convenience
npm i http-errors
npm i -D @types/http-errors
```



app.ts

+ Here, we use `createHttpError()` to convert the error message we captured to a more specific type of error
+ and we handle it and send error response back to front end

```ts
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import noteRoutes from './routes/notes'
import createHttpError, {isHttpError} from "http-errors";

const app = express();

// middlewares
app.use(morgan("dev"));   // for logging
app.use(express.json());  // express accept json body, now we can send json to server

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// ! error middleware: what is left is passed to here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
```



controller > notes.ts

+ we can use TS to confine the type of request body
+ Also, we use `createHttpError()` to throw more specific type of error and error message

```ts
import { RequestHandler } from "express";
import NoteModel from "../../model/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("blah!"); // simulate an error
    const notes = await NoteModel.find().exec(); // db query
    res.status(200).json(notes);
  } catch (error) {
    next(error); // forward to the next middleware
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      // validate user input
      throw createHttpError(400, "Invalid note id!");
    }

    const note = await NoteModel.findById(noteId).exec(); //! like SpringDataJPA, a Facade to access database

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  // used to confine request body type
  title?: string; // this can be optional
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title!");
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error); // pass to error handler
  }
};
```





### Update + delete notes (backend)

2h20min-



Controller > notes.ts

+ add 2 new endpoint
+ remember to register them in router > notes.ts

```ts
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string; // optional
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    // validate user input
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id!");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title!");
    }

    const note = await NoteModel.findById(noteId).exec(); // ! mongoose - just like spring data jpa
    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    note.title = newTitle;
    note.text = newText;

    const updateNote = await note.save(); // ! mongoose - just like spring data jpa
    // NoteModel.findByIdAndUpdate()  // this also works
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};



export const deleteNote: RequestHandler = async(req, res, next) => {
  const noteId = req.params.noteId;
  try{
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id!");
    }
    
    const note = await NoteModel.findById(noteId).exec();
    if(!note){
      throw createHttpError(404, "Note not found");
    }

    await note.deleteOne();
    // NoteModel.findByIdAndDelete()  // this also works
    res.sendStatus(204);  // !we are not sending json here, because front end would only need status code

  } catch (error) {
    next(error);
  }
}
```









# 2. Frontend

2h38min-



## 2.1 Project setup

### React setup with typescript

```ts
npx create-react-app frontend --template typescript
```



Intro to declarative UI programming



### Hello World 

bootstrap

https://react-bootstrap.netlify.app/docs/getting-started/introduction

after installing bootstrap, add below import in index.tsx, which is the entry file. Then, you can use default className defined by bootstrap out of the box

```ts
import 'bootstrap/dist/css/bootstrap.min.css';  
```



a hello world react app

```ts
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. 
        </p>
        <Button onClick={()=>setClickCount((prevCount)=>prevCount+1)}>
          clicked {clickCount} times
        </Button>
      </header>
    </div>
  );
}

export default App;
```





## 2.2 Frontend basics

### Fetching notes + proxy

2h58min-

model > note.ts

+ Front end also needs data model 

```ts
export interface Note {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}
```

app.tsx

+ useEffect for initial loading notes data from database 
  + attention to the format of data
    + useState<Note[]>
    + response.json()
    + JSON.stringify()

```ts
import React, { useState, useEffect } from "react";
import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {		// ! since we use proxy to set url
          method: "GET",
        });
        const notes = await response.json(); // as backend returns a json format response
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    // invoke
    loadNotes();
  }, []);

  return <div className="App">{JSON.stringify(notes)}</div>;
}

export default App;

```



sicne our frontend runs on localhost:3000 while backend runs on localhost:8080, CORS also needs to be considered

:bangbang: CORS is browser security setting, we can set it either:

+ use `CORS` package in backend if building public accessible service or
+  add `proxy: "http://localhost:8080"`  in package.json if build for private use (we go for this here)



### React components & CSS modules

---

3h14min-

app.ts

+ use bootstrap components and default className out of box. Just check bootstrap doc

```ts
import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json(); // as backend returns a json format response
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    // invoke
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
```

component > note.tsx

+ passing className from outside for `cascading styling `- a technique to improve customizability of a component
+ ts: confine props type

```ts
import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../util/formatDate";

interface NoteProps {
  note: NoteModel;
  className: string; // to allow outside to pass styles
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Update: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "created" + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>    {/* here cascading styling*/}
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
```

styling > 

```css
/*global.css --------------------------*/
body {
  margin: 0;
  background: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/*Note.module.css -------------------------*/
.noteCard{
    background-color: cornsilk;
}

.cardBody{
    overflow: hidden;
    mask-image: linear-gradient(180deg, #000 60%, transparent)
}

.cardText{
    white-space: pre-line;
}

/*NotePage.module.css ------------------*/
.note{
    min-height: 200px;
    max-height: 350px;
    min-width: 150px;
    transition: box-shadow .2s ease-in-out;
    cursor: pointer;
}

.note:hover{
    box-shadow: rgba(0,0,0,0.05) 0px 6px 24px 0px, rgba(0,0,0,0.08) 0px 0px 0px 1px;
}
```





## 2.3 :moon: Frontend CRUD

### Creating notes from frontend

3h50min- 

看到这里





### update + delete notes (frontend)





### Loading/error/empty states





# 3. Additionally

5h10min-7h50min

## User authentication with express - sessions & cookies





## Frontend authentication + extracting form field components





## Protecting users notes with auth middleware





## Routing with react-router-dom





## Handling different HTTP errors in React



