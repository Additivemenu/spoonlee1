/**
 * CSV Processing Pipeline
 * Main processing logic that chains all transforms
 */

const fs = require("fs");
const { pipeline, PassThrough } = require("stream");
const CSVParser = require("./CSVParser");
const DataValidator = require("./DataValidator");
const DataEnricher = require("./DataEnricher");
const StatisticsCollector = require("./StatisticsCollector");
const { JSONFormatter, CSVFormatter } = require("./formatters");

/**
 * Process CSV data through transformation pipeline
 * @param {string} inputFile - Input CSV file path
 * @param {string} outputJsonFile - Output JSON file path
 * @param {string} outputCsvFile - Output CSV file path
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} - Processing statistics
 */
async function processCSVData(
  inputFile,
  outputJsonFile,
  outputCsvFile,
  options = {},
) {
  console.log("🚀 Starting CSV transformation pipeline...\n");

  return new Promise((resolve, reject) => {
    // Create all transform streams
    const csvParser = new CSVParser();
    const validator = new DataValidator(options);
    const enricher = new DataEnricher(options);
    const statsCollector = new StatisticsCollector();

    // Create output formatters
    const jsonFormatter = new JSONFormatter();
    const csvFormatter = new CSVFormatter();

    //! Create file streams
    const inputStream = fs.createReadStream(inputFile, { encoding: "utf8" });
    const jsonOutputStream = fs.createWriteStream(outputJsonFile);
    const csvOutputStream = fs.createWriteStream(outputCsvFile);

    // Create a PassThrough stream to split the data flow
    const splitter = new PassThrough({ objectMode: true });

    // Main pipeline: Input → Parser → Validator → Enricher → Stats → Splitter
    pipeline(
      inputStream,
      csvParser,
      validator,
      enricher,
      statsCollector,
      splitter,
      (err) => {
        if (err) {
          console.error("❌ Pipeline error:", err);
          reject(err);
        }
      },
    );

    // Branch 1: Splitter → JSON Formatter → JSON File
    pipeline(
      splitter.pipe(new PassThrough({ objectMode: true })),
      jsonFormatter,
      jsonOutputStream,
      (err) => {
        if (err) {
          console.error("❌ JSON output error:", err);
        } else {
          console.log(`\n✅ JSON output written to: ${outputJsonFile}`);
        }
      },
    );

    // Branch 2: Splitter → CSV Formatter → CSV File
    pipeline(
      splitter.pipe(new PassThrough({ objectMode: true })),
      csvFormatter,
      csvOutputStream,
      (err) => {
        if (err) {
          console.error("❌ CSV output error:", err);
          reject(err);
        } else {
          console.log(`✅ CSV output written to: ${outputCsvFile}`);
          resolve({
            statistics: statsCollector.getStats(),
            validation: validator.getStats(),
          });
        }
      },
    );

    // Error handlers
    inputStream.on("error", reject);
    jsonOutputStream.on("error", reject);
    csvOutputStream.on("error", reject);
  });
}

module.exports = { processCSVData };
