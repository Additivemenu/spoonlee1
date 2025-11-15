/**
 * File Download Handler
 * Handles streaming file downloads
 */

const fs = require("fs");
const path = require("path");

/**
 * Handle file download streaming
 *
 *  readStream --> res --> client
 *     /\
 *     |
 *     |
 *   file data
 *
 */
function handleFileDownload(req, res) {
  const filePath = path.join(__dirname, "..", "public", "sample_input.txt");

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

  //! Create read stream and pipe to response
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

  //! Pipe the read stream to the response
  readStream.pipe(res);

  // Handle client disconnect
  req.on("close", () => {
    console.log("⚠️  Client disconnected, stopping stream");
    readStream.destroy();
  });
}

module.exports = { handleFileDownload };
