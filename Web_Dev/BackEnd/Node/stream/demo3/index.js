/**
 * DEMO 3: CSV Data Transformation Pipeline
 *
 * Real-world scenario: ETL (Extract, Transform, Load) operations on large datasets
 * This demo shows:
 * - Reading CSV files
 * - Data transformation with custom logic
 * - Data validation and filtering
 * - Multiple transform streams chained together
 * - Writing to multiple outputs (JSON and filtered CSV)
 */

const fs = require("fs");
const path = require("path");
const { createSampleCSV } = require("./csvGenerator");
const { processCSVData } = require("./csvProcessor");

/**
 * Run the demo
 */
async function main() {
  console.log("=".repeat(60));
  console.log("DEMO 3: CSV Data Transformation Pipeline");
  console.log("=".repeat(60));
  console.log();

  const inputFile = path.join(__dirname, "sample_data.csv");
  const outputJsonFile = path.join(__dirname, "output_data.json");
  const outputCsvFile = path.join(__dirname, "output_data.csv");

  try {
    // Create sample CSV if it doesn't exist
    if (!fs.existsSync(inputFile)) {
      await createSampleCSV(inputFile);
    }

    const startTime = Date.now();

    // Process the CSV data
    const results = await processCSVData(
      inputFile,
      outputJsonFile,
      outputCsvFile,
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`\n⏱️  Total processing time: ${duration} seconds`);
    console.log("\n💡 Key features demonstrated:");
    console.log("   ✓ CSV parsing from streams");
    console.log("   ✓ Data validation and filtering");
    console.log("   ✓ Data enrichment with computed fields");
    console.log("   ✓ Real-time statistics collection");
    console.log("   ✓ Multiple output formats (JSON & CSV)");
    console.log("   ✓ Memory-efficient processing");
    console.log("\n📁 Check the output files to see the results!");

    console.log("\n📊 Summary:");
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  createSampleCSV,
  processCSVData,
};
