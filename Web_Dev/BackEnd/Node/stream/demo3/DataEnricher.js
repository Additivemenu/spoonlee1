/**
 * Data Enricher Transform Stream
 * Adds computed fields and enriches data
 */

const { Transform } = require("stream");

class DataEnricher extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.enrichedCount = 0;
    this.enrichmentFunctions =
      options.enrichmentFunctions || this.defaultEnrichments();
  }

  defaultEnrichments() {
    return [
      (row) => ({ ...row, age: parseInt(row.age) }),
      (row) => ({ ...row, ageGroup: this.getAgeGroup(row.age) }),
      (row) => ({ ...row, emailDomain: row.email.split("@")[1] }),
      (row) => ({ ...row, processedAt: new Date().toISOString() }),
      (row) => ({ ...row, isAdult: row.age >= 18 }),
      (row) => ({ ...row, nameLength: row.name.length }),
    ];
  }

  _transform(row, encoding, callback) {
    let enrichedRow = { ...row };

    // Apply all enrichment functions
    this.enrichmentFunctions.forEach((fn) => {
      enrichedRow = fn.call(this, enrichedRow);
    });

    this.enrichedCount++;
    this.push(enrichedRow);
    callback();
  }

  getAgeGroup(age) {
    if (age < 18) return "Minor";
    if (age < 30) return "Young Adult";
    if (age < 50) return "Adult";
    return "Senior";
  }

  _flush(callback) {
    console.log(`✅ Enricher: Enriched ${this.enrichedCount} rows`);
    callback();
  }
}

module.exports = DataEnricher;
