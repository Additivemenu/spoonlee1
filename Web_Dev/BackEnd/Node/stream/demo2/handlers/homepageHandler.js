/**
 * Homepage Handler
 * Handles requests to the root path
 */

const { getHomepageHTML } = require("../public/htmlTemplate");

/**
 * Handle homepage
 */
function handleHomepage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(getHomepageHTML());
}

module.exports = { handleHomepage };
