Mongoose



https://www.bilibili.com/video/BV16u4y1y7Fm/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=c6866d088ad067762877e4b6b23ab9df



Source: 

:tv:[MongoDB](https://www.youtube.com/watch?v=ofme2o29ngU&t=22s)

:tv:[Mongoose](https://www.youtube.com/watch?v=DZBGEVgL2eE)





# MongoDB

install MongoDB

https://www.mongodb.com/docs/manual/installation/

use shell to install, start, manipulate MongoDB 

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition



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







# Mongoose

## A quick look

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





## Schemas

[Mongoose v7.5.3: Schemas (mongoosejs.com)](https://mongoosejs.com/docs/guide.html)







## Query

[Mongoose v7.5.3: Queries (mongoosejs.com)](https://mongoosejs.com/docs/queries.html)







## Middleware

[Mongoose v7.5.3: Middleware (mongoosejs.com)](https://mongoosejs.com/docs/middleware.html)





## Populate

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
