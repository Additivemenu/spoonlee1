/**
 * 404 Not Found Handler
 * Handles requests to undefined routes
 */

/**
 * Handle 404
 */
function handle404(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
}

module.exports = { handle404 };
