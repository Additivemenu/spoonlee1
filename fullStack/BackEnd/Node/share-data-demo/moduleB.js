// moduleB.js

const data = require('./dataStore');

function getItemCount() {
    return data.count;
}

function getAllItems() {
    return data.items;
}

module.exports = {
    getItemCount: getItemCount,
    getAllItems: getAllItems
};
