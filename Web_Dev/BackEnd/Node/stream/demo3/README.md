# Demo 3: CSV Data Transformation Pipeline

## Overview

Demonstrates a complete ETL (Extract, Transform, Load) pipeline using multiple chained Transform streams for CSV data processing.

## Structure

```
demo3/
├── index.js                  # Main entry point
├── CSVParser.js             # CSV to object parser
├── DataValidator.js         # Validation and filtering
├── DataEnricher.js          # Data enrichment
├── StatisticsCollector.js   # Real-time stats
├── formatters.js            # JSON & CSV output formatters
├── csvGenerator.js          # Sample CSV generator
├── csvProcessor.js          # Main pipeline logic
└── README.md               # This file
```

## Modules

### CSVParser.js

Transform stream that converts CSV to objects:

- Extracts headers from first line
- Parses each row into JavaScript object
- Handles object mode streams

### DataValidator.js

Validates data against rules:

- Configurable validation rules
- Filters invalid records
- Tracks validation statistics

### DataEnricher.js

Adds computed fields:

- Age group calculation
- Email domain extraction
- Custom enrichment functions
- Extensible enrichment pipeline

### StatisticsCollector.js

Collects real-time statistics:

- Counts by category
- Calculates averages
- Pass-through stream (doesn't modify data)

### formatters.js

Output formatting streams:

- `JSONFormatter` - Creates JSON arrays
- `CSVFormatter` - Creates CSV files
- Both work in object mode

### csvProcessor.js

Main pipeline orchestration:

- Chains all transforms
- Splits output to multiple destinations
- Error handling
- Returns processing results

## Usage

```bash
# Run the demo
node index.js
```

## Pipeline Flow

```
Input CSV File
    ↓
CSVParser (CSV → Objects)
    ↓
DataValidator (Filter invalid)
    ↓
DataEnricher (Add computed fields)
    ↓
StatisticsCollector (Collect stats)
    ↓
Splitter (Duplicate stream)
    ↓           ↓
JSONFormatter  CSVFormatter
    ↓           ↓
output.json   output.csv
```

## Customization

### Custom Validation Rules

```javascript
const validator = new DataValidator({
  validationRules: (row) => {
    return row.age > 21 && row.city !== "";
  },
});
```

### Custom Enrichment

```javascript
const enricher = new DataEnricher({
  enrichmentFunctions: [
    (row) => ({ ...row, fullName: row.name.toUpperCase() }),
    (row) => ({ ...row, senior: row.age >= 65 }),
  ],
});
```

## Learning Points

- ✅ Custom Transform streams in object mode
- ✅ Chaining multiple transforms with `pipeline()`
- ✅ Stream splitting for multiple outputs
- ✅ Pass-through streams for statistics
- ✅ Real-time data processing
- ✅ Memory-efficient ETL operations
- ✅ Modular stream architecture

## Output Files

- `sample_data.csv` - Input CSV file (auto-generated)
- `output_data.json` - Enriched data in JSON format
- `output_data.csv` - Enriched data in CSV format

## Try This

1. Add your own validation rules
2. Create custom enrichment functions
3. Add new output formats (XML, etc.)
4. Process larger CSV files
5. Add more statistical calculations
