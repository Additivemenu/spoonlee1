// worker.js
self.onmessage = function (e) {
  const numbers = e.data.numbers;

  // Perform a computationally intensive task
  // Calculate sum of squares
  const result = numbers.reduce((acc, curr) => {
    return acc + curr * curr;
  }, 0);

  // Send the result back to the main thread
  self.postMessage(result);
};
