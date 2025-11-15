const path = require("path");
const express = require("express");
const app = express();

const PORT = 3001;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

/**
 * Conversation state:
 * - chunks: all chunks in order (append-only "log")
 * - subscribers: active SSE connections
 */
const conversation = {
  chunks: [],
  subscribers: new Set(),
};

/**
 *! Simulate AI provider returning a new chat chunk every 0.5s
 */
let counter = 0;
setInterval(() => {
  const newChunk = `chunk-${counter++} at ${new Date().toISOString()}`;

  // 1. Append to the in-memory log
  conversation.chunks.push(newChunk);

  // 2. Push to all currently connected clients of new AI chat chunk
  for (const sub of conversation.subscribers) {
    const index = conversation.chunks.length - 1;
    sub.res.write(`data: ${JSON.stringify({ index, chunk: newChunk })}\n\n`);
  }

  console.log("Generated:", newChunk);
}, 500);

/**
 * SSE endpoint
 *
 * Client can call: GET /stream?offset=NUMBER
 * - offset: the next chunk index the client wants
 *   e.g. if client last got index 5, they reconnect with offset=6
 *   If they want from the beginning, use offset=0.
 */
app.get("/stream", (req, res) => {
  const offset = Number(req.query.offset || "0");

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client connected with offset", offset);

  //! 1. Replay existing chunks from the requested offset
  for (let i = offset; i < conversation.chunks.length; i++) {
    res.write(
      `data: ${JSON.stringify({
        index: i,
        chunk: conversation.chunks[i],
      })}\n\n`,
    );
  }

  //! 2. Subscribe this client for future chunks
  const subscriber = { res };
  conversation.subscribers.add(subscriber);

  // 3. Cleanup when client disconnects
  req.on("close", () => {
    conversation.subscribers.delete(subscriber);
    console.log("Client disconnected");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`SSE demo running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
