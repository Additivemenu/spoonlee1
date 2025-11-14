/**
 * HTML Template Module
 * Contains the homepage HTML template
 */

function getHomepageHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Node.js Streaming Demo</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #333; }
    .endpoint { background: #f4f4f4; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .endpoint h3 { margin-top: 0; color: #0066cc; }
    button { background: #0066cc; color: white; padding: 10px 20px; border: none; 
             border-radius: 5px; cursor: pointer; margin: 5px; }
    button:hover { background: #0052a3; }
    #output { background: #000; color: #0f0; padding: 15px; border-radius: 5px; 
              font-family: monospace; height: 300px; overflow-y: auto; }
    .status { margin: 10px 0; padding: 10px; border-radius: 5px; }
    .success { background: #d4edda; color: #155724; }
    .error { background: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <h1>🌊 Node.js Streaming Demo Server</h1>
  <p>This server demonstrates various streaming capabilities in Node.js</p>

  <div class="endpoint">
    <h3>1. File Download Stream</h3>
    <p>Downloads a file using streams (memory efficient)</p>
    <button onclick="downloadFile()">Download File</button>
  </div>

  <div class="endpoint">
    <h3>2. Real-time Data Stream (SSE)</h3>
    <p>Streams real-time updates using Server-Sent Events</p>
    <button onclick="startRealtime()">Start Real-time Stream</button>
    <button onclick="stopRealtime()">Stop Stream</button>
  </div>

  <div class="endpoint">
    <h3>3. JSON Data Stream</h3>
    <p>Streams large JSON arrays progressively</p>
    <button onclick="streamJson()">Stream JSON Data</button>
  </div>

  <div id="status"></div>
  <h3>Output:</h3>
  <div id="output"></div>

  <script src="/client.js"></script>
</body>
</html>
  `;
}

module.exports = { getHomepageHTML };
