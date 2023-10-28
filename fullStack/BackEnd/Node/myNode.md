# Module in Node.js



Let's delve deeper into Node.js modules.

In Node.js, a module is a self-contained unit that can expose assets (like variables, functions, classes, etc.) to other modules and can also consume assets from other modules. Modules help in keeping the unit of code testable, maintainable, and reusable.



## `module.exports` and `exports`

<span style="color: red;">In Node.js, each module has a special object called `module.exports`. This object is what's actually returned by the `require()` calls. By default, `module.exports` is an empty object. You can add properties to this object, or you can completely overwrite it.</span>



- Using `module.exports`:

  ```javascript
  // math.js
  module.exports.add = (x, y) => x + y;
  module.exports.subtract = (x, y) => x - y;
  ```

  ```javascript
  // app.js
  const math = require('./math');
  console.log(math.add(3, 4)); // Outputs: 7
  ```

- Overwriting `module.exports`:

  ```javascript
  // greeter.js
  module.exports = name => `Hello, ${name}!`;
  ```

  ```javascript
  // app.js
  const greet = require('./greeter');
  console.log(greet('Alice')); // Outputs: Hello, Alice!
  ```

The `exports` variable is merely a reference to `module.exports`. You can add properties to `exports` and they'll appear on `module.exports`, but if you overwrite `exports`, the reference is lost.



## Importing Modules

In Node.js, you use `require()` to import modules:

- Importing local files:

  ```javascript
  const myModule = require('./path_to_file');
  ```

- Importing core modules:

  ```javascript
  const fs = require('fs');
  ```

- Importing from `node_modules`:

  ```javascript
  const lodash = require('lodash');
  ```





## ES6:  `import`/`export`

While Node.js traditionally used the CommonJS module system (with `require()` and `module.exports`), it also supports ES6 modules using `import` and `export`.

To use ES6 modules in Node.js:

- Make sure your version of Node.js supports ES6 modules.
- Use the `.mjs` extension or set `"type": "module"` in your `package.json`.

Example:

- **Using `export`**:

  ```javascript
  // utils.mjs
  export const add = (x, y) => x + y;
  export const subtract = (x, y) => x - y;
  ```

- **Using `import`**:

  ```javascript
  // app.mjs
  import { add, subtract } from './utils.mjs';
  console.log(add(3, 4)); // Outputs: 7
  ```

Note: If you're using ES6 modules, the way Node.js resolves modules is slightly different. You might have to include file extensions, and there are other nuances to be aware of.



## Recap

- CommonJS (traditional Node.js module system): Uses `require()` for importing and `module.exports` or `exports` for exporting.
  
- ES6 modules: Uses `import` and `export` statements. Requires special setup in Node.js.

It's essential to understand the context and the project requirements to decide which module system to use. If you're working in a codebase that uses `require()`, it's best to stick with it. If you're starting a new project and want to use modern JavaScript features throughout, you might opt for ES6 modules.







## Behind the scenes of `require()`

The `require()` function in Node.js is a fundamental part of the module system, and understanding its inner workings can give you deeper insights into how Node.js manages modules. Here's a breakdown of what happens behind the scenes when `require()` is called:

1. **Initialization**: The first time you call `require()` for a specific module, several things happen:

   - **Resolution**: Node starts by resolving the path of the module. If the module reference is a relative path (like `./calculator`), it resolves it to an absolute path based on the current file's directory. If it's a built-in module (like `fs` or `http`), no path resolution is needed.

   - **Loading**: Node checks if the module is a core module (like `fs`). If it is, Node loads it directly. If not, Node reads the target file's content from the file system.

   - **Caching**: Node checks its module cache to see if the module has already been imported elsewhere in the application. If it has, the cached module exports are returned immediately, avoiding re-evaluation of the module code. <span style="color: red;">This is why subsequent calls to `require()` for the same module are faster and won't re-execute the module code.</span>

2. **Compilation**: If the module isn't in the cache, Node needs to compile it. The content of the file is wrapped in a function, often referred to as a "module wrapper". This wrapper looks something like:

   ```javascript
   (function(exports, require, module, __filename, __dirname) {
       // Module code here
   });
   ```

   This wrapper provides some special objects/functions to the module, including the `exports`, `require`, and `module` objects.

3. **Execution**: <span style="color:red;">The wrapped module code is executed. This is when the module's functions and code are actually run.</span> Any top-level code (like `console.log("hello!")` in your example) gets executed during this phase.

4. **Exporting**: Modules can export values using `module.exports` or `exports`. After the module code has executed, the `exports` from that module (what it has chosen to make available to other modules) are returned by the `require()` call.

5. **Caching (again)**: The exports for the module are cached. This means if you `require()` the same module again in your application, Node will skip the load and compilation steps and just return the cached exports.

6. **Returning**: The `require()` function finally returns the module's exports to the caller.

This entire process ensures that Node modules are loaded, compiled, and cached efficiently, allowing applications to make use of countless modules without excessive overhead.







## :bangbang::gem: Demo

```js
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
```



```js
// app.js

// Importing our calculator module using require
const calculator = require('./calculator');

// Using the calculator functions
console.log(calculator.add(5, 3));       // Outputs: 8
console.log(calculator.subtract(5, 3));  // Outputs: 2
console.log(calculator.multiply(5, 3));  // Outputs: 15
console.log(calculator.divide(5, 3));    // Outputs: 1.6666666666666667
```



If you run `app.js`, this is the output you'll see:

```
hello!
8
2
15
1.6666666666666667
```

Here's the sequence of events:

1. When you run `app.js`, the line `const calculator = require('./calculator');` is executed. This causes Node.js to load the `calculator.js` module.
2. <span style="color:red;">While loading the `calculator.js` module, all the code inside it is executed.</span> Thus, the `console.log("hello!")` statement inside `calculator.js` is run first, which prints `hello!` to the console.
3. After the entire `calculator.js` module is loaded and executed (including attaching functions to the `exports` object), execution returns to `app.js`.
4. The remaining lines in `app.js` that make use of the calculator functions are executed, resulting in the printed output of the calculations.

So, the output "hello!" comes from the `calculator.js` module when it's loaded and executed by the `require` statement in `app.js`. The remaining outputs come from the calculator functions being executed in `app.js`.



### a little change...

if I change app.js to:

```js
// app.js

// Importing our calculator module using require
const calculator = require('./calculator');

// Using the calculator functions
console.log(calculator.add(5, 3));       // Outputs: 8
console.log(calculator.subtract(5, 3));  // Outputs: 2
console.log(calculator.multiply(5, 3));  // Outputs: 15
console.log(calculator.divide(5, 3));    // Outputs: 1.6666666666666667


const calculator2 = require('./calculator');
console.log(calculator2.divide(5, 3)); 
```

When you run `app.js`, here's what will happen:

1. The `calculator` module is `require`d, and the `calculator.js` file is executed. This means the functions are defined and the `console.log("hello!")` statement inside `calculator.js` is executed. After executing, the functions attached to the `exports` object are returned and assigned to the `calculator` constant in `app.js`.

2. The calculator functions are then used in `app.js` to log their results to the console.

3. When you `require` the `calculator` module a second time as `calculator2`, Node.js will provide the cached exports from the first `require` call. It will not re-execute the `calculator.js` file. This means the `console.log("hello!")` statement will not be printed again.

4. Finally, the `divide` function of the `calculator2` object is called and its result is logged to the console.

The output would be:

```
hello!
8
2
15
1.6666666666666667
1.6666666666666667
```

Notice that "hello!" is printed only once, even though you required the `calculator` module twice. This is because of the caching behavior of `require()` in Node.js.





## Demo

```js
// dataStore.js

// Shared data structure
const sharedData = {
    count: 0,
    items: []
};

module.exports = sharedData;

```



```js
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
```



```js
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
```



```js
// app.js

const moduleA = require('./moduleA');
const moduleB = require('./moduleB');

moduleA.addItem('apple');
moduleA.addItem('banana');

console.log('Total items count:', moduleB.getItemCount());
console.log('All items:', moduleB.getAllItems());
```

as caching mechanism of require(), moduleA and moduleB access the same data structure

```sh
Item added by moduleA: apple
Item added by moduleA: banana
Total items count: 2
All items: [ 'apple', 'banana' ]
```

