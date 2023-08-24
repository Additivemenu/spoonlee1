js basics





# export & import

Of course! Here are examples of various ways to perform exports and imports in JavaScript using ES6 (ECMAScript 2015) module syntax:



## 1. Named Exports:

You can export multiple items from a module using named exports.

**helpers.js**

```javascript
// Exporting individual items
export const add = (x, y) => x + y;
export const subtract = (x, y) => x - y;

// Exporting an object
export const settings = {
    darkMode: true,
    volume: 80
};
```

To import named exports:

**app.js**
```javascript
import { add, subtract, settings } from './helpers.js';

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
console.log(settings.darkMode);  // true
```



## 2. Default Exports:

Each module can have only one default export.

**math.js**

```javascript
const multiply = (x, y) => x * y;

export default multiply;
```

To import a default export:

**app.js**

```javascript
import multiply from './math.js';

console.log(multiply(5, 3));  // 15
```



## 3. Mixing Default and Named Exports:

**utils.js**

```javascript
export const PI = 3.14159;

export default function areaOfCircle(r) {
    return PI * r * r;
}
```

**app.js**
```javascript
import area, { PI } from './utils.js';

console.log(PI);             // 3.14159
console.log(area(5));        // 78.53975
```

## 4. Re-exporting:

**strings.js**

```javascript
export const hello = "Hello";
export const bye = "Goodbye";
```

**index.js**
```javascript
// Re-export everything from strings.js
export * from './strings.js';
```

**app.js**
```javascript
import { hello, bye } from './index.js';

console.log(hello);  // Hello
console.log(bye);    // Goodbye
```

## 5. Importing Everything:

To import everything from a module:

**app.js**

```javascript
import * as mathFunctions from './helpers.js';

console.log(mathFunctions.add(5, 3));      // 8
console.log(mathFunctions.subtract(5, 3)); // 2
```

These are just some fundamental patterns to get you started with ES6 module imports and exports. It's important to note that the ES6 module system is static, meaning that you cannot conditionally import/export modules, and all import/export statements must be at the top level (not nested inside functions, conditions, etc.).