I'll create a comprehensive SQL practice file with equivalent commands that you can run step by step to practice the same CRUD operations.Perfect! I've created a comprehensive SQL practice file with over 100 queries covering all the operations from the Docker tutorial. Here's what's included:

## **Practice Structure:**

1. **Database Setup** - Creating databases and tables
2. **Table Creation (DDL)** - Four related tables with proper relationships
3. **Insert Operations** - Sample data for employees, departments, projects
4. **Read Operations** - Various SELECT queries with conditions, sorting, limiting
5. **Joins** - INNER, LEFT joins with multiple tables
6. **Subqueries** - Complex nested queries
7. **Update Operations** - Single and batch updates
8. **Delete Operations** - Safe deletion practices
9. **Advanced Queries** - Window functions, CTEs, CASE statements
10. **Data Analysis** - Real-world analytical queries
11. **Maintenance** - Performance and optimization queries
12. **Practice Exercises** - 10 challenges to test your skills

## **How to use this:**

```bash
# Connect to your Docker MySQL instance
docker exec -it mysql8-container mysql -u root -p

# Or from host (using port 3307)
mysql -h localhost -P 3307 -u root -p

# Copy and paste sections one at a time
# Or save the file and source it:
# source /path/to/practice.sql
```

## **Key features:**
- **Progressive difficulty** - starts simple, gets more complex
- **Real-world scenarios** - employee management system
- **Commented explanations** - each section explains what it does
- **Safe practices** - includes verification queries
- **Performance tips** - shows optimization techniques

You can run these queries section by section to practice all the concepts from the Docker tutorial. The sample data creates a realistic company database with employees, departments, and projects that you can experiment with safely!


# Simple MySQL Docker Setup with Manual Script Execution

## Directory Structure
```
mysql-practice/
├── docker-compose.yml
└── sql-scripts/
    └── practice.sql
```

## Step 1: Create Project Directory
```bash
mkdir mysql-practice && cd mysql-practice
mkdir sql-scripts
```

## Step 2: Create docker-compose.yml
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    platform: linux/arm64/v8  # Remove this line for Intel/AMD processors
    container_name: mysql8-practice
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: practice_db
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppassword
    ports:
      - "3307:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./sql-scripts:/sql-scripts  # Mount SQL scripts directory
    restart: unless-stopped

volumes:
  mysql_data:
```

## Step 3: Add Your SQL Script
Save your practice SQL script as `sql-scripts/practice.sql` (copy the content from the previous SQL artifact).

## Step 4: Start MySQL
```bash
# Start the container
docker-compose up -d

# Wait for MySQL to be ready (about 30 seconds)
sleep 30

# Check if it's running
docker-compose ps
```

## Step 5: Connect and Run Scripts

### Method 1: Run the entire script at once
```bash
# Execute the SQL script from outside the container
docker exec -i mysql8-practice mysql -u root -prootpassword practice_db < sql-scripts/practice.sql
```

### :white_check_mark: Method 2: Connect interactively and run manually (preferred)
```bash
# Connect to MySQL CLI
docker exec -it mysql8-practice mysql -u root -p practice_db

# Inside MySQL, run the script
mysql> source /sql-scripts/practice.sql;

# Or run specific sections manually by copying and pasting
mysql> -- Copy and paste individual queries here
```

### Method 3: Run specific sections
```bash
# Run just the table creation part
docker exec -i mysql8-practice mysql -u root -prootpassword practice_db << 'EOF'
-- Paste just the table creation SQL here
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- ... rest of table definition
);
EOF
```

## Working with the Scripts

### Connect to MySQL CLI:
```bash
docker exec -it mysql8-practice mysql -u root -p practice_db
# Password: rootpassword
```

### Inside MySQL, you can:
```sql
-- Show available scripts
system ls -la /sql-scripts/

-- Run the full script
source /sql-scripts/practice.sql;

-- Check what was created
SHOW TABLES;
SELECT COUNT(*) FROM employees;

-- Run individual queries by copy/paste
SELECT * FROM employees WHERE department = 'Engineering';
```

### Useful CLI commands inside the container:
```bash
# View the script file
docker exec -it mysql8-practice cat /sql-scripts/practice.sql

# Edit the script (if you have vim installed)
docker exec -it mysql8-practice vi /sql-scripts/practice.sql

# Run specific parts of the script
docker exec -it mysql8-practice mysql -u root -p practice_db -e "SHOW TABLES;"
```

## Practice Workflow

1. **Start container** (one time):
   ```bash
   docker-compose up -d
   ```

2. **Connect to MySQL**:
   ```bash
   docker exec -it mysql8-practice mysql -u root -p practice_db
   ```

3. **Run the practice script**:
   ```sql
   mysql> source /sql-scripts/practice.sql;
   ```

4. **Practice with individual queries**:
   ```sql
   mysql> SELECT * FROM employees;
   mysql> SELECT department, COUNT(*) FROM employees GROUP BY department;
   ```

5. **Reset and try again**:
   ```sql
   mysql> DROP DATABASE practice_db;
   mysql> CREATE DATABASE practice_db;
   mysql> USE practice_db;
   mysql> source /sql-scripts/practice.sql;
   ```

## Additional Tips

### Multiple script files:
You can add multiple SQL files to the `sql-scripts/` directory:
```
sql-scripts/
├── 01-setup.sql
├── 02-sample-data.sql
├── 03-practice-queries.sql
└── practice.sql
```

Then run them individually:
```sql
mysql> source /sql-scripts/01-setup.sql;
mysql> source /sql-scripts/02-sample-data.sql;
```

### Quick commands:
```bash
# Restart from scratch
docker-compose down -v && docker-compose up -d

# Check container status
docker-compose ps

# View logs
docker-compose logs mysql

# Stop everything
docker-compose down

# Remove everything including data
docker-compose down -v
```

This setup gives you full control to run scripts manually while keeping everything simple and straightforward!