/**
 * DEMO 2: HTTP Server with Streaming Responses
 *
 * Real-world scenario: Video/audio streaming service or large file downloads
 * This demo shows:
 * - Streaming file downloads
 * - Real-time data streaming
 * - Memory-efficient file serving
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { SERVER_CONFIG } = require("./config");
const {
  handleFileDownload,
  handleRealtimeStream,
  handleJsonStream,
} = require("./routeHandlers");
const { getHomepageHTML } = require("./htmlTemplate");

// Create HTTP server with routing
const server = http.createServer((req, res) => {
  console.log(`📥 ${req.method} ${req.url}`);

  // Router
  switch (req.url) {
    case SERVER_CONFIG.routes.home:
      handleHomepage(req, res);
      break;

    case SERVER_CONFIG.routes.download:
      handleFileDownload(req, res);
      break;

    case SERVER_CONFIG.routes.streamData:
      handleRealtimeStream(req, res);
      break;

    case SERVER_CONFIG.routes.streamJson:
      handleJsonStream(req, res);
      break;

    case SERVER_CONFIG.routes.clientJs:
      handleClientJs(req, res);
      break;

    default:
      handle404(req, res);
  }
});

/**
 * Handle homepage
 */
function handleHomepage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(getHomepageHTML());
}

/**
 * Handle client.js request
 */
function handleClientJs(req, res) {
  const clientJsPath = path.join(__dirname, "client.js");
  const clientJs = fs.readFileSync(clientJsPath, "utf8");
  res.writeHead(200, { "Content-Type": "application/javascript" });
  res.end(clientJs);
}

/**
 * Handle 404
 */
function handle404(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
}

// Start server
function startServer() {
  server.listen(SERVER_CONFIG.port, () => {
    console.log("=".repeat(60));
    console.log("DEMO 2: HTTP Streaming Server");
    console.log("=".repeat(60));
    console.log(
      `\n🚀 Server running at http://localhost:${SERVER_CONFIG.port}/`,
    );
    console.log("\n📋 Available endpoints:");
    console.log(
      `   • http://localhost:${SERVER_CONFIG.port}${SERVER_CONFIG.routes.home}           - Interactive demo page`,
    );
    console.log(
      `   • http://localhost:${SERVER_CONFIG.port}${SERVER_CONFIG.routes.download}   - File download stream`,
    );
    console.log(
      `   • http://localhost:${SERVER_CONFIG.port}${SERVER_CONFIG.routes.streamData} - Real-time SSE stream`,
    );
    console.log(
      `   • http://localhost:${SERVER_CONFIG.port}${SERVER_CONFIG.routes.streamJson} - JSON array stream`,
    );
    console.log("\n💡 Open your browser and try the interactive demo!");
    console.log("   Press Ctrl+C to stop the server\n");
  });
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n👋 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

// Run if this file is executed directly
if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };
