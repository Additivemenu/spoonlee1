/**
 * Creates a text typing component that types text character by character.
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

  // Function to type a single text
  const typeText = (text, typingSpeed) => {
    isTyping = true;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        currentTimeout = setTimeout(type, typingSpeed);
      } else {
        isTyping = false;
        processQueue(); // Process next item in queue
      }
    };

    type();
  };

  // Function to process the queue
  const processQueue = () => {
    if (queue.length > 0 && !isTyping) {
      const nextItem = queue.shift();
      typeText(nextItem.text, nextItem.speed);
    }
  };

  // Create the component instance
  return {
    /**
     * Adds text to the typing queue
     * @param {string} text - The text to add to the typing queue
     * @param {number} speed - The typing speed in milliseconds (default: 100)
     * @returns {Object} - Returns the component for method chaining
     */
    addText: function (text, speed = 100) {
      queue.push({ text, speed });
      if (!isTyping) {
        processQueue();
      }
      return this; // For method chaining
    },

    /**
     * Clears all text and the typing queue
     * @returns {Object} - Returns the component for method chaining
     */
    clear: function () {
      textElement.textContent = "";
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
      queue.length = 0;
      isTyping = false;
      return this;
    },

    /**
     * Sets the typing speed for future text additions
     * @param {number} speed - The typing speed in milliseconds
     * @returns {Object} - Returns the component for method chaining
     */
    setSpeed: function (speed) {
      this.defaultSpeed = speed;
      return this;
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
function demo() {
  const typer = typingComponent();
  typer
    .clear()
    .addText("Hello! ", 100)
    .addText("This is a typing component demonstration. ", 50)
    .addText("Text appears character by character at a defined speed. ", 60)
    .addText(
      "You can queue multiple texts and they'll be typed one after another. ",
      50,
    )
    .addText("Try creating your own typing animations!", 40)
    .addText(" Hello again! ", 100);
}
