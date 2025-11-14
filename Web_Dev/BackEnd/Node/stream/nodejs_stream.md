# Node.js Streams

## What is a Stream?

A **stream** is an abstract interface for working with streaming data in Node.js. Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an **efficient manner**.

### Key Benefits:

1. **Memory Efficiency**: Process data piece by piece instead of loading everything into memory
2. **Time Efficiency**: Start processing data as soon as you have it, without waiting for the entire payload
3. **Composability**: Chain operations together using pipes
4. **Backpressure Handling**: Automatically manage the flow of data to prevent overwhelming the system

### Real-World Analogy:

Think of a stream like a water pipe:

- **Traditional approach**: Fill a bucket with water, then pour it somewhere (load entire file → process)
- **Stream approach**: Connect pipes directly, water flows continuously (process data as it arrives)

---

## Types of Streams

Node.js has **four fundamental types** of streams:

### 1. **Readable Streams** 📖

Streams from which data can be **read**.

**Common Examples:**

- `fs.createReadStream()` - Read files
- `http.IncomingMessage` - HTTP requests (on server)
- `process.stdin` - Standard input
- `TCP sockets` (receiving data)

**Key Events:**

- `data` - Emitted when data is available
- `end` - Emitted when no more data
- `error` - Emitted when an error occurs
- `close` - Emitted when the stream is closed

**Example:**

```javascript
const fs = require("fs");
const readStream = fs.createReadStream("file.txt");

readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk);
});

readStream.on("end", () => {
  console.log("Finished reading");
});
```

---

### 2. **Writable Streams** 📝

Streams to which data can be **written**.

**Common Examples:**

- `fs.createWriteStream()` - Write to files
- `http.ServerResponse` - HTTP responses (on server)
- `process.stdout` - Standard output
- `TCP sockets` (sending data)

**Key Methods:**

- `write()` - Write data to the stream
- `end()` - Signal that no more data will be written

**Key Events:**

- `drain` - Emitted when the stream is ready to receive more data
- `finish` - Emitted when all data has been flushed
- `error` - Emitted when an error occurs

**Example:**

```javascript
const fs = require("fs");
const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello ");
writeStream.write("World!");
writeStream.end();

writeStream.on("finish", () => {
  console.log("Finished writing");
});
```

---

### 3. **Duplex Streams** 🔄

Streams that are **both Readable and Writable**.

**Common Examples:**

- `TCP sockets`
- `zlib streams` (compression/decompression)
- `crypto streams` (encryption/decryption)

**Characteristics:**

- Can read and write independently
- Two separate internal buffers for reading and writing
- Both sides operate independently

**Example:**

```javascript
const { Duplex } = require("stream");

const duplexStream = new Duplex({
  read(size) {
    this.push("Data from duplex");
    this.push(null); // Signal end
  },
  write(chunk, encoding, callback) {
    console.log("Writing:", chunk.toString());
    callback();
  },
});
```

---

### 4. **Transform Streams** 🔀

A special type of **Duplex stream** where the output is computed from the input.

**Common Examples:**

- `zlib.createGzip()` - Compress data
- `zlib.createGunzip()` - Decompress data
- `crypto.createCipheriv()` - Encrypt data
- `crypto.createDecipheriv()` - Decrypt data

**Characteristics:**

- Reads input, transforms it, and produces output
- Both sides are connected (unlike regular Duplex)
- Perfect for data modification pipelines

**Example:**

```javascript
const { Transform } = require("stream");

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});
```

---

## Stream Comparison Table

| Type          | Read | Write | Examples                     | Use Case              |
| ------------- | ---- | ----- | ---------------------------- | --------------------- |
| **Readable**  | ✅   | ❌    | File reading, HTTP requests  | Source of data        |
| **Writable**  | ❌   | ✅    | File writing, HTTP responses | Destination of data   |
| **Duplex**    | ✅   | ✅    | TCP sockets, WebSockets      | Two-way communication |
| **Transform** | ✅   | ✅    | Compression, encryption      | Data modification     |

---

## Piping Streams

The `.pipe()` method connects streams together:

```javascript
source.pipe(transform).pipe(destination);
```

**Example:**

```javascript
const fs = require("fs");
const zlib = require("zlib");

// Read file → Compress → Write to new file
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));
```

---

## When to Use Streams?

✅ **Use Streams When:**

- Working with large files (videos, logs, datasets)
- Real-time data processing
- Network communications
- Memory constraints are important
- You need backpressure handling

❌ **Don't Use Streams When:**

- Working with small data that fits in memory
- You need random access to data
- Simple operations where complexity isn't justified

---

## Common Patterns

### Pattern 1: Error Handling

```javascript
stream.on("error", (err) => {
  console.error("Stream error:", err);
});
```

### Pattern 2: Pipeline (Node.js 10+)

```javascript
const { pipeline } = require("stream");

pipeline(source, transform, destination, (err) => {
  if (err) {
    console.error("Pipeline failed:", err);
  } else {
    console.log("Pipeline succeeded");
  }
});
```

### Pattern 3: Async Iteration (Node.js 10+)

```javascript
async function processStream() {
  for await (const chunk of readableStream) {
    console.log(chunk);
  }
}
```

---

## Demo Applications

See the following demo files for practical examples:

1. **`demo1_file_processing.js`** - Large file processing with progress tracking
2. **`demo2_http_streaming.js`** - HTTP server with streaming responses
3. **`demo3_data_transformation.js`** - CSV processing with transform streams
