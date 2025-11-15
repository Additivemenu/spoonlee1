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
  chunks: [], // append-only log of all chat chunks
  subscribers: new Set(), // active SSE connections
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
    // Skip subscribers that are still replaying old chunks
    if (sub.isReplaying) continue;

    const index = conversation.chunks.length - 1;
    sub.res.write(`data: ${JSON.stringify({ index, chunk: newChunk })}\n\n`);
  }

  console.log("Generated:", newChunk);
}, 50);

/**
 * SSE endpoint
 *
 * Client connects to: GET /stream
 * On reconnection, server always replays all chunks from the beginning
 */
app.get("/stream", (req, res) => {
  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client connected");

  // 1. Snapshot the current chunk count before subscribing
  const replayUntil = conversation.chunks.length;

  // 2. Subscribe this client for future chunks (but mark as replaying)
  const subscriber = { res, isReplaying: true };
  conversation.subscribers.add(subscriber);

  // 3. Replay chunks that existed at connection time
  // During replay, this subscriber won't receive broadcasts (isReplaying=true)
  for (let i = 0; i < replayUntil; i++) {
    res.write(
      `data: ${JSON.stringify({
        index: i,
        chunk: conversation.chunks[i],
      })}\n\n`,
    );
  }

  // 4. Mark replay as complete - now can receive broadcasts
  subscriber.isReplaying = false;

  // 5. Cleanup when client disconnects
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
