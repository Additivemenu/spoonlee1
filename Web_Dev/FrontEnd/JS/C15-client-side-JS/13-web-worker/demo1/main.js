const startButton = document.getElementById("startButton");
const resultDiv = document.getElementById("result");

// Create a new worker
const worker = new Worker("worker.js");

// Listen for messages from the worker
worker.onmessage = function (e) {
  resultDiv.textContent = `Result: ${e.data}`;
  startButton.disabled = false;
};

// Handle errors
worker.onerror = function (error) {
  console.error("Worker error:", error);
  resultDiv.textContent = "An error occurred";
  startButton.disabled = false;
};

// Function to start the worker
function startCalculation() {
  startButton.disabled = true;
  resultDiv.textContent = "Calculating...";

  worker.postMessage({
    numbers: Array.from({ length: 10000000 }, (_, i) => i),
  });
}
