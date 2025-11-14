/**
 * Client-side JavaScript
 * Handles UI interactions and streaming
 */

let eventSource = null;

function log(message, isError = false) {
  const output = document.getElementById("output");
  const time = new Date().toLocaleTimeString();
  output.innerHTML += `[${time}] ${message}\n`;
  output.scrollTop = output.scrollHeight;
}

function setStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.className = "status " + (isError ? "error" : "success");
  status.textContent = message;
  setTimeout(() => (status.textContent = ""), 5000);
}

function downloadFile() {
  log("📥 Starting file download...");
  window.open("/download", "_blank");
  setStatus("File download started!");
}

function startRealtime() {
  if (eventSource) {
    log("⚠️  Stream already running", true);
    return;
  }

  log("🔴 Starting real-time stream...");
  eventSource = new EventSource("/stream-data");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    log(`📡 ${data.message} - Value: ${data.randomValue}`);
  };

  eventSource.onerror = () => {
    log("✅ Stream ended or error occurred");
    stopRealtime();
  };

  setStatus("Real-time stream started!");
}

function stopRealtime() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    log("⏹️  Stopped real-time stream");
    setStatus("Stream stopped");
  }
}

async function streamJson() {
  log("📦 Starting JSON stream...");
  try {
    const response = await fetch("/stream-json");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    let itemCount = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Count items (simple approach for demo)
      const matches = buffer.match(/"id":/g);
      if (matches && matches.length > itemCount) {
        itemCount = matches.length;
        log(`📊 Received ${itemCount} items...`);
      }
    }

    const data = JSON.parse(buffer);
    log(`✅ Completed! Received ${data.length} total items`);
    setStatus(`Successfully streamed ${data.length} items`);
  } catch (error) {
    log(`❌ Error: ${error.message}`, true);
    setStatus("Error streaming JSON", true);
  }
}
