// calculator.js

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Cannot divide by zero!";
    }
}

// Exporting the functions so they can be used in other modules
module.exports = {
    add,
    subtract,
    multiply,
    divide
};
