# Demo 2: HTTP Streaming Server

## Overview

Demonstrates HTTP streaming patterns including file downloads, Server-Sent Events (SSE), and progressive JSON streaming.

## Structure

```
demo2/
├── index.js              # Main server entry point
├── config.js             # Server configuration
├── routeHandlers.js      # HTTP route handlers
├── htmlTemplate.js       # Homepage HTML template
├── client.js             # Client-side JavaScript
└── README.md            # This file
```

## Modules

### index.js

Main server setup:

- Creates HTTP server
- Handles routing
- Manages server lifecycle

### config.js

Configuration management:

- Server port settings
- Route definitions
- Easy configuration updates

### routeHandlers.js

Stream route implementations:

- File download streaming
- Real-time SSE streaming
- JSON array streaming
- Progress tracking

### htmlTemplate.js

Interactive UI:

- Clean HTML template
- Responsive design
- Easy to customize

### client.js

Client-side logic:

- EventSource for SSE
- Fetch API for streaming
- UI state management

## Usage

```bash
# Start the server
node index.js

# Then open browser to:
# http://localhost:3000
```

## Features

### 1. File Download Streaming

- Memory-efficient file serving
- Progress tracking on server
- Handles client disconnection
- No full file load required

### 2. Real-Time Data (SSE)

- Server-Sent Events protocol
- Automatic reconnection
- Live updates every second
- Clean disconnect handling

### 3. JSON Array Streaming

- Progressive data loading
- Chunked transfer encoding
- Large dataset support
- Client-side buffering

## Learning Points

- ✅ HTTP response as writable stream
- ✅ Server-Sent Events (SSE)
- ✅ Chunked transfer encoding
- ✅ Backpressure handling
- ✅ Client disconnect detection
- ✅ Memory-efficient file serving
- ✅ Modular server architecture

## Configuration

Change port or routes in `config.js`:

```javascript
const SERVER_CONFIG = {
  port: 3001, // Change port here
  routes: {
    // Customize routes
  },
};
```

## Try This

1. Monitor memory usage while streaming large files
2. Open multiple browser tabs to test concurrent streams
3. Disconnect during streaming to see cleanup
4. Modify stream intervals for different speeds
