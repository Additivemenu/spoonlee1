Mongoose





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
