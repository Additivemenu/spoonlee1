/**
 * JSON Stream Handler
 * Handles streaming JSON array data
 */

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

module.exports = { handleJsonStream };
