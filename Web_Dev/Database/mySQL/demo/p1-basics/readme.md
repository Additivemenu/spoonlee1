# MySQL 8 Docker Setup and CRUD Tutorial

a few ways to interact with MySQL server:
- this readme: mainly using MySQL cli and one-off SQL (not scripts)
- see [how to run sql scripts using MySQL cli](./docs/sql.md)
- or you can use any MySQL client (e.g. phpmyadmin, MySQLWorkbench) to run sql or sql scripts

## Step 1: Setting up MySQL 8 with Docker

### Pull and run MySQL 8 container

```bash
# Pull MySQL 8 image for ARM64 (Apple Silicon)
docker pull mysql:8.0 --platform linux/arm64/v8

# Run MySQL container with environment variables
docker run --name mysql8-practice \
  --platform linux/arm64/v8 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=company_db \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=apppassword \
  -p 3307:3306 \
  -d mysql:8.0

# Check if container is running
docker ps
```

### Alternative: Using docker-compose (recommended)

Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    platform: linux/arm64/v8 # For Apple Silicon Macs
    container_name: mysql8-practice
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: company_db
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppassword
    ports:
      - "3307:3306" # Use different host port to avoid conflict
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

```bash
# Start with docker-compose
docker-compose up -d
```

## Step 2: Connecting to MySQL

### Method 1: Connect from host machine

```bash
# Install MySQL client if not already installed
# Ubuntu/Debian: sudo apt-get install mysql-client
# macOS: brew install mysql-client
# Windows: Download MySQL installer

# Connect to MySQL (note the port 3307)
mysql -h localhost -P 3307 -u root -p
# Enter password: rootpassword
```

### Method 2: Connect via Docker exec

```bash
# Execute MySQL client inside the container
docker exec -it mysql8-practice mysql -u root -p

# Or connect as the app user
docker exec -it mysql8-practice mysql -u appuser -p
```

## Step 3: Database and Table Creation

### Create database and switch to it

```sql
-- Show existing databases
SHOW DATABASES;

-- Create a new database (if not created via environment variable)
CREATE DATABASE IF NOT EXISTS company_db;

-- Use the database
USE company_db;

-- Show current database
SELECT DATABASE();
```

### Create tables

```sql
-- Create employees table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    budget DECIMAL(12,2),
    manager_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Show table structure
DESCRIBE employees;
DESCRIBE departments;

-- Show all tables
SHOW TABLES;
```

## Step 4: CRUD Operations

### CREATE (Insert Data)

```sql
-- Insert single employee
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date)
VALUES ('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000.00, '2023-01-15');

-- Insert multiple employees
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) VALUES
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000.00, '2023-02-01'),
('Mike', 'Johnson', 'mike.johnson@company.com', 'Engineering', 80000.00, '2023-01-20'),
('Sarah', 'Wilson', 'sarah.wilson@company.com', 'HR', 55000.00, '2023-03-10'),
('David', 'Brown', 'david.brown@company.com', 'Sales', 60000.00, '2023-02-15');

-- Insert departments
INSERT INTO departments (name, budget) VALUES
('Engineering', 500000.00),
('Marketing', 200000.00),
('HR', 150000.00),
('Sales', 300000.00);

-- Check inserted data
SELECT * FROM employees;
SELECT * FROM departments;
```

### READ (Select/Query Data)

```sql
-- Select all employees
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, email, salary FROM employees;

-- Select with conditions
SELECT * FROM employees WHERE department = 'Engineering';
SELECT * FROM employees WHERE salary > 60000;
SELECT * FROM employees WHERE hire_date >= '2023-02-01';

-- Select with sorting
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY last_name ASC, first_name ASC;

-- Select with limit
SELECT * FROM employees ORDER BY salary DESC LIMIT 3;

-- Select with aggregations
SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- Select with JOIN
SELECT e.first_name, e.last_name, e.department, d.budget
FROM employees e
LEFT JOIN departments d ON e.department = d.name;

-- Select with LIKE (pattern matching)
SELECT * FROM employees WHERE email LIKE '%@company.com';
SELECT * FROM employees WHERE first_name LIKE 'J%';
```

### UPDATE (Modify Data)

```sql
-- Update single record
UPDATE employees
SET salary = 78000.00
WHERE email = 'john.doe@company.com';

-- Update multiple records
UPDATE employees
SET salary = salary * 1.05
WHERE department = 'Engineering';

-- Update with multiple columns
UPDATE employees
SET department = 'Senior Engineering', salary = 85000.00
WHERE id = 3;

-- Update based on condition
UPDATE employees
SET is_active = FALSE
WHERE hire_date < '2023-02-01';

-- Verify updates
SELECT * FROM employees WHERE department LIKE '%Engineering%';
```

### DELETE (Remove Data)

```sql
-- Delete specific record
DELETE FROM employees WHERE email = 'david.brown@company.com';

-- Delete with condition
DELETE FROM employees WHERE is_active = FALSE;

-- Delete all records from a table (but keep structure)
-- DELETE FROM employees;  -- Uncomment to delete all

-- Verify deletions
SELECT * FROM employees;
SELECT COUNT(*) as total_employees FROM employees;
```

## Step 5: Advanced Operations

### Working with indexes

```sql
-- Create index for better query performance
CREATE INDEX idx_employee_department ON employees(department);
CREATE INDEX idx_employee_email ON employees(email);

-- Show indexes
SHOW INDEXES FROM employees;
```

### Working with constraints

```sql
-- Add foreign key constraint
ALTER TABLE departments
ADD CONSTRAINT fk_manager
FOREIGN KEY (manager_id) REFERENCES employees(id);

-- Show table creation statement
SHOW CREATE TABLE employees;
```

### Backup and restore operations

```bash
# Backup database (run from host)
docker exec mysql8-practice mysqldump -u root -prootpassword company_db > company_backup.sql

# Restore database (run from host)
docker exec -i mysql8-practice mysql -u root -prootpassword company_db < company_backup.sql
```

## Step 6: MySQL CLI Useful Commands

### Database exploration

```sql
-- Show MySQL version
SELECT VERSION();

-- Show current user
SELECT USER();

-- Show current database
SELECT DATABASE();

-- Show all databases
SHOW DATABASES;

-- Show tables in current database
SHOW TABLES;

-- Show table structure
DESCRIBE employees;
SHOW COLUMNS FROM employees;

-- Show table creation statement
SHOW CREATE TABLE employees;

-- Show table status
SHOW TABLE STATUS LIKE 'employees';
```

### Session and system information

```sql
-- Show variables
SHOW VARIABLES LIKE 'version%';
SHOW VARIABLES LIKE 'character_set%';

-- Show processes
SHOW PROCESSLIST;

-- Show status
SHOW STATUS LIKE 'Threads%';
```

### CLI shortcuts and commands

```bash
# Inside MySQL CLI:
# Show help
help;

# Show status
status;

# Source a SQL file
source /path/to/file.sql;

# Exit
exit;
# or
quit;
# or
\q

# Clear screen (Linux/Mac)
system clear;
```

## Step 7: Cleanup

### Stop and remove containers

```bash
# Stop container
docker stop mysql8-practice

# Remove container
docker rm mysql8-practice

# Remove image (optional)
docker rmi mysql:8.0

# If using docker-compose
docker-compose down

# Remove volumes (this will delete all data!)
docker-compose down -v
```

## Sample Complete Workflow Script

```bash
#!/bin/bash

# Start MySQL container
echo "Starting MySQL 8 container..."
docker run --name mysql8-demo \
  -e MYSQL_ROOT_PASSWORD=demo123 \
  -e MYSQL_DATABASE=demo_db \
  -p 3306:3306 \
  -d mysql:8.0

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 30

# Connect and run some commands
echo "Creating sample data..."
docker exec -i mysql8-demo mysql -u root -pdemo123 demo_db << EOF
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com');

SELECT * FROM users;
EOF

echo "Demo complete! Connect with: docker exec -it mysql8-demo mysql -u root -p"
```

This tutorial covers the complete workflow of setting up MySQL 8 with Docker and performing comprehensive CRUD operations using both SQL commands and MySQL CLI utilities.
