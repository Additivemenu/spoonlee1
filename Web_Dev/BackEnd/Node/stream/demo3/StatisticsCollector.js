/**
 * Statistics Collector Transform Stream
 * Collects statistics while data flows through
 */

const { Transform } = require("stream");

class StatisticsCollector extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.stats = {
      totalRecords: 0,
      ageGroups: {},
      emailDomains: {},
      averageAge: 0,
      totalAge: 0,
    };
  }

  _transform(row, encoding, callback) {
    // Collect statistics
    this.stats.totalRecords++;
    this.stats.totalAge += row.age;

    // Count age groups
    this.stats.ageGroups[row.ageGroup] =
      (this.stats.ageGroups[row.ageGroup] || 0) + 1;

    // Count email domains
    this.stats.emailDomains[row.emailDomain] =
      (this.stats.emailDomains[row.emailDomain] || 0) + 1;

    // Pass through the row unchanged
    this.push(row);
    callback();
  }

  _flush(callback) {
    this.stats.averageAge = (
      this.stats.totalAge / this.stats.totalRecords
    ).toFixed(1);

    this.printStats();
    callback();
  }

  printStats() {
    console.log("\n📊 STATISTICS:");
    console.log("=".repeat(60));
    console.log(`Total Records: ${this.stats.totalRecords}`);
    console.log(`Average Age: ${this.stats.averageAge}`);
    console.log("\nAge Groups:");
    Object.entries(this.stats.ageGroups).forEach(([group, count]) => {
      console.log(`  ${group}: ${count}`);
    });
    console.log("\nEmail Domains:");
    Object.entries(this.stats.emailDomains).forEach(([domain, count]) => {
      console.log(`  ${domain}: ${count}`);
    });
    console.log("=".repeat(60));
  }

  getStats() {
    return this.stats;
  }
}

module.exports = StatisticsCollector;
