-- ================================================================
-- 05 - AGGREGATE FUNCTIONS AND GROUPING
-- MySQL 8 Practice - Data Aggregation and Analysis
-- ================================================================

-- Aggregate functions
SELECT COUNT(*) AS total_employees FROM employees;
SELECT AVG(salary) AS average_salary FROM employees;
SELECT MAX(salary) AS highest_salary FROM employees;
SELECT MIN(salary) AS lowest_salary FROM employees;
SELECT SUM(salary) AS total_payroll FROM employees;

-- GROUP BY queries
SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department;
SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department;
SELECT department, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees GROUP BY department;

-- HAVING clause (filtering groups)
SELECT department, COUNT(*) AS employee_count 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 1;

SELECT department, AVG(salary) AS avg_salary 
FROM employees 
GROUP BY department 
HAVING AVG(salary) > 60000;

-- Date functions
SELECT 
    first_name, 
    last_name, 
    hire_date,
    DATEDIFF(CURDATE(), hire_date) AS days_employed,
    YEAR(CURDATE()) - YEAR(birth_date) AS age
FROM employees;

-- String functions
SELECT 
    CONCAT(first_name, ' ', last_name) AS full_name,
    UPPER(department) AS dept_upper,
    LENGTH(email) AS email_length,
    SUBSTRING(employee_code, 4) AS emp_number
FROM employees;
