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

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CSV TRANSFORMATION PIPELINE                         │
└─────────────────────────────────────────────────────────────────────────────┘

INPUT FILE: employees.csv
     │
     │ (Raw CSV text)
     ▼
┌─────────────────────┐
│  fs.createReadStream│  📄 Read file chunks
│   (Readable Stream) │  
└──────────┬──────────┘
           │
           │ Chunks: "name,age,department\nJohn,30,IT\n..."
           ▼
┌─────────────────────┐
│    CSVParser        │  🔍 Parse CSV → Objects
│ (Transform Stream)  │  Input:  "John,30,IT\n"
└──────────┬──────────┘  Output: {name:"John", age:"30", dept:"IT"}
           │
           │ Objects: {name, age, department, ...}
           ▼
┌─────────────────────┐
│   DataValidator     │  ✅ Validate data
│ (Transform Stream)  │  - Check required fields
└──────────┬──────────┘  - Validate data types
           │              - Filter invalid records
           │ Valid objects only
           ▼
┌─────────────────────┐
│   DataEnricher      │  ✨ Enrich data
│ (Transform Stream)  │  - Add fullName
└──────────┬──────────┘  - Add ageGroup
           │              - Add timestamp
           │ Enriched objects
           ▼
┌─────────────────────┐
│ StatisticsCollector │  📊 Collect stats
│ (Transform Stream)  │  - Count records
└──────────┬──────────┘  - Track departments
           │              - Calculate averages
           │ (Pass through + collect stats)
           ▼
┌─────────────────────┐
│     Splitter        │  🔀 Split data flow
│  (PassThrough)      │  Data goes to BOTH branches
└──────────┬──────────┘
           │
           ├──────────────────────────┬──────────────────────────┐
           │                          │                          │
           │ Branch 1                 │ Branch 2                 │
           ▼                          ▼                          │
┌─────────────────────┐    ┌─────────────────────┐              │
│   PassThrough       │    │   PassThrough       │              │
│  (objectMode)       │    │  (objectMode)       │              │
└──────────┬──────────┘    └──────────┬──────────┘              │
           │                          │                          │
           │ Objects                  │ Objects                  │
           ▼                          ▼                          │
┌─────────────────────┐    ┌─────────────────────┐              │
│   JSONFormatter     │    │   CSVFormatter      │              │
│ (Transform Stream)  │    │ (Transform Stream)  │              │
└──────────┬──────────┘    └──────────┬──────────┘              │
           │                          │                          │
           │ JSON strings             │ CSV strings              │
           │ "{"name":"John",...}\n"  │ "John,30,IT,...\n"      │
           ▼                          ▼                          │
┌─────────────────────┐    ┌─────────────────────┐              │
│fs.createWriteStream │    │fs.createWriteStream │              │
│ (Writable Stream)   │    │ (Writable Stream)   │              │
└──────────┬──────────┘    └──────────┬──────────┘              │
           │                          │                          │
           ▼                          ▼                          │
    OUTPUT FILE:             OUTPUT FILE:                        │
  employees.json          employees.csv                          │
                                                                  │
                                                                  │
                          ┌─────────────────────┐                │
                          │   Statistics        │ ◄──────────────┘
                          │   (Collected data)  │  getStats()
                          └─────────────────────┘
                          {
                            totalRecords: 100,
                            departments: {...},
                            averageAge: 35.5
                          }
```



```
Step-by-step transformation of ONE record:

1️⃣ Raw CSV Input:
   "John Doe,30,IT,john@example.com,60000\n"
   
2️⃣ After CSVParser:
   {
     name: "John Doe",
     age: "30",
     department: "IT",
     email: "john@example.com",
     salary: "60000"
   }
   
3️⃣ After DataValidator:
   {
     name: "John Doe",
     age: 30,                    // ← Converted to number
     department: "IT",
     email: "john@example.com",
     salary: 60000               // ← Converted to number
   }
   
4️⃣ After DataEnricher:
   {
     name: "John Doe",
     age: 30,
     department: "IT",
     email: "john@example.com",
     salary: 60000,
     fullName: "John Doe",       // ← Added
     ageGroup: "adult",          // ← Added
     processedAt: "2024-11-15"   // ← Added
   }
   
5️⃣ After StatisticsCollector:
   (Same object, but stats collected in background)
   Stats: { totalRecords: 1, departments: {IT: 1}, ... }
   
6️⃣ At Splitter:
   Object flows to BOTH branches simultaneously
   
7️⃣ Branch 1 - JSONFormatter:
   '{"name":"John Doe","age":30,"department":"IT",...}\n'
   
8️⃣ Branch 2 - CSVFormatter:
   'John Doe,30,IT,john@example.com,60000,John Doe,adult,2024-11-15\n'
   
9️⃣ Final Output:
   - employees.json: Contains JSON formatted data
   - employees.csv: Contains enriched CSV data

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
