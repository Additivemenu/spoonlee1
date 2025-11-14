/**
 * Output Formatter Streams
 * Convert objects to JSON and CSV formats
 */

const { Transform } = require("stream");

/**
 * JSON Formatter - Converts objects to JSON array format
 */
class JSONFormatter extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true, readableObjectMode: false });
    this.isFirst = true;
  }

  _transform(row, encoding, callback) {
    const json = JSON.stringify(row, null, 2);

    if (this.isFirst) {
      this.push("[\n" + json);
      this.isFirst = false;
    } else {
      this.push(",\n" + json);
    }

    callback();
  }

  _flush(callback) {
    this.push("\n]\n");
    callback();
  }
}

/**
 * CSV Formatter - Converts objects to CSV format
 */
class CSVFormatter extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true, readableObjectMode: false });
    this.isFirst = true;
  }

  _transform(row, encoding, callback) {
    if (this.isFirst) {
      // Write headers
      const headers = Object.keys(row).join(",");
      this.push(headers + "\n");
      this.isFirst = false;
    }

    // Write values
    const values = Object.values(row).join(",");
    this.push(values + "\n");

    callback();
  }
}

module.exports = { JSONFormatter, CSVFormatter };
