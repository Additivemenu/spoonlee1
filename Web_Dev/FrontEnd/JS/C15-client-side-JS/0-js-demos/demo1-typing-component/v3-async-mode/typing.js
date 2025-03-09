/**
 * A typing component that simulates typing text character by character
 * v3 - Concurrent mode: allows adding text while other text is being typed
 * !   + well, we can do the same in v2 just by adding a new queue
 * !   + this version seems a bit too complex for this simple task
 *
 *
 *
 */
function typingComponent(elementId = "typing-output") {
  // DOM element where text will appear
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return null;
  }

  // State variables
  let isTyping = false;
  let queue = [];
  let shouldStop = false;
  let currentTypingPromise = null;
  let currentResolve = null;

  /**
   * Process the text queue, typing each item one at a time
   */
  function processQueue() {
    if (queue.length === 0 || isTyping) return;

    isTyping = true;
    const nextItem = queue.shift();

    typeText(nextItem.text, nextItem.speed)
      .then(() => {
        isTyping = false;
        if (nextItem.resolve) nextItem.resolve();
        processQueue();
      })
      .catch(() => {
        isTyping = false;
        if (nextItem.reject) nextItem.reject();
        processQueue();
      });
  }

  /**
   * Type text character by character
   * @param {string} text - The text to type
   * @param {number} speed - Typing speed in ms per character
   * @returns {Promise} - Resolves when typing is complete
   */
  function typeText(text, speed) {
    return new Promise((resolve, reject) => {
      currentResolve = resolve;

      let i = 0;
      shouldStop = false;

      function typeNextChar() {
        if (shouldStop) {
          currentResolve = null;
          return reject(new Error("Typing interrupted"));
        }

        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeNextChar, speed);
        } else {
          currentResolve = null;
          resolve();
        }
      }

      typeNextChar();
    });
  }

  return {
    /**
     * Add text to the typing queue - non-blocking
     * @param {string} text - The text to type
     * @param {number} speed - Typing speed in ms per character
     * @param {boolean} waitForCompletion - Whether to return a Promise that resolves when typing completes
     * @returns {Promise|undefined} - Promise that resolves when typing completes (if waitForCompletion=true)
     */
    addText(text, speed = 50, waitForCompletion = false) {
      if (waitForCompletion) {
        return new Promise((resolve, reject) => {
          queue.push({ text, speed, resolve, reject });
          processQueue();
        });
      } else {
        // Non-blocking mode - just add to queue and start processing
        queue.push({ text, speed });
        processQueue();
        return undefined;
      }
    },

    /**
     * Stop the current typing and clear the queue
     */
    stop() {
      shouldStop = true;
      queue = [];
    },

    /**
     * Clear the display
     */
    clear() {
      element.textContent = "";
    },

    /**
     * Interrupt current typing and start typing new text immediately
     * @param {string} text - The text to type
     * @param {number} speed - Typing speed in ms per character
     * @returns {Promise} - Promise that resolves when typing completes
     */
    interruptWith(text, speed = 50) {
      this.stop();
      return this.addText(text, speed, true);
    },

    /**
     * Check if component is currently typing
     * @returns {boolean} - True if typing is in progress
     */
    isTyping() {
      return isTyping;
    },

    /**
     * Get the current queue length
     * @returns {number} - Number of items in the queue
     */
    queueLength() {
      return queue.length;
    },
  };
}

/**
 * Demo function to showcase the typing component's concurrent capabilities
 */
async function demo3() {
  const typer = typingComponent();

  // Clear the display
  typer.clear();

  // Add initial text - blocking mode
  await typer.addText("Demo 3: Concurrent Typing Capability\n\n", 50, true);

  // Add a long text in non-blocking mode
  typer.addText(
    "This is a long text that will be typed character by character. ",
    100,
  );

  // After 1 second, add more text without waiting for the first to finish
  setTimeout(() => {
    typer.addText(
      "I'm adding this while the previous text is still typing! ",
      50,
    );
  }, 1000);

  // After 2.5 seconds, interrupt with new text
  setTimeout(() => {
    typer.interruptWith(
      "\n\n[INTERRUPTION] Previous typing stopped to show this important message!\n\n",
      30,
    );
  }, 2500);

  // After 4 seconds, add more text in non-blocking mode
  setTimeout(() => {
    typer.addText(
      "Back to normal typing. The queue continues processing texts. ",
      70,
    );
  }, 4000);

  // After 6 seconds, add multiple texts to the queue
  setTimeout(() => {
    typer.addText("You can also ", 50);
    typer.addText("queue multiple ", 50);
    typer.addText("short texts ", 50);
    typer.addText("in sequence!\n\n", 50);
  }, 6000);

  // Final message in blocking mode to ensure completion
  setTimeout(async () => {
    await typer.addText(
      "Demo complete! This new component allows concurrent typing operations.",
      50,
      true,
    );
    console.log("Demo finished");
  }, 9000);
}

// Add demo to window for HTML access
window.demo3 = demo3;
