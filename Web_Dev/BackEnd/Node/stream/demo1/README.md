# Demo 1: Large File Processing

## Overview

Demonstrates efficient processing of large files using Node.js streams with progress tracking.

## Structure

```
demo1/
├── index.js              # Main entry point
├── LineProcessor.js      # Custom Transform stream
├── fileGenerator.js      # Sample file creation
├── fileProcessor.js      # File processing logic
└── README.md            # This file
```

## Modules

### LineProcessor.js

Custom Transform stream that:

- Processes text line by line
- Converts text to uppercase
- Adds line numbers
- Tracks progress

### fileGenerator.js

Utility for creating sample test files:

- Generates files with configurable line count
- Uses streams for memory efficiency

### fileProcessor.js

Core processing logic:

- Creates read/write streams
- Configures chunk size
- Handles errors
- Returns processing statistics

## Usage

```bash
# Run the demo
node index.js
```

## Configuration Options

```javascript
await processLargeFile(inputFile, outputFile, {
  chunkSize: 64 * 1024, // Chunk size in bytes
  progressInterval: 100, // Progress update frequency
});
```

## Learning Points

- ✅ Readable streams (`fs.createReadStream`)
- ✅ Writable streams (`fs.createWriteStream`)
- ✅ Transform streams (custom `LineProcessor`)
- ✅ Stream piping with `pipeline()`
- ✅ Error handling in streams
- ✅ Progress tracking
- ✅ Memory-efficient processing

## Try This

1. Change the line count in `createSampleFile()`
2. Modify chunk size for performance testing
3. Add your own transformation logic in `LineProcessor`
