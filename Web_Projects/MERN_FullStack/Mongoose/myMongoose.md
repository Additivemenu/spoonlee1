Mongoose



+ [Bilibli: 20分钟掌握MongoDB](https://www.bilibili.com/video/BV16u4y1y7Fm/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=c6866d088ad067762877e4b6b23ab9df)





# 1. Database Design 

:gem: ​[Database design: from SQL to No-SQL](https://medium.com/tech-tajawal/nosql-modeling-database-structuring-part-ii-4c364c4bc17a)

+ entity relational diagram is still applicable in No-SQL database design 
+ 1:M relationship, M:M relationship



a few key steps when designing No-SQL document-based database

---

Step1: Understand the Data Access Patterns

- **Identify the queries**: Understand how the application interacts with the database. What kind of queries are most frequent? This understanding will guide the structuring of documents in MongoDB.
- **Analyze read/write operations**: Determine which operations are more common in your application (read-heavy, write-heavy, or balanced) to optimize the schema accordingly.



Step2: Consolidate Entities into Documents

- **Single Collection**: In many cases, related entities can be nested within a single document. For example, if you have a `Users` table and an `Addresses` table, you might embed address information directly within a user document.
- **Reference**: For data that is frequently updated or needs to remain very flexible, you might keep separate documents and use references (similar to foreign keys in SQL) to link them.



Step3: Model Relationships

- **One-to-One**: Can be embedded directly within a document if the data is accessed together frequently.
- **One-to-Many**: For small datasets, the 'many' side can be <span style="color:yellow">embedded</span> within the 'one' side's document. For larger datasets, consider using references from the 'many' side to the 'one' side.
- **Many-to-Many**: Typically modeled with <span style="color:yellow">references,</span> where each document on both sides of the relationship contains references to the related documents on the other side.



When modeling relationships in MongoDB, which is a NoSQL document database, you generally deal with two types of relationships: One-to-Many (1:M) and Many-to-Many (M:M). Each has its own considerations and best practices for efficient data modeling and retrieval.





## 1.1 1:M Relationships

In 1:M relationships, a single document from one collection (the "one" side) is related to multiple documents from another collection (the "many" side). There are two main ways to model 1:M relationships in MongoDB:

1. **Embedding** (<span style="color:yellow">sacrifice space to save time, good read performance</span>): The "many" side documents are embedded directly within the "one" side document as an array of sub-documents. This approach is efficient for querying and maintaining atomicity but can be limited by the maximum document size in MongoDB (currently 16MB). It's best used when the number of "many" side documents is relatively small and not expected to grow unbounded. 

    ```json
    {
      "_id": 1,
      "name": "Alice",
      "posts": [
        { "title": "Post 1", "content": "Content 1" },
        { "title": "Post 2", "content": "Content 2" }
      ]
    }
    ```

2. **Referencing** (<span style="color: yellow">sacrifice time to save space, also more flexible and scalable</span>): The "one" side document holds references (usually the IDs) to the "many" side documents. This approach is more flexible and can handle a large number of related documents without worrying about document size limits. However, it may require additional queries to retrieve the related documents.

    ```json
    {
      "_id": 1,
      "name": "Alice",
      "postIds": [123, 456]
    }
    ```



Sure! In Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js, you can handle 1:M relationships in several ways, depending on whether you're using embedding or referencing to model the relationship. Below, I'll give examples of both approaches for a 1:M relationship, such as a User having many Posts.



### :gem: e.g.​ User-Post

Querying with Referencing

---

User Model

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  // Other fields...
});

const User = mongoose.model('User', userSchema);
```

Post Model (Referencing)

```javascript
const postSchema = new Schema({
  title: String,
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // Other fields...
});

const Post = mongoose.model('Post', postSchema);
```

### 

To find all posts for a specific user using referencing, you would first query to get the user, and then query to get the posts that reference the user's ID.

```javascript
const findPostsForUser = async (userId) => {
  try {
    const posts = await Post.find({ userId: userId }).exec();
    return posts;
  } catch (error) {
    console.error('Error finding posts for user:', error);
  }
};

// Usage example
findPostsForUser('someUserId')
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```



Querying with Embedding

---

If the posts were embedded in the user document (not common for 1:M with many items due to potential document size limitations), you would have the `posts` as a subdocument array within the `User` model.

Modified User Model for Embedding

```javascript
const userSchemaWithPosts = new Schema({
  name: String,
  posts: [{
    title: String,
    content: String,
    // Other fields...
  }],
  // Other fields...
});

const UserWithPosts = mongoose.model('UserWithPosts', userSchemaWithPosts);
```

Query to Find User and Embedded Posts

To get a user along with their embedded posts, you would simply query for the user:

```javascript
const findUserAndPosts = async (userId) => {
  try {
    const userWithPosts = await UserWithPosts.findById(userId).exec();
    return userWithPosts;
  } catch (error) {
    console.error('Error finding user and posts:', error);
  }
};

// Usage example
findUserAndPosts('someUserId')
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

In these examples, `findPostsForUser` demonstrates how to query related documents using referencing, which is more scalable for 1:M relationships with potentially large numbers of related items. The `findUserAndPosts` function shows how you might access an embedded array of posts within a user document, which could be more performant for read operations but is generally less flexible and scalable.







## 1.2 M:M Relationships

In M:M relationships, multiple documents from one collection are related to multiple documents from another collection. Modeling M:M relationships in MongoDB often involves using arrays of references in either or both related collections:

1. **Bidirectional Referencing**: Both collections include arrays of references to the other collection. <span style="color:lightgreen">This approach allows for flexibility in accessing related documents from either side</span> but requires maintaining consistency across references.

    **Students Collection**

    ```json
    {
      "_id": 1,
      "name": "Alice",
      "courseIds": [101, 102]
    }
    ```

    **Courses Collection**

    ```json
    {
      "_id": 101,
      "title": "Mathematics",
      "studentIds": [1, 2]
    }
    ```

2. **Single-Side Referencing**: Only one collection (either the "many" or the "one" side, depending on the access patterns) holds references to the other collection. <span style="color:red">This simplifies the model but may limit access patterns requiring reverse lookups.</span>

Choosing between embedding and referencing (or a combination thereof) depends on various factors, including the application's access patterns, the expected growth of the data, and the need for atomic operations. In general, embedding offers faster read performance and atomicity at the cost of potential document size limitations, while referencing provides more flexibility and scalability at the cost of requiring more complex queries and potential consistency management.



Modeling Many-to-Many (M:M) relationships in Mongoose involves establishing references between two document types. In a M:M relationship, each document on one side can relate to multiple documents on the other side, and vice versa. There are different ways to model these relationships, but one common approach is to use an array of references in each model.

### :gem: ​e.g.  Student-Course

Let's consider a scenario where `Students` can enroll in multiple `Courses`, and each `Course` can have multiple `Students` enrolled.



Step 1: Define Mongoose Schemas and Models

**Student Model:**

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const Student = mongoose.model('Student', studentSchema);
```

**Course Model:**

```javascript
const courseSchema = new Schema({
  title: String,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Course = mongoose.model('Course', courseSchema);
```



Step 2: Adding Students to Courses and Vice Versa

To create a M:M relationship, you would typically add the ObjectId of each document in the array of the related documents. This process can be done programmatically when a student enrolls in a course or vice versa.



Step 3: Querying M:M Relationships

To retrieve the data and see the relationships, you can use Mongoose's `populate` method, which allows you to replace specified paths in the document with document(s) from other collection(s).

**Query1: Find all courses for a specific student:**

```javascript
const findCoursesForStudent = async (studentId) => {
  try {
    const studentWithCourses = await Student.findById(studentId)
      .populate('courses') // This populates the courses array with actual course documents
      .exec();
    
    console.log(studentWithCourses);
  } catch (error) {
    console.error('Error finding courses for student:', error);
  }
};
```

**Query2: Find all students enrolled in a specific course:**

```javascript
const findStudentsForCourse = async (courseId) => {
  try {
    const courseWithStudents = await Course.findById(courseId)
      .populate('students') // This populates the students array with actual student documents
      .exec();
    
    console.log(courseWithStudents);
  } catch (error) {
    console.error('Error finding students for course:', error);
  }
};
```

These examples demonstrate basic operations to model and query M:M relationships in Mongoose. In practice, managing M:M relationships might involve more complex operations, like handling the removal of relationships or ensuring the integrity of references. Additionally, depending on the specific requirements of your application (such as query performance or data integrity), you might choose different modeling approaches, such as using a separate collection to explicitly manage the relationships (similar to a junction table in SQL databases).





### mroe on M:M 

A Many-to-Many (M:M) relationship occurs when multiple records in one table are related to multiple records in another table. This relationship type is common in database design but requires an additional table to implement in SQL databases, known as a "junction table" or "linking table," to effectively manage the relationships between the two entities. 

In NoSQL databases like MongoDB, <span style="color:yellow">a M:M relationship can be modeled using arrays of references</span> or, in some cases, more complex structures depending on the specific requirements and access patterns of the application.

SQL Example

---

Consider an example involving `Students` and `Courses`. A student can enroll in many courses, and a course can have many students enrolled in it. This is a classic M:M relationship.

**Students Table**

| StudentID | Name  |
| --------- | ----- |
| 1         | Alice |
| 2         | Bob   |

**Courses Table**

| CourseID | Title       |
| -------- | ----------- |
| 1        | Mathematics |
| 2        | Physics     |

**Enrollments Table (Junction Table)**

| StudentID | CourseID |
| --------- | -------- |
| 1         | 1        |
| 1         | 2        |
| 2         | 2        |

Here, `Enrollments` is the junction table that manages the M:M relationship between `Students` and `Courses`. Each row in `Enrollments` links one student to one course, allowing students to be enrolled in multiple courses and courses to have multiple students.



MongoDB Example

---

In MongoDB, you can model a M:M relationship in a couple of ways, but a common approach is to use arrays of references. For the same `Students` and `Courses` example:

**Students Collection**

```json
[
  {
    "_id": 1,
    "name": "Alice",
    "courseIds": [1, 2]		// use an array of rerences 
  },
  {
    "_id": 2,
    "name": "Bob",
    "courseIds": [2]
  }
]
```

**Courses Collection**

```json
[
  {
    "_id": 1,
    "title": "Mathematics"
  },
  {
    "_id": 2,
    "title": "Physics"
  }
]
```

In this structure, each student document in the `Students` collection includes an array `courseIds` that references the IDs of the courses they are enrolled in. Similarly, you could add a `studentIds` array to each course document in the `Courses` collection to reference the students enrolled, depending on your application's query patterns.

This approach allows for flexibility in querying and updating relationships. However, the choice between embedding and referencing should be guided by the specific needs of your application, including considerations like the size of the data, query performance, and how often relationships between data change.





# 2. MongoDB

:tv:[WebSimplify: MongoDB](https://www.youtube.com/watch?v=ofme2o29ngU&t=22s)



install MongoDB

https://www.mongodb.com/docs/manual/installation/

use shell to install, start, manipulate MongoDB 

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition



:gem: [MongoDB cheatsheet](./Assets/Dark.pdf)







## add data & query data

```js
brew services start mongodb-community@7.0
mongosh  

// in test (default database, not exist until you create data  in it) >
show dbs
use <databasename>

// in selcetd database
show collections 
db.dropDatabase()  // drop the database 
db // show current db
db.users.insertOne({name: "Shawn"})	// insert a document 
db.users.insertOne({name: "sally", age: 19, address:{street: "987 Noth st"}, hobbies: ["running", "reading"] })

db.users.find() // find all documents in "users" collection, auto create _id for each document
[
  { _id: ObjectId("6517708210bf2b4c2c2724f4"), name: 'joe' },
  {
    _id: ObjectId("6517715210bf2b4c2c2724f5"),
    name: 'sally',
    age: 19,
    address: { street: '987 Noth st' },
    hobbies: [ 'running', 'reading' ]
  }
]

db.users.insertMany([{name: "Jill"}, {name: "mike"}])
db.users.insertMany([{name: "Kyle", age: 26, hobbies: ["wieght lifting", "bowling"], address: {street: "123 Main st", city: "New York City"}}, {name: "billy", age: 41, hobbies: ['swimming', 'bowling'], address: {street: "442 South St", city: "New York City"}}])

// query
db.users.find().limit(2)
[
  { _id: ObjectId("6517708210bf2b4c2c2724f4"), name: 'joe' },
  {
    _id: ObjectId("6517715210bf2b4c2c2724f5"),
    name: 'sally',
    age: 19,
    address: { street: '987 Noth st' },
    hobbies: [ 'running', 'reading' ]
  }
]

db.users.find().sort({name:1}).limit(2)  // sort based on name in ascending order
db.users.find().sort({age: -1, name: -1}).limit(2)
db.users.find().skip(1).limit(2)

db.users.find({name: "Kyle"})
[
  {
    _id: ObjectId("651772b510bf2b4c2c2724f8"),
    name: 'Kyle',
    age: 26,
    hobbies: [ 'wieght lifting', 'bowling' ],
    address: { street: '123 Main st', city: 'New York City' }
  }
]

db.users.find({name: "Kyle"}, {name: 1, age:1})  // _id is by default returned 
[
  { _id: ObjectId("651772b510bf2b4c2c2724f8"), name: 'Kyle', age: 26 }
]

db.users.find({name: "Kyle"}, {name: 1, age:1, _id: 0})  // not return id
[ { name: 'Kyle', age: 26 } ]

db.users.find({name: "Kyle"}, {age:0})		// return results without age
[
  {
    _id: ObjectId("651772b510bf2b4c2c2724f8"),
    name: 'Kyle',
    hobbies: [ 'wieght lifting', 'bowling' ],
    address: { street: '123 Main st', city: 'New York City' }
  }
]

// complex query
db.users.find({name: {$ne: "Sally"  }})	// not equal
db.users.find({age: {$gt: 13}  })		// greater than
db.users.find({name: {$in: ["Kyle", "sally"]}  })  // in
db.users.find({name: {$nin: ["Kyle", "sally"]}  }) // not in
db.users.find({age: {$exists: true}})		// return document that has an age field (including age = null)
db.users.find({age: {$gte: 20, $lte: 40}}) // age: [20, 40]
db.users.find({age: {$gte: 20, $lte: 40}, name: "Kyle"})

db.users.find({$and:[{age:26}, {name: "Kyle"}]})
db.users.find({$or:[{age:{$lte:20}}, {name: "Kyle"}]})
[
  {
    _id: ObjectId("6517715210bf2b4c2c2724f5"),
    name: 'sally',
    age: 19,
    address: { street: '987 Noth st' },
    hobbies: [ 'running', 'reading' ]
  },
  {
    _id: ObjectId("651772b510bf2b4c2c2724f8"),
    name: 'Kyle',
    age: 26,
    hobbies: [ 'wieght lifting', 'bowling' ],
    address: { street: '123 Main st', city: 'New York City' }
  }
]

// nested query, but $not is used less frequently
db.users.find({age: {$not: {$lte: 20}}})	// return users whose age is not {lte: 20}


db.users.insertMany([{name: "Tom", balance: 100, debt: 200}, {name: "Kristin", balance: 20, debt: 0}])
db.users.find({$expr: {$gt: ["debt", "balance"]}})
db.users.find({$expr: {$gt: ["$debt", "$balance"]}})	// return users whose "debt" is gt "balance"


db.users.find({"address.street": "442 South St"})  // for a nested field
db.users.findOne({age: {$lte: 40}})
db.users.countDocuments({age: {$lte: 40}})

exit // exit mongosh
```





## update data



```js
db.users.updateOne({age: 26}, {$set: {age:27}})
db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$set: {name:"Shawn"}})
db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$inc: {age: 3}})
db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$rename: {name: "firstname"}})
db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$unset: {age: ""}}) 

db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$push: {hobbies: "Gaming"}})
db.users.updateOne({_id: ObjectId("651772b510bf2b4c2c2724f8")}, {$pull: {hobbies: "Gaming"}}
                    
db.users.updateMany({address: {$exists: true}}, {$unset: {address: ""}})  

db.users.replaceOne({age: 30}, {name: "John"}) // find the first documents with age=30, and replace that document with {name: "John"}
```



## delete data

```js
db.users.deleteOne({name: "Jogn"})

db.users.deleteMany({age: {$exists: false}})
{ acknowledged: true, deletedCount: 6 }

```







# 3. Mongoose

:tv:[Mongoose](https://www.youtube.com/watch?v=DZBGEVgL2eE)



Mongoose Basics

Schema Types

Scheme Validation

script.js

```js
const mongoose = require("mongoose");
const User = require("./Schema/User"); // import User model

mongoose.connect("mongodb://localhost/testdb");

async function run() {
  try {
    const user = await User.create({  // User.create() go through schema validation, but some methods do not
      name: "shawn",
      age: 26,
      email: "TEST@gmail.com",
      hobbies: ["Weight Lifting", "Bowling"],
      address: {
        street: "123 Fake St",
        city: "Boston",
      },
    }); // create a user document in the User collection
    console.log(user);
  } catch (err) {
    console.log(err.message);

  }

}
run();
```

User.js

+ validation
+ Referencing to another schema

```js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {type: Number, min: 1, max: 100, validate: {
    validator: v => v%2 === 0,
    message: props => `${props.value} is not an even number!`
  }},
  email: { type: String, minLength:10, required: true, lowercase: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: mongoose.Schema.Types.ObjectId, // reference to another document in the same collection
  hobbies: [String], // array of strings,
  address: addressSchema,
});

// 'User" collection
module.exports = mongoose.model("User", userSchema);
```







## Query Basics

```js
const mongoose = require("mongoose");
const User = require("./Schema/User"); // import User model

mongoose.connect("mongodb://localhost/testdb");



async function getUser() {
  try {
    const users = await User.findById("6517b63b2aa1d45e2dabb3c2");
    console.log(users);

    const user2 = await User.exists({ name: "shawn" });
    console.log(user2);

    const user3 = await User.where("name")
      .equals("shawn")
      .where("age")
      .gte(26)
      .populate("bestFriend") // like doing a join
      .limit(1);

    await user3[0].save();

    console.log(user3);
  } catch (err) {
    console.log(err.message);
  }
}

getUser();
```





## Advancd 

24min-34min

+ Schema Methods / VIrtuals

+ Schema Middlewares



```js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number!`,
    },
  },
  email: { type: String, minLength: 10, required: true, lowercase: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ! reference to another document in the same collection
  hobbies: [String], // array of strings,
  address: addressSchema,
});

// ! customize methods -------------------------------------
//  add a instance method to the schema
userSchema.methods.sayHi = function () {
  // ! note has to use real function, not arrow function
  console.log(`Hi, my name is ${this.name}`);
};

// customized static method, this is a function can be called upon User
userSchema.statics.findByName = function (name) {
  // ! note has to use real function, not arrow function
  return this.where({ name: new RegExp(name, "i") });
};

// customized chainable query method, note not a function, cannot call upon User
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// a virtual field of a user document
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// ! middleware (similar to AOP) ---------------------------------------------
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  throw new Error("failed to save!");
  next();
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

// 'User" collection
module.exports = mongoose.model("User", userSchema);
```





## ChatGPT: Mongoose

### A quick look

Mongoose is a popular library for MongoDB and Node.js, offering a robust solution for handling data in MongoDB databases. It provides a straight-forward, schema-based solution to model your application data and includes built-in type casting, validation, and more, out of the box.

Here are some key features and aspects of Mongoose:

1. **Schema Definition**: Mongoose allows you to define the shape of your documents using schemas. This provides a layer of certainty about the shape and nature of the data you're working with.

   ```javascript
   const UserSchema = new mongoose.Schema({
       name: String,
       email: { type: String, required: true, unique: true },
       age: Number
   });
   ```

2. **Models**: Once you have a schema, you can compile it into a model. A model is a constructor with which you create and read documents from the underlying MongoDB database.

   ```javascript
   const User = mongoose.model('User', UserSchema);
   ```

3. **Middleware (Hooks)**: Mongoose schemas support middleware (pre and post hooks). This allows you to run asynchronous functions before or after certain events, like saving a document.

   ```javascript
   UserSchema.pre('save', function(next) {
       // Do something before saving a user...
       next();
   });
   ```

4. **Validation**: Mongoose supports validation for schema definitions. This helps ensure your data conforms to expected formats.

   ```javascript
   const BookSchema = new mongoose.Schema({
       title: { type: String, required: true },
       pageCount: { type: Number, min: 1 }
   });
   ```

5. **<span style="color: red">Query Building</span>**: Mongoose queries are chainable and promise-based, making them concise and easy to use.

   ```javascript
   User.find({ age: { $gte: 18 } }).limit(10).sort('name').exec((err, users) => {
       console.log(users);
   });
   ```

6. **Population**: Mongoose supports "population", a way of automatically replacing the specified path in the document, with a document from another collection. I<u>t's a form of joining tables, but in MongoDB's style</u>.

   ```javascript
   const AuthorSchema = new mongoose.Schema({
     books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
   });
   
   Author.find().populate('books').exec((err, authors) => {
     console.log(authors);
   });
   ```

In essence, Mongoose provides a set of features for creating structured data models in an application, allowing developers to enforce a certain level of data integrity, handle relationships between data, and more. It makes working with MongoDB in Node.js applications much more convenient and structured.





### Schemas

[Mongoose v7.5.3: Schemas (mongoosejs.com)](https://mongoosejs.com/docs/guide.html)







### Query

[Mongoose v7.5.3: Queries (mongoosejs.com)](https://mongoosejs.com/docs/queries.html)







### Middleware

[Mongoose v7.5.3: Middleware (mongoosejs.com)](https://mongoosejs.com/docs/middleware.html)





### Populate

[Mongoose v7.5.3: Query Population (mongoosejs.com)](https://mongoosejs.com/docs/populate.html)



Certainly! "Population" in Mongoose is the process of automatically replacing specified fields in one document with documents from another collection. Essentially, it's a way of creating relations similar to joins in relational databases but tailored to the way MongoDB works.

Let's illustrate this with a basic example involving authors and books.

1. **Setting up the Schemas**:
```javascript
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    pages: Number
});

const AuthorSchema = new mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]  // Reference to the books this author has written
});

const Book = mongoose.model('Book', BookSchema);
const Author = mongoose.model('Author', AuthorSchema);
```

2. **Creating and Saving Documents**:
```javascript
// Creating a new book
const newBook = new Book({
    title: "Sample Book",
    pages: 123
});

newBook.save((err, savedBook) => {
    if (err) return console.error(err);

    // Creating a new author and associating the book with the author
    const newAuthor = new Author({
        name: "Sample Author",
        books: [savedBook._id]
    });

    newAuthor.save((err, savedAuthor) => {
        if (err) return console.error(err);
        console.log("Author saved with referenced book:", savedAuthor);
    });
});
```

3. **Using Population**:
To retrieve an author's details along with the details of the books they've written:
```javascript
Author.findOne({ name: "Sample Author" })
    .populate('books')  // This is where the magic happens!
    .exec((err, authorWithBooks) => {
        if (err) return console.error(err);
        console.log("Author with populated books:", authorWithBooks);
    });
```

When you run the above query, instead of just seeing book IDs in the `books` field of the `Author` document, you'll see detailed `Book` documents replacing those IDs. This "population" allows you to effectively retrieve relational data in a MongoDB environment.

Remember: While population is powerful, it's not the same as native joins in relational databases, and excessive or complex use of it can have performance implications. It's important to design your schemas and queries thoughtfully.

