/**
 * File Processor Module
 * Handles file processing with streams
 */

const fs = require("fs");
const { pipeline } = require("stream");
const LineProcessor = require("./LineProcessor");

/**
 * Process a large file using streams
 * @param {string} inputFile - Path to input file
 * @param {string} outputFile - Path to output file
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} - Processing results
 */
async function processLargeFile(inputFile, outputFile, options = {}) {
  console.log(`🚀 Starting to process file: ${inputFile}`);
  console.log(`📤 Output will be written to: ${outputFile}\n`);

  const startTime = Date.now();

  // Get input file size
  const stats = fs.statSync(inputFile);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`📊 Input file size: ${fileSizeInMB} MB\n`);

  return new Promise((resolve, reject) => {
    // Create streams
    const readStream = fs.createReadStream(inputFile, {
      encoding: "utf8",
      highWaterMark: options.chunkSize || 64 * 1024, // Default 64KB chunks
    });

    const lineProcessor = new LineProcessor({
      progressInterval: options.progressInterval || 100,
    });

    const writeStream = fs.createWriteStream(outputFile);

    // Use pipeline for better error handling
    pipeline(readStream, lineProcessor, writeStream, (err) => {
      if (err) {
        console.error("❌ Pipeline error:", err);
        reject(err);
      } else {
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log(`\n✨ Processing complete!`);
        console.log(`⏱️  Time taken: ${duration} seconds`);
        console.log(`📁 Output file: ${outputFile}`);

        // Show output file size
        const outputStats = fs.statSync(outputFile);
        const outputSizeInMB = (outputStats.size / (1024 * 1024)).toFixed(2);
        console.log(`📊 Output file size: ${outputSizeInMB} MB`);

        resolve({
          duration: parseFloat(duration),
          inputSize: stats.size,
          outputSize: outputStats.size,
          linesProcessed: lineProcessor.getLineCount(),
        });
      }
    });

    // Monitor stream events
    readStream.on("error", (err) => {
      console.error("❌ Read stream error:", err);
      reject(err);
    });

    writeStream.on("error", (err) => {
      console.error("❌ Write stream error:", err);
      reject(err);
    });
  });
}

module.exports = { processLargeFile };
