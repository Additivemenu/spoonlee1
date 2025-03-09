/**
 * Creates a text typing component that types text character by character with async support.
 * @param {string} containerId - The ID of the container element (default: 'typing-container')
 * @returns {Object} - The typing component object with methods
 */
function typingComponent(containerId = "typing-container") {
  // Get or create container
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with ID '${containerId}' not found`);
  }

  // Add cursor element
  const textElement = document.createElement("span");
  const cursorElement = document.createElement("span");
  cursorElement.className = "typing-cursor";

  container.innerHTML = "";
  container.appendChild(textElement);
  container.appendChild(cursorElement);

  // State variables
  const queue = [];
  let isTyping = false;
  let currentTimeout = null;

  // the core function to type a single text
  const typeText = (text, typingSpeed, resolve) => {
    isTyping = true;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        // !handle current text
        textElement.textContent += text.charAt(index);
        index++;
        currentTimeout = setTimeout(type, typingSpeed);
      } else {
        // !handle end of text, resolve the promise for this text and process next item in queue
        isTyping = false;
        if (resolve) resolve(); // Resolve the promise for this text
        processQueue(); // Process next item in queue
      }
    };

    type();
  };

  // Function to process the queue
  const processQueue = () => {
    if (queue.length > 0 && !isTyping) {
      const nextItem = queue.shift();
      typeText(nextItem.text, nextItem.speed, nextItem.resolve);
    }
  };

  // Create the component instance
  return {
    /**
     * Adds text to the typing queue and returns a promise that resolves when typing is complete
     * @param {string} text - The text to add to the typing queue
     * @param {number} speed - The typing speed in milliseconds (default: 100)
     * @returns {Promise} - Returns a promise that resolves when typing is complete
     */
    addText: function (text, speed = 100) {
      return new Promise((resolve) => {
        // !resolved when the text is fully typed on the screen
        queue.push({ text, speed, resolve });

        if (!isTyping) {
          processQueue();
        }
      });
    },

    /**
     * Clears all text and the typing queue
     */
    clear: function () {
      textElement.textContent = "";

      if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
      }

      // Clear the queue and resolve any pending promises
      while (queue.length > 0) {
        const item = queue.shift();
        if (item.resolve) {
          item.resolve();
        }
      }

      isTyping = false;
    },

    /**
     * Returns a promise that resolves when all queued typing is complete
     * @returns {Promise} - Promise that resolves when all typing is complete
     */
    waitForComplete: function () {
      return new Promise((resolve) => {
        if (!isTyping && queue.length === 0) {
          resolve();
        } else {
          queue.push({
            text: "",
            speed: 0,
            resolve: resolve,
          });
        }
      });
    },

    /**
     * Gets the current content of the typing container
     * @returns {string} - The current text content
     */
    getContent: function () {
      return textElement.textContent;
    },
  };
}

/**
 * Demo function to showcase the typing component
 */
async function demo1() {
  const typer = typingComponent();

  // Clear the display
  typer.clear();

  // First text
  await typer.addText("Hello! ", 100);
  console.log("First text complete");

  // Second text
  await typer.addText("This is a typing component demonstration. ", 80);
  console.log("Second text complete");

  // Third text
  await typer.addText(
    "Text appears character by character at a defined speed. ",
    60,
  );
  console.log("Third text complete");

  // Fourth text
  await typer.addText("You can queue multiple texts and await each one. ", 50);
  console.log("Fourth text complete");

  // Fifth text
  await typer.addText("Try creating your own typing animations!", 40);
  console.log("All done!");
}

/**
 * Demo function to showcase the typing component
 */
async function demo2() {
  const typer = typingComponent();

  // Clear the display
  typer.clear();

  const textsPool = [
    "Hello! ",
    "This is a typing component demonstration. ",
    "Text appears character by character at a defined speed. ",
    "You can queue multiple texts and await each one. ",
    "Try creating your own typing animations! ",
  ];

  async function pollText(textsPool) {
    const text = textsPool.shift();
    if (!text) {
      await typer.addText("No more texts to display.", 50);
      return;
    }

    await typer.addText(text, 100); //! only resolves when text gets typed on screen!

    setTimeout(() => {
      pollText(textsPool);
    }, 500);
  }

  pollText(textsPool);
}

/**
 * Demo function to showcase the typing component with simulated API polling
 */
async function demo() {
  const typer = typingComponent();

  // Clear the display
  typer.clear();

  // Status display
  const statusDiv = document.getElementById("status");
  if (statusDiv) {
    statusDiv.textContent = "Starting API polling simulation...";
  }

  // Start with an introduction
  await typer.addText(
    "Simulating API data polling. New data arrives every 2 seconds:\n\n",
    50,
  );

  // Variable to store the interval ID for clearing later
  let pollingInterval;
  // Flag to track if we're currently displaying text
  let isDisplaying = false;

  // Function to poll data and display it
  const pollData = async () => {
    // If already displaying text, skip this cycle
    if (isDisplaying) {
      if (statusDiv)
        statusDiv.textContent =
          "Waiting for current message to finish typing...";
      return;
    }

    try {
      isDisplaying = true;
      if (statusDiv) statusDiv.textContent = "Fetching new data...";

      // Get data from our simulated API
      const data = await simulatedAPI();

      // show fetch results in the typer
      if (statusDiv) statusDiv.textContent = "New data received, displaying...";
      const timestamp = new Date().toLocaleTimeString();
      await typer.addText(`[${timestamp}] ${data}\n`, 80);

      if (statusDiv) statusDiv.textContent = "Waiting for next update...";
    } catch (error) {
      console.error("Error fetching data:", error);
      if (statusDiv) statusDiv.textContent = `Error: ${error.message}`;
    } finally {
      isDisplaying = false;
    }
  };

  // ! Start polling
  pollData();
  pollingInterval = setInterval(pollData, 2000);

  // logic for stopping the polling ---------------------------------------------------
  // Add a button to stop the polling
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop Polling";
  stopButton.style.marginLeft = "10px";
  stopButton.onclick = () => {
    clearInterval(pollingInterval);
    if (statusDiv) statusDiv.textContent = "Polling simulation stopped.";
    typer.addText("\nAPI polling simulation ended.", 50);
    stopButton.remove();
  };

  // Find the Run Demo button's parent and add the stop button
  const demoButton = document.querySelector("button");
  if (demoButton && demoButton.parentNode) {
    demoButton.parentNode.appendChild(stopButton);
  }

  // Automatically stop after 30 seconds if not manually stopped
  setTimeout(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      if (statusDiv)
        statusDiv.textContent = "Polling simulation completed (timeout).";
      typer.addText("\nAPI polling simulation ended after 30 seconds.", 50);
      stopButton.remove();
    }
  }, 30000);
}
