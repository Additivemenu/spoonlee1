/**
 * Route Handlers Module
 * Contains all HTTP route handler logic
 */

const fs = require("fs");
const path = require("path");

/**
 * Handle file download streaming
 */
function handleFileDownload(req, res) {
  const filePath = path.join(__dirname, "..", "demo1", "sample_input.txt");

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(
      "File not found. Please run demo1 first to create the sample file.",
    );
    return;
  }

  // Get file stats for Content-Length header
  const stat = fs.statSync(filePath);

  // Set appropriate headers
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": stat.size,
    "Content-Disposition": 'attachment; filename="download.txt"',
  });

  // Create read stream and pipe to response
  const readStream = fs.createReadStream(filePath);

  // Track progress
  let bytesRead = 0;
  readStream.on("data", (chunk) => {
    bytesRead += chunk.length;
    const progress = ((bytesRead / stat.size) * 100).toFixed(1);
    console.log(
      `📊 Download progress: ${progress}% (${bytesRead}/${stat.size} bytes)`,
    );
  });

  readStream.on("end", () => {
    console.log("✅ File download completed");
  });

  readStream.on("error", (err) => {
    console.error("❌ Error reading file:", err);
    res.end("Error reading file");
  });

  // Pipe the read stream to the response
  readStream.pipe(res);

  // Handle client disconnect
  req.on("close", () => {
    console.log("⚠️  Client disconnected, stopping stream");
    readStream.destroy();
  });
}

/**
 * Handle real-time data streaming (SSE)
 */
function handleRealtimeStream(req, res) {
  // Set headers for SSE
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  console.log("🔴 Started real-time streaming");

  let counter = 0;

  // Send data every second
  const interval = setInterval(() => {
    counter++;

    // Simulate real-time data (e.g., stock prices, sensor data, logs)
    const data = {
      timestamp: new Date().toISOString(),
      counter: counter,
      randomValue: Math.floor(Math.random() * 100),
      message: `Real-time update #${counter}`,
    };

    // SSE format: data: {json}\n\n
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    console.log(`📡 Sent update #${counter}`);

    // Stop after 20 updates (for demo purposes)
    if (counter >= 20) {
      clearInterval(interval);
      res.write('data: {"message": "Stream complete"}\n\n');
      res.end();
      console.log("✅ Real-time streaming completed");
    }
  }, 1000);

  // Handle client disconnect
  req.on("close", () => {
    console.log("⚠️  Client disconnected from real-time stream");
    clearInterval(interval);
    res.end();
  });
}

/**
 * Handle JSON array streaming
 */
function handleJsonStream(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  });

  console.log("📦 Started JSON streaming");

  // Start JSON array
  res.write("[");

  const totalItems = 100;
  let itemsSent = 0;

  // Simulate streaming large dataset
  const interval = setInterval(() => {
    itemsSent++;

    // Generate a data item
    const item = {
      id: itemsSent,
      name: `Item ${itemsSent}`,
      value: Math.random() * 1000,
      timestamp: Date.now(),
    };

    // Write item (with comma separator for valid JSON)
    const itemJson = JSON.stringify(item);
    res.write(itemsSent === 1 ? itemJson : `,${itemJson}`);

    if (itemsSent % 10 === 0) {
      console.log(`📊 Streamed ${itemsSent}/${totalItems} items`);
    }

    // Complete the stream
    if (itemsSent >= totalItems) {
      clearInterval(interval);
      res.write("]");
      res.end();
      console.log("✅ JSON streaming completed");
    }
  }, 50); // Send item every 50ms

  // Handle client disconnect
  req.on("close", () => {
    console.log("⚠️  Client disconnected from JSON stream");
    clearInterval(interval);
    res.end();
  });
}

module.exports = {
  handleFileDownload,
  handleRealtimeStream,
  handleJsonStream,
};
