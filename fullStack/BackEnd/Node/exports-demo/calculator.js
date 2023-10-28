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

console.log("hello!")

// Attaching functions to the exports object
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
