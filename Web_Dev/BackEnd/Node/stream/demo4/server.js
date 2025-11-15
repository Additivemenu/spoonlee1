const path = require("path");
const express = require("express");
const app = express();

const PORT = 3001;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

/**
 * Conversation state:
 * - chunks: all chunks in order (append-only "log")
 * - isStreamingComplete: flag to indicate if AI simulation is done
 */
const conversation = {
  chunks: [], // append-only log of all chat chunks
  isStreamingComplete: false, // flag to indicate if AI simulation is done
};

/**
 *! Simulate AI provider returning a new chat chunk every 0.5s for 20 seconds
 */
let counter = 0;
const startTime = Date.now();
const DURATION = 20000; // 20 seconds

const aiSimulation = setInterval(() => {
  const elapsed = Date.now() - startTime;

  if (elapsed >= DURATION) {
    clearInterval(aiSimulation);
    conversation.isStreamingComplete = true;
    console.log("AI simulation complete - 20 seconds elapsed");
    return;
  }

  const newChunk = `chunk-${counter++} at ${new Date().toISOString()}`;

  // Append to the in-memory log
  conversation.chunks.push(newChunk);

  console.log("Generated:", newChunk);
}, 50);

/**
 * SSE endpoint
 *
 * Client connects to: GET /stream
 * Streams all chunks from the array, keeps checking for new chunks
 */
app.get("/stream", (req, res) => {
  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client connected");

  let lastSentIndex = -1;

  //! Stream all existing chunks and keep checking for new ones
  // periodically check the append-only log for new chunks
  const streamInterval = setInterval(() => {
    // Send any new chunks that have been added to the array
    for (let i = lastSentIndex + 1; i < conversation.chunks.length; i++) {
      res.write(
        `data: ${JSON.stringify({
          index: i,
          chunk: conversation.chunks[i],
        })}\n\n`,
      );
      lastSentIndex = i;
    }

    // If streaming is complete and all chunks have been sent, clean up
    if (
      conversation.isStreamingComplete &&
      lastSentIndex >= conversation.chunks.length - 1
    ) {
      clearInterval(streamInterval);
      console.log("All chunks streamed, interval cleaned up");
    }
  }, 500); //! Check every 500ms for new chunks, it will be chunky if interval is too long

  // Cleanup when client disconnects
  req.on("close", () => {
    clearInterval(streamInterval);
    console.log("Client disconnected");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`SSE demo running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
