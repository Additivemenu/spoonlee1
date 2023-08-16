const express = require('express');
const bodyParser = require('body-parser');


/**
 * a simple CRUD server using in-meory array for data storage
 * you can use Postman to test it
 * 
 */

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Our in-memory data store
let items = [
    { id: 1, name: 'Sample Item' }
];

// Create (POST) ----------------------
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).send(newItem);
});

// Read All (GET) ----------------------
app.get('/items', (req, res) => {
    res.send(items);
});

// Read Single (GET by ID) --------------
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.send(item);
});

// Update (PUT) -------------------------
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');

    item.name = req.body.name || item.name;
    res.send(item);
});

// Delete (DELETE) ----------------------
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found.');

    const deletedItem = items.splice(itemIndex, 1);
    res.send(deletedItem);
});

const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
