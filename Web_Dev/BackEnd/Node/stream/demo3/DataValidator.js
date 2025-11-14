/**
 * Data Validator Transform Stream
 * Validates and filters data based on rules
 */

const { Transform } = require("stream");

class DataValidator extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.validCount = 0;
    this.invalidCount = 0;
    this.validationRules = options.validationRules || this.defaultRules;
  }

  defaultRules(row) {
    return (
      row.name &&
      row.email &&
      row.age &&
      !isNaN(row.age) &&
      row.email.includes("@")
    );
  }

  _transform(row, encoding, callback) {
    const isValid = this.validationRules(row);

    if (isValid) {
      this.validCount++;
      this.push(row);
    } else {
      this.invalidCount++;
      console.log(`⚠️  Invalid row: ${JSON.stringify(row)}`);
    }

    callback();
  }

  _flush(callback) {
    console.log(
      `✅ Validator: ${this.validCount} valid, ${this.invalidCount} invalid rows`,
    );
    callback();
  }

  getStats() {
    return {
      valid: this.validCount,
      invalid: this.invalidCount,
      total: this.validCount + this.invalidCount,
    };
  }
}

module.exports = DataValidator;
