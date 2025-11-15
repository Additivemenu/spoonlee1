/**
 * DEMO 1: Large File Processing with Progress Tracking
 *
 * Real-world scenario: Processing large log files or data exports
 * This demo shows:
 * - Reading large files efficiently
 * - Tracking progress
 * - Transforming data
 * - Writing results
 */

const fs = require("fs");
const path = require("path");
const { createSampleFile } = require("./fileGenerator");
const { processLargeFile } = require("./fileProcessor");

// Run the demo
async function main() {
  console.log("=".repeat(60));
  console.log("DEMO 1: Large File Processing with Streams");
  console.log("=".repeat(60));
  console.log();

  const inputFile = path.join(__dirname, "sample_input.txt");
  const outputFile = path.join(__dirname, "sample_output.txt");

  try {
    // Create a sample file if it doesn't exist
    if (!fs.existsSync(inputFile)) {
      await createSampleFile(inputFile, 10000);
    }

    // Process the file
    const results = await processLargeFile(inputFile, outputFile, {
      chunkSize: 64 * 1024, // 64KB chunks
      progressInterval: 100, // Show progress every 100 lines
    });

    console.log("\n📋 Try running again with different file sizes!");
    console.log("💡 Key benefits:");
    console.log("   - Memory efficient (processes chunks, not entire file)");
    console.log("   - Progress tracking");
    console.log("   - Can handle files larger than available RAM");

    console.log("\n📊 Results:", results);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { createSampleFile, processLargeFile };
