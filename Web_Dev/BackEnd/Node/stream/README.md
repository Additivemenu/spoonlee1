# Node.js Streams Demo Collection

This directory contains comprehensive learning materials and practical demos for understanding Node.js streams.

## 📚 Contents

- **`nodejs_stream.md`** - Complete theory and concepts guide
- **`demo1/`** - Large file processing (modular)
- **`demo2/`** - HTTP server with streaming (modular)
- **`demo3/`** - CSV data transformation pipeline (modular)

---

## 🚀 Quick Start

### Prerequisites

- Node.js installed (version 10+)
- Basic understanding of JavaScript

### New Modular Structure

All demos have been refactored into separate folders with modular, reusable components. Each demo now has its own README with detailed documentation.

### Running the Demos

#### Demo 1: File Processing

```bash
cd demo1
node index.js
```

**Modular Structure:**

```
demo1/
├── index.js              # Main entry point
├── LineProcessor.js      # Transform stream
├── fileGenerator.js      # File creation utility
├── fileProcessor.js      # Processing logic
└── README.md            # Detailed documentation
```

**What it does:**

- Creates a sample text file with 1000 lines
- Processes it using streams
- Transforms each line (uppercase + line numbers)
- Tracks progress in real-time
- Shows memory efficiency benefits

**Key learning points:**

- Readable streams (`fs.createReadStream`)
- Writable streams (`fs.createWriteStream`)
- Transform streams (custom line processor)
- Progress tracking
- Memory-efficient large file handling

---

#### Demo 2: HTTP Streaming

```bash
cd demo2
node index.js
```

Then open your browser to: **http://localhost:3000**

**Modular Structure:**

```
demo2/
├── index.js              # Server entry point
├── config.js             # Configuration
├── routeHandlers.js      # Stream handlers
├── htmlTemplate.js       # UI template
├── client.js             # Client-side code
└── README.md            # Detailed documentation
```

**What it does:**

- Starts an HTTP server with interactive UI
- Demonstrates file downloads via streams
- Shows real-time data streaming (Server-Sent Events)
- Streams large JSON arrays progressively

**Key learning points:**

- HTTP response as writable stream
- Server-Sent Events (SSE) for real-time data
- Chunked transfer encoding
- Handling client disconnections
- Memory-efficient file serving
- Modular server architecture

**Available endpoints:**

- `/` - Interactive demo page
- `/download` - Stream file download
- `/stream-data` - Real-time SSE updates
- `/stream-json` - Progressive JSON streaming

---

#### Demo 3: Data Transformation

```bash
cd demo3
node index.js
```

**Modular Structure:**

```
demo3/
├── index.js                  # Main entry point
├── CSVParser.js             # CSV parser stream
├── DataValidator.js         # Validation stream
├── DataEnricher.js          # Enrichment stream
├── StatisticsCollector.js   # Stats collection
├── formatters.js            # Output formatters
├── csvGenerator.js          # Sample data generator
├── csvProcessor.js          # Pipeline orchestration
└── README.md               # Detailed documentation
```

**What it does:**

- Creates a sample CSV file
- Parses CSV using streams
- Validates and filters data
- Enriches data with computed fields
- Collects statistics in real-time
- Outputs to both JSON and CSV formats

**Key learning points:**

- Custom Transform streams in object mode
- Object mode streams
- Chaining multiple transforms
- Splitting stream output (multiple destinations)
- ETL (Extract, Transform, Load) patterns
- Real-time statistics collection
- Reusable stream components

**Output files:**

- `output_data.json` - Enriched data in JSON format
- `output_data.csv` - Enriched data in CSV format

---

## 🎯 Learning Path

If you're new to streams, follow this order:

1. **Read** `nodejs_stream.md` - Understand concepts
2. **Run** Demo 1 - See basic stream operations
3. **Run** Demo 2 - Explore HTTP streaming
4. **Run** Demo 3 - Master complex transformations

---

## 💡 Key Concepts Covered

### Stream Types

- ✅ **Readable** - Read data from a source
- ✅ **Writable** - Write data to a destination
- ✅ **Duplex** - Both readable and writable
- ✅ **Transform** - Modify data as it passes through

### Common Patterns

- ✅ Piping streams together
- ✅ Error handling
- ✅ Backpressure management
- ✅ Progress tracking
- ✅ Multiple output destinations
- ✅ Custom transform streams

### Real-World Use Cases

- ✅ Large file processing
- ✅ Video/audio streaming
- ✅ Real-time data feeds
- ✅ ETL operations
- ✅ Log processing
- ✅ API data pagination

---

## 🔧 Extending the Demos

### Demo 1 - Add Custom Transform

```javascript
// Create a new transform in demo1/
class CustomTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Your custom logic here
    this.push(chunk);
    callback();
  }
}
```

### Demo 2 - Add New Endpoint

```javascript
// In demo2/routeHandlers.js, add:
function handleNewEndpoint(req, res) {
  // Your streaming logic here
}
module.exports = { ..., handleNewEndpoint };
```

### Demo 3 - Custom Validation Rules

```javascript
// In demo3/index.js, pass custom options:
await processCSVData(inputFile, outputJsonFile, outputCsvFile, {
  validationRules: (row) => row.age > 21 && row.city !== "",
});
```

## 🎨 Benefits of Modular Structure

- ✅ **Reusable Components** - Each module can be imported independently
- ✅ **Easy Testing** - Test individual components in isolation
- ✅ **Better Organization** - Clear separation of concerns
- ✅ **Scalability** - Easy to add new features
- ✅ **Maintainability** - Changes are localized to specific modules
- ✅ **Learning** - Understand one component at a time

---

## 🐛 Troubleshooting

### Port Already in Use (Demo 2)

```bash
# Edit demo2/config.js
const SERVER_CONFIG = {
  port: 3001,  // Change to different port
  // ...
};
```

### File Not Found

Make sure you're in the correct demo directory:

```bash
cd demo1  # or demo2, demo3
node index.js
```

### Memory Issues

Adjust chunk size in demo1/fileProcessor.js:

```javascript
fs.createReadStream(file, {
  highWaterMark: 16 * 1024, // Reduce chunk size
});
```

### Import Errors

Each demo is self-contained. Run from within the demo directory:

```bash
# Wrong: node demo1/index.js
# Right:
cd demo1
node index.js
```

---

## 📖 Additional Resources

- [Node.js Stream Documentation](https://nodejs.org/api/stream.html)
- [Stream Handbook](https://github.com/substack/stream-handbook)
- [Understanding Streams](https://nodesource.com/blog/understanding-streams-in-nodejs/)

---

## 🎓 Practice Exercises

After running the demos, try these challenges:

1. **Modify Demo 1**: Add a filter to only process lines containing specific keywords
2. **Modify Demo 2**: Create a new endpoint that streams video or audio files
3. **Modify Demo 3**: Add a new transform that sorts data by age before outputting
4. **Create Your Own**: Build a stream that monitors system logs and alerts on errors

---

## 📝 Notes

- ✅ All demos are now **modular and reusable**
- ✅ Each demo creates sample files automatically
- ✅ Files are created in their respective demo directories
- ✅ Demo 2 server runs until you press Ctrl+C
- ✅ All demos include detailed console logging
- ✅ Each demo has its own README with detailed documentation
- ✅ Components can be imported and reused in your own projects

## 📁 Project Structure

```
stream/
├── README.md                      # Main documentation (you are here)
├── nodejs_stream.md              # Theory and concepts
├── demo1/                        # File processing demo
│   ├── index.js                  # Entry point
│   ├── LineProcessor.js          # Transform stream
│   ├── fileGenerator.js          # Utilities
│   ├── fileProcessor.js          # Core logic
│   └── README.md                 # Demo 1 docs
├── demo2/                        # HTTP streaming demo
│   ├── index.js                  # Server
│   ├── config.js                 # Configuration
│   ├── routeHandlers.js          # Handlers
│   ├── htmlTemplate.js           # UI
│   ├── client.js                 # Client code
│   └── README.md                 # Demo 2 docs
└── demo3/                        # CSV transformation demo
    ├── index.js                  # Entry point
    ├── CSVParser.js              # Parser
    ├── DataValidator.js          # Validator
    ├── DataEnricher.js           # Enricher
    ├── StatisticsCollector.js   # Stats
    ├── formatters.js             # Formatters
    ├── csvGenerator.js           # Generator
    ├── csvProcessor.js           # Pipeline
    └── README.md                 # Demo 3 docs
```

Happy streaming! 🌊
