
Let's break down how it all works:

1. **Initial Setup (main.js)**:
   - Gets references to the button and result div
   - Creates a new Web Worker by loading worker.js
   - Sets up listeners for worker messages and errors

2. **When Button is Clicked**:
   - The button is disabled
   - "Calculating..." message is shown
   - Creates an array of 10 million numbers
   - Sends this array to the worker using `postMessage()`

3. **In the Worker (worker.js)**:
   - Receives the array of numbers
   - Calculates the sum of squares (very CPU-intensive task)
   - Sends the result back to main thread

4. **Back in Main Thread**:
   - Receives the result from worker
   - Updates the UI with the result
   - Re-enables the button

The key benefit here is that while the worker is doing the heavy calculation:
- The webpage remains responsive
- User can still click things, scroll, etc.
- The UI doesn't freeze

To visualize the data flow:

```
[Main Thread]                     [Worker Thread]
     |                                 |
Button Click                          |
     |                                |
Send numbers -----------------------> |
     |                          Calculate sum
     |                                |
Update UI <---------------------- Send result
```

Try this experiment:
1. Run this code without a worker (doing the calculation in the main thread) - the UI will freeze
2. Run it with the worker - the UI stays smooth while calculation happens

