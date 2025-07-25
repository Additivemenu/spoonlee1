-- ================================================================
-- 04 - BASIC SELECT QUERIES (READ operations)
-- MySQL 8 Practice - Basic Data Retrieval
-- ================================================================

-- Basic SELECT queries
SELECT * FROM employees;
SELECT * FROM departments;
SELECT * FROM projects;

-- Select specific columns
SELECT first_name, last_name, email, salary FROM employees;
SELECT name, budget, location FROM departments;

-- SELECT with WHERE conditions
SELECT * FROM employees WHERE department = 'Engineering';
SELECT * FROM employees WHERE salary > 60000;
SELECT * FROM employees WHERE hire_date >= '2023-01-01';
SELECT * FROM employees WHERE department = 'Engineering' AND salary > 80000;
SELECT * FROM employees WHERE department IN ('Engineering', 'Marketing');
SELECT * FROM employees WHERE first_name LIKE 'J%';
SELECT * FROM employees WHERE email LIKE '%@company.com';

-- SELECT with ORDER BY
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY department ASC, salary DESC;
SELECT * FROM employees ORDER BY hire_date ASC;

-- SELECT with LIMIT
SELECT * FROM employees ORDER BY salary DESC LIMIT 5;
SELECT * FROM employees ORDER BY hire_date DESC LIMIT 3;
