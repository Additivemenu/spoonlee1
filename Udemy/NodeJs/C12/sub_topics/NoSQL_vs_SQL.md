Certainly! MongoDB and MySQL are both popular database systems, but they belong to different categories of databases and have distinct ways of storing data. Here's a breakdown:

### MongoDB:
- **Type**: NoSQL database
- **Data Storage**: Uses a <span style="color:red">document-oriented model</span>. Data is stored in BSON format (binary JSON) which allows it to support more data types than JSON. 
- **Structure**: Each record in MongoDB is a document which is a data structure composed of field and value pairs. Documents can contain sub-documents (nested data). These documents are grouped together in collections. Each document can have a different schema within the same collection.

**Example**:

```json
{
    "_id": 1,
    "name": "John Doe",
    "age": 30,
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "zip": "12345"
    },
    "hobbies": ["reading", "hiking", "swimming"]
}
```

### MySQL:
- **Type**: Relational Database Management System (RDBMS)
- **Data Storage**: Uses <span style="color:red">table</span> to store data, much like spreadsheets in Excel. Each table has a fixed schema defined by columns, and each row in the table represents a record.
- **Structure**: Data is stored in tables, and these tables are related to each other using foreign keys. The schema (structure of tables and relationships) needs to be defined before inserting data.

**Example**:
Tables in a relational database might look something like this:

`Users` Table:
```
| user_id | name      | age |
|---------|-----------|-----|
| 1       | John Doe  | 30  |
```

`Addresses` Table:
```
| address_id | user_id | street       | city    | zip  |
|------------|---------|--------------|---------|------|
| 1          | 1       | 123 Main St  | Anytown | 12345|
```

`Hobbies` Table:
```
| user_id | hobby   |
|---------|---------|
| 1       | reading |
| 1       | hiking  |
| 1       | swimming|
```

### Main Difference in Terms of Data Storage:
- **MongoDB** stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time.
  
- **MySQL** stores data in structured tables with a fixed schema for each table. If you want to change the structure, you often need to modify the schema of the table.

In summary, while MongoDB offers more flexibility in terms of data storage and structure, MySQL offers structured storage with well-defined relationships between tables. The choice between them often depends on the specific needs of the application and the nature of the data being stored.