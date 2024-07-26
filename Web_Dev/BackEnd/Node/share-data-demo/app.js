// app.js

const moduleA = require('./moduleA');
const moduleB = require('./moduleB');

moduleA.addItem('apple');
moduleA.addItem('banana');

console.log('Total items count:', moduleB.getItemCount());
console.log('All items:', moduleB.getAllItems());
