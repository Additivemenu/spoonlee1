/**
 * File Generator Module
 * Creates sample files for testing
 */

const fs = require("fs");

/**
 * Create a sample text file with specified number of lines
 * - just use WriteStream to generate large files efficiently
 * - returns promise that resolves when write stream is finished
 *
 * @param {string} filename - Path to the file to create
 * @param {number} lines - Number of lines to generate
 * @returns {Promise<void>}
 */
function createSampleFile(filename, lines = 1000) {
  console.log(`📝 Creating sample file with ${lines} lines...`);

  const writeStream = fs.createWriteStream(filename);

  for (let i = 1; i <= lines; i++) {
    writeStream.write(`This is line number ${i} with some sample data\n`);
  }

  writeStream.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log(`✅ Sample file created: ${filename}\n`);
      resolve();
    });
    writeStream.on("error", reject);
  });
}

module.exports = { createSampleFile };
