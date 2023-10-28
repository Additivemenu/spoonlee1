// moduleA.js

const data = require('./dataStore');

function addItem(item) {
    data.items.push(item);
    data.count++;
    console.log('Item added by moduleA:', item);
}

module.exports = {
    addItem: addItem
};
