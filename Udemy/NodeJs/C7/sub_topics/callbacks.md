

# Abstract

A **callback** is a function passed as an argument to another function, typically used to handle asynchronous operations or events in languages like JavaScript. It allows a function to notify or delegate certain behaviors upon its completion.

+ just remember, if a function takes a callback function as an arguement, probably somewhere inside that function is a "placeholder" for a behaviour

The **Strategy Pattern** is a behavioral design pattern that defines a family of interchangeable algorithms encapsulated in separate classes. It allows the algorithm's implementation to vary independently from the clients that use it, promoting flexibility and reusability by selecting the desired strategy at runtime.





# Callback in JavaScript & Java

A callback function in JavaScript is a function that is passed as an argument to another function and is executed after the other function has finished executing. Callbacks are fundamental to JavaScript's asynchronous nature, especially in environments like Node.js.

### Why do we need callback functions in JavaScript?

1. **Asynchronous Operations**: JavaScript, especially in the Node.js environment, relies heavily on asynchronous operations, such as reading files, making database or network requests, etc. Callbacks allow you to execute code once an asynchronous operation completes, rather than waiting for it to finish.

2. **Event Handling**: In browser environments, callbacks are used to handle events. For example, when a button is clicked or when data is fetched from a server, a callback function can be executed.

3. **Higher-Order Functions**: Callbacks are used in higher-order functions, which are functions that take other functions as arguments and/or return functions. This is common in array methods like `map`, `filter`, and `reduce`.

4. **Customization and Reusability**: Callbacks allow you to customize the behavior of a function. For instance, you might have a function that fetches data, and you can pass different callback functions to handle the data in various ways.

### Does Java have a similar concept?

Yes, Java has a similar concept, though it's implemented differently due to the language's nature:

1. **Interfaces**: In Java, you often use interfaces to create callback-like patterns. An interface defines a method (or methods) that a class must implement. You can then pass an instance of that class (an object) to another method, which can call the interface methods, effectively using them as callbacks.

2. **Listeners**: A common use of the callback pattern in Java is event listeners, especially in GUI programming. For example, you might have a `ButtonClickListener` interface. Classes that implement this interface can then be used as callbacks when a button is clicked.

3. **Lambda Expressions (Java 8 and later)**: With the introduction of lambda expressions in Java 8, creating and using callbacks became more concise. You can now pass a lambda expression as a method argument, making the code more readable and eliminating the need for anonymous inner classes in many cases.

4. **Future and CompletableFuture**: For asynchronous operations, Java provides the `Future` and `CompletableFuture` classes, which can be used to handle results or exceptions from asynchronous computations. While they serve a similar purpose to callbacks in handling asynchronous operations, they offer a more structured way to compose and chain asynchronous tasks.

In conclusion, while both JavaScript and Java have mechanisms to handle callbacks, the way they are implemented and used can differ due to the languages' characteristics and paradigms.





# :gem: demo

Certainly! Let's explore the concept of callbacks in both JavaScript and Java through examples.

### 1. JavaScript Callback:

Let's consider a simple asynchronous operation using `setTimeout`, which simulates a delay:

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = "Hello from the server!";
        callback(data);		// this piece of code is uncertain ************************
    }, 2000); // Simulate a 2-second delay
}

fetchData((result) => {
    console.log(result); // This will print "Hello from the server!" after 2 seconds
});
```

In this example, the `fetchData` function simulates fetching data with a 2-second delay. Once the data is "fetched," it calls the provided callback function with the data.

### 2. Java Callback using Interface:

Here's a simple example of a callback in Java using an interface:

```java
interface Callback {
    void onComplete(String result);
}

class DataFetcher {
    public void fetchData(Callback callback) {
        // Simulating some delay (e.g., fetching data)
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        String data = "Hello from the server!";
        callback.onComplete(data);			// this piece of code is uncertain *************
    }
}

public class Main {
    public static void main(String[] args) {
        DataFetcher fetcher = new DataFetcher();
        fetcher.fetchData(new Callback() {
            @Override
            public void onComplete(String result) {
                System.out.println(result); // This will print "Hello from the server!" after 2 seconds
            }
        });
    }
}
```

In the Java example, we define a `Callback` interface with an `onComplete` method. The `DataFetcher` class has a `fetchData` method that simulates a delay and then calls the `onComplete` method of the provided callback.

### 3. Java Callback using Lambda (Java 8+):

With the introduction of lambda expressions in Java 8, the above Java example can be made more concise:

```java
// ... (rest of the code remains the same)

public class Main {
    public static void main(String[] args) {
        DataFetcher fetcher = new DataFetcher();
        fetcher.fetchData(result -> System.out.println(result));
    }
}
```

In this version, we pass a lambda expression to the `fetchData` method, making the code more readable.

These examples demonstrate the callback pattern in both JavaScript and Java. While the underlying concept is similar, the implementation details and syntax differ between the two languages.



## :gem: More examples of Callback in JS

Callbacks are pervasive in JavaScript due to its asynchronous nature. Here are some common scenarios where callbacks are used:

1. Array Methods:

---

JavaScript arrays have several methods that accept callback functions:

- **`forEach`**: Iterates over each item in the array.
  ```javascript
  [1, 2, 3].forEach(function(item) {
      console.log(item);
  });
  ```

- **`map`**: Creates a new array by transforming every element in the original array.
  ```javascript
  const doubled = [1, 2, 3].map(function(item) {
      return item * 2;
  });
  console.log(doubled); // [2, 4, 6]
  ```

- **`filter`**: Creates a new array with all elements that pass the test implemented by the callback.
  ```javascript
  const evens = [1, 2, 3, 4].filter(function(item) {
      return item % 2 === 0;
  });
  console.log(evens); // [2, 4]
  ```

2. Event Listeners:

---

Callbacks are used to handle events in the browser:

```javascript
document.getElementById('myButton').addEventListener('click', function() {
    alert('Button was clicked!');
});
```

3. Asynchronous Operations with `setTimeout` and `setInterval`:

---

- **`setTimeout`**: Executes a callback after a specified delay.
  
  ```javascript
  setTimeout(function() {
      console.log('Executed after 2 seconds');
  }, 2000);
  ```
  
- **`setInterval`**: Executes a callback at specified intervals.
  
  ```javascript
  setInterval(function() {
      console.log('This will run every 3 seconds');
  }, 3000);
  ```

4. AJAX Requests:

---

Using the `XMLHttpRequest` object:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    } else {
        console.error('Server returned an error');
    }
};
xhr.onerror = function() {
    console.error('Connection error');
};
xhr.send();
```

5. Promises:

---

While Promises offer a more structured way to handle asynchronous operations, they also use callbacks:

```javascript
fetch('https://api.example.com/data')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
```

6. Middleware in Express.js:

---

In the Express.js framework for Node.js, middleware functions are a type of callback:

```javascript
const express = require('express');
const app = express();

app.use(function(req, res, next) {
    console.log('Middleware function executed');
    next();
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000);
```

These are just a few examples, but callbacks are found throughout JavaScript, both in the browser and in Node.js environments. They provide a flexible way to handle asynchronous operations, events, and customized behaviors.





# :moon: Strategy pattern vs. callback

You're right! The callback mechanism in Java, especially when using interfaces, does resemble the Strategy Pattern. Let's delve into this observation:

### Strategy Pattern:

The Strategy Pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the algorithm to vary independently from the clients that use it. In essence, the Strategy Pattern involves:

1. Defining a strategy interface that encapsulates a piece of functionality.
2. Implementing multiple versions (or strategies) of this functionality.
3. Passing these implementations (strategies) to client objects that use them, often through a setter or a constructor.

### Callback vs. Strategy Pattern:

While both callbacks and the Strategy Pattern involve passing behavior (in the form of a function or method) as an argument, there are some distinctions:

1. **Intent**:
   - **Callback**: The primary purpose is to notify the completion of a task or to customize a small piece of behavior. Callbacks are often used for asynchronous operations or event handling.
   - **Strategy Pattern**: The primary purpose is to encapsulate interchangeable algorithms or strategies that a client can use.

2. **Usage**:
   - **Callback**: Typically used for one-off, customized behaviors or event listeners.
   - **Strategy Pattern**: Used when there's a well-defined set of algorithms or behaviors that a client object can employ.

3. **Granularity**:
   - **Callback**: Often deals with smaller, more specific tasks (e.g., a function to run after data is fetched).
   - **Strategy Pattern**: Can encapsulate more complex, high-level behaviors or algorithms.

### Example:

Consider a payment processing system where payments can be processed using different methods (e.g., credit card, PayPal, bank transfer).

Using the Strategy Pattern:

```java
interface PaymentStrategy {
    void processPayment(int amount);
}

class CreditCardPayment implements PaymentStrategy {
    @Override
    public void processPayment(int amount) {
        // Process credit card payment
    }
}

class PayPalPayment implements PaymentStrategy {
    @Override
    public void processPayment(int amount) {
        // Process PayPal payment
    }
}

class PaymentProcessor {
    private PaymentStrategy strategy;

    public PaymentProcessor(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void executePayment(int amount) {
        strategy.processPayment(amount);
    }
}
```

In this example, `PaymentStrategy` is the strategy interface, and `CreditCardPayment` and `PayPalPayment` are concrete strategies. The `PaymentProcessor` class uses a strategy to process payments.

While this example doesn't use callbacks, you can imagine scenarios where callbacks might be used in conjunction with the Strategy Pattern, such as notifying when a payment is complete.

In conclusion, while callbacks in Java and the Strategy Pattern share similarities in passing behavior as arguments, they serve different purposes and are used in different contexts. However, recognizing the resemblance between the two is a testament to your understanding of design patterns and programming concepts!



# Can strategy pattern be used to implement callback?

Yes, the Strategy Pattern can be used to implement a callback mechanism, especially in languages like Java where functions are not first-class citizens and cannot be passed around as easily as in languages like JavaScript.

When using the Strategy Pattern as a callback mechanism, the "strategy" essentially becomes the "callback." Here's how it can be conceptualized:

1. **Strategy Interface**: This would define the method signature for the callback.
2. **Concrete Strategies**: These would be the actual callback implementations.
3. **Context Class**: This would be the class that requires the callback. It would use the strategy (callback) to notify or delegate certain behaviors.

### Example:

Imagine a scenario where we want to notify users when a download is complete. We might want different notifications for different situations (e.g., a log message, an email, or a UI popup).

Using the Strategy Pattern to implement callbacks:

```java
// Strategy (Callback) Interface
interface DownloadCallback {
    void onDownloadComplete();
}

// Concrete Strategy 1: Log Notification
class LogNotification implements DownloadCallback {
    @Override
    public void onDownloadComplete() {
        System.out.println("Download completed. Logged to console.");
    }
}

// Concrete Strategy 2: Email Notification
class EmailNotification implements DownloadCallback {
    @Override
    public void onDownloadComplete() {
        System.out.println("Download completed. Email sent to user.");
    }
}

// Context Class
class DownloadManager {
    private DownloadCallback callback;

    public DownloadManager(DownloadCallback callback) {
        this.callback = callback;
    }

    public void downloadFile() {
        // Simulate file download...
        System.out.println("Downloading file...");

        // Once download is complete, use the callback (strategy) to notify
        callback.onDownloadComplete();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        DownloadManager manager1 = new DownloadManager(new LogNotification());
        manager1.downloadFile();

        DownloadManager manager2 = new DownloadManager(new EmailNotification());
        manager2.downloadFile();
    }
}
```

In this example:
- The `DownloadCallback` interface is our strategy (callback) interface.
- `LogNotification` and `EmailNotification` are concrete strategies (callbacks).
- `DownloadManager` is the context class that uses the callback to notify when a download is complete.

By using the Strategy Pattern, we've effectively created a callback mechanism where the notification behavior can be customized based on the situation.

In conclusion, while the Strategy Pattern's primary intent is to encapsulate interchangeable algorithms, it can indeed be adapted to serve as a callback mechanism, especially in languages where passing functions directly is not idiomatic or straightforward.