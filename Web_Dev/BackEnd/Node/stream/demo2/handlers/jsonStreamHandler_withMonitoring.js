/**
 * JSON Stream Handler - WITH MONITORING
 * This version demonstrates when and how res.write() sends data
 */

/**
 * Handle JSON array streaming with detailed monitoring
 */
function handleJsonStreamWithMonitoring(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  });

  console.log("📦 Started JSON streaming with monitoring\n");

  // Start JSON array
  res.write("[");

  const totalItems = 20; // Reduced for clearer demonstration
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

    const itemJson = JSON.stringify(item);
    const dataToWrite = itemsSent === 1 ? itemJson : `,${itemJson}`;

    // 🔍 MONITOR: Check state BEFORE write
    console.log(`\n📤 Writing item ${itemsSent}:`);
    console.log(`   Buffer before: ${res.writableLength} bytes`);
    console.log(`   Data size: ${Buffer.byteLength(dataToWrite)} bytes`);

    // ⏱️ Measure how long write() takes
    const startTime = process.hrtime.bigint();
    const canWrite = res.write(dataToWrite);
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;

    // 🔍 MONITOR: Check state AFTER write
    console.log(`   Write took: ${durationMs.toFixed(3)}ms`);
    console.log(`   Can write more: ${canWrite}`);
    console.log(`   Buffer after: ${res.writableLength} bytes`);
    console.log(`   High water mark: ${res.writableHighWaterMark} bytes`);

    // 🚨 Detect backpressure
    if (!canWrite) {
      console.log(`   ⚠️  BACKPRESSURE! Buffer is full, should pause.`);
    }

    // Complete the stream
    if (itemsSent >= totalItems) {
      clearInterval(interval);
      res.write("]");
      res.end();
      console.log("\n✅ JSON streaming completed");
    }
  }, 100); // Slower interval for better observation

  // Handle client disconnect
  req.on("close", () => {
    console.log("\n⚠️  Client disconnected from JSON stream");
    clearInterval(interval);
    res.end();
  });

  // 🔍 MONITOR: Track when data is actually drained from buffer
  res.on("drain", () => {
    console.log("\n🌊 DRAIN event: Buffer has been flushed, can write more!");
  });
}

module.exports = { handleJsonStreamWithMonitoring };
