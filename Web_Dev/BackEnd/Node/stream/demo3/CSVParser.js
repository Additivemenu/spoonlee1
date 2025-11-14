/**
 * CSV Parser Transform Stream
 * Converts CSV lines to JavaScript objects
 */

const { Transform } = require("stream");

class CSVParser extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.headers = null;
    this.rowCount = 0;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // First line is headers
      if (!this.headers) {
        this.headers = trimmedLine.split(",").map((h) => h.trim());
        console.log(`📋 CSV Headers: ${this.headers.join(", ")}`);
        return;
      }

      // Parse data rows
      const values = trimmedLine.split(",").map((v) => v.trim());
      const row = {};

      this.headers.forEach((header, index) => {
        row[header] = values[index];
      });

      this.rowCount++;
      this.push(row);
    });

    callback();
  }

  _flush(callback) {
    console.log(`✅ CSV Parser: Processed ${this.rowCount} rows`);
    callback();
  }
}

module.exports = CSVParser;
