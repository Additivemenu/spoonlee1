/**
 * Real-time Stream Handler
 * Handles Server-Sent Events (SSE) streaming
 */

/**
 * Handle real-time data streaming (SSE)
 */
function handleRealtimeStream(req, res) {
  console.log("1. Headers sent?", res.headersSent); // false
  //! send headers to client right away for SSE, note Headers Can Only Be Sent Once ⚠️
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  console.log("2. Headers sent?", res.headersSent); // true ✅
  // ↑ At this point, headers are already flushed to client!
  // Now the SSE connection is established
  // Client is waiting for data events
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

    //! SSE format: data: {json}\n\n
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    // ↑ Body data follows in the established connection
    console.log(`📡 Sent update #${counter}`);

    // Stop after 20 updates (for demo purposes)
    if (counter >= 20) {
      clearInterval(interval);
      res.write('data: {"message": "Stream complete"}\n\n');
      res.end();
      console.log("✅ Real-time streaming completed");
    }
  }, 1000);

  //! Handle client disconnect, important to prevent memory leaks
  req.on("close", () => {
    console.log("⚠️  Client disconnected from real-time stream");
    clearInterval(interval);
    res.end();
  });
}

module.exports = { handleRealtimeStream };
