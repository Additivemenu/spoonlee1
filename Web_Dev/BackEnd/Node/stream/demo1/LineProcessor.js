/**
 * LineProcessor - Transform Stream
 * Processes text line by line with progress tracking
 */

const { Transform } = require("stream");

class LineProcessor extends Transform {
  constructor(options = {}) {
    super(options);
    this.lineCount = 0;
    this.buffer = "";
    this.progressInterval = options.progressInterval || 100;
  }

  /**
   * Transforms incoming data chunks
   * - must implement _transform method
   * @param {*} chunk
   * @param {*} encoding
   * @param {*} callback
   */
  _transform(chunk, encoding, callback) {
    // Add chunk to buffer
    this.buffer += chunk.toString();

    // Split by newlines
    const lines = this.buffer.split("\n");

    // Keep the last partial line in buffer
    this.buffer = lines.pop();

    // Process complete lines
    lines.forEach((line) => {
      if (line.trim()) {
        this.lineCount++;

        //! Example processing: Convert to uppercase and add line number
        const processedLine = `[Line ${
          this.lineCount
        }] ${line.toUpperCase()}\n`;
        this.push(processedLine);

        // Show progress at intervals
        if (this.lineCount % this.progressInterval === 0) {
          console.log(`✅ Processed ${this.lineCount} lines...`);
        }
      }
    });

    callback();
  }

  /***
   * Flushes remaining data in buffer
   * must implement _flush method
   * 
   * @param {*} callback
   *
   */
  _flush(callback) {
    // Process any remaining data in buffer
    if (this.buffer.trim()) {
      this.lineCount++;
      const processedLine = `[Line ${
        this.lineCount
      }] ${this.buffer.toUpperCase()}\n`;
      this.push(processedLine);
    }
    console.log(`\n🎉 Total lines processed: ${this.lineCount}`);
    callback();
  }

  getLineCount() {
    return this.lineCount;
  }
}

module.exports = LineProcessor;
