/**
 * Client JS Handler
 * Handles serving the client-side JavaScript file
 */

const fs = require("fs");
const path = require("path");

/**
 * Handle client.js request
 */
function handleClientJs(req, res) {
  const clientJsPath = path.join(__dirname, "..", "public", "client.js");
  const clientJs = fs.readFileSync(clientJsPath, "utf8");
  res.writeHead(200, { "Content-Type": "application/javascript" });
  res.end(clientJs);
}

module.exports = { handleClientJs };
