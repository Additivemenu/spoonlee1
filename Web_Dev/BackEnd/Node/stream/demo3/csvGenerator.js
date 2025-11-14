/**
 * CSV Data Generator
 * Creates sample CSV files for testing
 */

const fs = require("fs");

/**
 * Create a sample CSV file
 * @param {string} filename - Path to create the file
 * @returns {Promise<void>}
 */
function createSampleCSV(filename) {
  console.log("📝 Creating sample CSV file...");

  const data = [
    "name,email,age,city",
    "John Doe,john@gmail.com,25,New York",
    "Jane Smith,jane@yahoo.com,32,Los Angeles",
    "Bob Johnson,bob@company.com,45,Chicago",
    "Alice Brown,alice@gmail.com,28,Houston",
    "Invalid User,,30,Boston", // Invalid: missing email
    "Charlie Wilson,charlie@hotmail.com,17,Phoenix",
    "Diana Moore,diana@gmail.com,55,Philadelphia",
    "Eve Davis,eve@company.com,invalid,San Antonio", // Invalid: age
    "Frank Miller,frank.yahoo.com,35,San Diego", // Invalid: email format
    "Grace Taylor,grace@gmail.com,29,Dallas",
    "Henry Anderson,henry@company.com,41,San Jose",
    "Ivy Thomas,ivy@hotmail.com,23,Austin",
    "Jack Jackson,jack@gmail.com,52,Jacksonville",
    "Kate White,kate@yahoo.com,31,Fort Worth",
    "Leo Harris,leo@company.com,27,Columbus",
  ];

  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data.join("\n"), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`✅ Sample CSV created: ${filename}\n`);
        resolve();
      }
    });
  });
}

module.exports = { createSampleCSV };
