const input = document.getElementById("demoInput");
const logContainer = document.getElementById("logContainer");
let eventCounter = 0;

function addLogEntry(eventType, message, additionalInfo = "") {
  eventCounter++;
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = document.createElement("div");
  logEntry.className = `log-entry ${eventType}-event`;

  logEntry.innerHTML = `
                <strong>#${eventCounter} ${eventType.toUpperCase()}</strong> 
                <span class="timestamp">[${timestamp}]</span><br>
                ${message}
                ${additionalInfo ? `<br><small>${additionalInfo}</small>` : ""}
            `;

  // Remove the initial placeholder message
  if (
    logContainer.children.length === 1 &&
    logContainer.children[0].textContent === "Event log will appear here..."
  ) {
    logContainer.innerHTML = "";
  }

  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Paste event handler
input.addEventListener("paste", function (e) {
  const clipboardData = e.clipboardData.getData("text");
  const currentValue = e.target.value;

  addLogEntry(
    "paste",
    `Paste event triggered!`,
    `Clipboard contains: "${clipboardData}" | Current input value: "${currentValue}"`,
  );
});

// Input event handler
input.addEventListener("input", function (e) {
  const newValue = e.target.value;
  const inputType = e.inputType || "unknown";

  addLogEntry(
    "input",
    `Input value changed to: "${newValue}"`,
    `Input type: ${inputType}`,
  );
});

// Change event handler
input.addEventListener("change", function (e) {
  const finalValue = e.target.value;

  addLogEntry(
    "change",
    `Change event fired! Final value: "${finalValue}"`,
    `This fires when the input loses focus and the value has changed`,
  );
});

// Focus events for additional context
input.addEventListener("focus", function (e) {
  addLogEntry(
    "focus",
    `Input gained focus. Current value: "${e.target.value}"`,
    ``,
  );
});

function clearLog() {
  logContainer.innerHTML = '<div class="log-entry">Event log cleared...</div>';
  eventCounter = 0;
}

// Add some initial helpful text
setTimeout(() => {
  addLogEntry(
    "initial message",
    "Demo ready! Try typing, pasting, or clicking outside the input field.",
    "",
  );
}, 500);
