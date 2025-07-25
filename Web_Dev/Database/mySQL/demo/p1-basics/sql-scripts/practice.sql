-- ================================================================
-- MySQL 8 Practice SQL Commands
-- Run these commands step by step to practice CRUD operations
-- ================================================================

-- ================================================================
-- SECTION 1: DATABASE EXPLORATION AND SETUP
-- ================================================================

-- Show MySQL version and current user
SELECT VERSION() AS mysql_version;
SELECT USER() AS current_user;

-- Show all databases
SHOW DATABASES;

-- Create and use our practice database
CREATE DATABASE IF NOT EXISTS practice_db;
USE practice_db;

-- Confirm we're using the right database
SELECT DATABASE() AS current_database;

-- Show tables (should be empty initially)
SHOW TABLES;

-- ================================================================
-- SECTION 2: TABLE CREATION (DDL - Data Definition Language)
-- ================================================================

-- Create employees table with various data types
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(50),
    position VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    birth_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    manager_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department),
    INDEX idx_salary (salary),
    INDEX idx_hire_date (hire_date)
);

-- Create departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    budget DECIMAL(12,2),
    manager_id INT,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2),
    status ENUM('Planning', 'Active', 'On Hold', 'Completed', 'Cancelled') DEFAULT 'Planning',
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create employee_projects junction table (many-to-many relationship)
CREATE TABLE employee_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    project_id INT NOT NULL,
    role VARCHAR(50),
    start_date DATE,
    end_date DATE,
    hours_allocated DECIMAL(5,2),
    UNIQUE KEY unique_employee_project (employee_id, project_id)
);

-- Show table structures
DESCRIBE employees;
DESCRIBE departments;
DESCRIBE projects;
DESCRIBE employee_projects;

-- Show all tables we created
SHOW TABLES;

-- ================================================================
-- SECTION 3: INSERT DATA (CREATE operations)
-- ================================================================

-- Insert departments first
INSERT INTO departments (dept_code, name, description, budget, location) VALUES
('ENG', 'Engineering', 'Software development and technical innovation', 500000.00, 'Building A, Floor 3'),
('MKT', 'Marketing', 'Brand management and customer acquisition', 200000.00, 'Building B, Floor 1'),
('HR', 'Human Resources', 'Employee relations and talent management', 150000.00, 'Building A, Floor 2'),
('SAL', 'Sales', 'Revenue generation and client relationships', 300000.00, 'Building B, Floor 2'),
('FIN', 'Finance', 'Financial planning and accounting', 180000.00, 'Building A, Floor 1'),
('OPS', 'Operations', 'Business operations and logistics', 250000.00, 'Building C, Floor 1');

-- Insert employees
INSERT INTO employees (employee_code, first_name, last_name, email, phone, department, position, salary, hire_date, birth_date) VALUES
('EMP001', 'John', 'Doe', 'john.doe@company.com', '555-0101', 'Engineering', 'Senior Developer', 85000.00, '2022-01-15', '1990-03-20'),
('EMP002', 'Jane', 'Smith', 'jane.smith@company.com', '555-0102', 'Marketing', 'Marketing Manager', 70000.00, '2022-02-01', '1988-07-12'),
('EMP003', 'Mike', 'Johnson', 'mike.johnson@company.com', '555-0103', 'Engineering', 'Lead Developer', 95000.00, '2021-11-20', '1985-11-05'),
('EMP004', 'Sarah', 'Wilson', 'sarah.wilson@company.com', '555-0104', 'Human Resources', 'HR Specialist', 55000.00, '2023-03-10', '1992-09-18'),
('EMP005', 'David', 'Brown', 'david.brown@company.com', '555-0105', 'Sales', 'Sales Representative', 60000.00, '2023-02-15', '1991-12-03'),
('EMP006', 'Lisa', 'Garcia', 'lisa.garcia@company.com', '555-0106', 'Finance', 'Financial Analyst', 65000.00, '2022-08-01', '1989-04-25'),
('EMP007', 'Tom', 'Anderson', 'tom.anderson@company.com', '555-0107', 'Engineering', 'Junior Developer', 55000.00, '2023-06-01', '1995-01-14'),
('EMP008', 'Emily', 'Davis', 'emily.davis@company.com', '555-0108', 'Operations', 'Operations Manager', 75000.00, '2022-05-15', '1987-08-30'),
('EMP009', 'Chris', 'Miller', 'chris.miller@company.com', '555-0109', 'Marketing', 'Content Specialist', 50000.00, '2023-04-20', '1993-06-08'),
('EMP010', 'Anna', 'Taylor', 'anna.taylor@company.com', '555-0110', 'Sales', 'Senior Sales Rep', 68000.00, '2022-12-01', '1986-10-22');

-- Insert projects
INSERT INTO projects (project_code, name, description, start_date, end_date, budget, status, department_id) VALUES
('PRJ001', 'Mobile App Development', 'Develop new mobile application for customer engagement', '2023-01-01', '2023-12-31', 200000.00, 'Active', 1),
('PRJ002', 'Brand Refresh Campaign', 'Complete rebranding and marketing campaign', '2023-03-01', '2023-09-30', 150000.00, 'Active', 2),
('PRJ003', 'CRM System Upgrade', 'Upgrade customer relationship management system', '2023-02-15', '2023-08-15', 100000.00, 'Completed', 1),
('PRJ004', 'Employee Training Program', 'Comprehensive skills development program', '2023-01-15', '2023-06-15', 75000.00, 'Completed', 3),
('PRJ005', 'Sales Automation Tool', 'Implement new sales automation platform', '2023-04-01', '2023-10-31', 120000.00, 'Active', 4);

-- Insert employee-project assignments
INSERT INTO employee_projects (employee_id, project_id, role, start_date, hours_allocated) VALUES
(1, 1, 'Lead Developer', '2023-01-01', 40.00),
(3, 1, 'Senior Developer', '2023-01-01', 35.00),
(7, 1, 'Junior Developer', '2023-06-01', 30.00),
(2, 2, 'Project Manager', '2023-03-01', 25.00),
(9, 2, 'Content Creator', '2023-03-01', 30.00),
(1, 3, 'Technical Lead', '2023-02-15', 20.00),
(4, 4, 'Training Coordinator', '2023-01-15', 35.00),
(5, 5, 'Sales Consultant', '2023-04-01', 15.00),
(10, 5, 'Senior Consultant', '2023-04-01', 20.00);

-- Verify data insertion
SELECT COUNT(*) AS total_departments FROM departments;
SELECT COUNT(*) AS total_employees FROM employees;
SELECT COUNT(*) AS total_projects FROM projects;
SELECT COUNT(*) AS total_assignments FROM employee_projects;

-- ================================================================
-- SECTION 4: READ OPERATIONS (SELECT queries)
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

-- ================================================================
-- SECTION 5: JOINS (Combining data from multiple tables)
-- ================================================================

-- INNER JOIN - employees with their department info
SELECT 
    e.first_name,
    e.last_name,
    e.department,
    d.name AS dept_name,
    d.location,
    d.budget
FROM employees e
INNER JOIN departments d ON e.department = d.name;

-- LEFT JOIN - all employees, even if department doesn't exist in departments table
SELECT 
    e.first_name,
    e.last_name,
    e.department,
    d.name AS dept_name,
    d.location
FROM employees e
LEFT JOIN departments d ON e.department = d.name;

-- Multiple JOINs - employees with their projects
SELECT 
    e.first_name,
    e.last_name,
    p.name AS project_name,
    ep.role,
    ep.hours_allocated
FROM employees e
INNER JOIN employee_projects ep ON e.id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.id;

-- Complex JOIN with aggregation
SELECT 
    e.first_name,
    e.last_name,
    COUNT(ep.project_id) AS project_count,
    SUM(ep.hours_allocated) AS total_hours
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
GROUP BY e.id, e.first_name, e.last_name
ORDER BY project_count DESC;

-- ================================================================
-- SECTION 6: SUBQUERIES
-- ================================================================

-- Find employees with above-average salary
SELECT first_name, last_name, salary
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find employees in the department with the highest budget
SELECT first_name, last_name, department
FROM employees
WHERE department = (
    SELECT name FROM departments 
    ORDER BY budget DESC 
    LIMIT 1
);

-- Find employees working on active projects
SELECT DISTINCT e.first_name, e.last_name
FROM employees e
WHERE e.id IN (
    SELECT ep.employee_id 
    FROM employee_projects ep
    INNER JOIN projects p ON ep.project_id = p.id
    WHERE p.status = 'Active'
);

-- ================================================================
-- SECTION 7: UPDATE OPERATIONS
-- ================================================================

-- Update single employee salary
UPDATE employees 
SET salary = 88000.00 
WHERE employee_code = 'EMP001';

-- Update multiple employees with percentage increase
UPDATE employees 
SET salary = salary * 1.05 
WHERE department = 'Engineering';

-- Update with multiple columns
UPDATE employees 
SET position = 'Senior Sales Representative', salary = 72000.00 
WHERE employee_code = 'EMP005';

-- Update based on condition
UPDATE employees 
SET notes = 'Long-term employee - eligible for bonus'
WHERE hire_date < '2022-06-01';

-- Update with JOIN (update employee department based on department code)
UPDATE employees e
INNER JOIN departments d ON e.department = d.name
SET e.manager_id = d.manager_id
WHERE d.manager_id IS NOT NULL;

-- Verify updates
SELECT employee_code, first_name, last_name, salary, notes 
FROM employees 
WHERE employee_code IN ('EMP001', 'EMP005');

-- ================================================================
-- SECTION 8: DELETE OPERATIONS (Be careful!)
-- ================================================================

-- First, let's add some test data to delete
INSERT INTO employees (employee_code, first_name, last_name, email, department, position, salary, hire_date, is_active) VALUES
('TEMP01', 'Test', 'Employee1', 'test1@company.com', 'Engineering', 'Intern', 30000.00, '2023-07-01', FALSE),
('TEMP02', 'Test', 'Employee2', 'test2@company.com', 'Marketing', 'Intern', 28000.00, '2023-07-01', FALSE);

-- Delete specific employee
DELETE FROM employees WHERE employee_code = 'TEMP01';

-- Delete based on condition
DELETE FROM employees WHERE is_active = FALSE AND position = 'Intern';

-- Delete with subquery (careful!)
-- DELETE FROM employees 
-- WHERE department IN (SELECT name FROM departments WHERE budget < 100000);

-- Verify deletions
SELECT COUNT(*) FROM employees WHERE employee_code LIKE 'TEMP%';

-- ================================================================
-- SECTION 9: ADVANCED QUERIES
-- ================================================================

-- Window functions (MySQL 8.0+)
SELECT 
    first_name,
    last_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
    DENSE_RANK() OVER (ORDER BY salary DESC) as overall_rank
FROM employees;

-- Running total
SELECT 
    first_name,
    last_name,
    salary,
    SUM(salary) OVER (ORDER BY hire_date) as running_total_payroll
FROM employees
ORDER BY hire_date;

-- CASE statements
SELECT 
    first_name,
    last_name,
    salary,
    CASE 
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 60000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;

-- Common Table Expression (CTE)
WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary,
        MAX(salary) as max_salary
    FROM employees
    GROUP BY department
)
SELECT 
    d.name,
    ds.emp_count,
    ds.avg_salary,
    ds.max_salary,
    d.budget / ds.emp_count as budget_per_employee
FROM department_stats ds
INNER JOIN departments d ON ds.department = d.name;

-- ================================================================
-- SECTION 10: DATA ANALYSIS QUERIES
-- ================================================================

-- Employee demographics
SELECT 
    department,
    COUNT(*) as total_employees,
    ROUND(AVG(YEAR(CURDATE()) - YEAR(birth_date)), 1) as avg_age,
    ROUND(AVG(salary), 2) as avg_salary,
    MIN(hire_date) as earliest_hire,
    MAX(hire_date) as latest_hire
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Project participation analysis
SELECT 
    p.name as project_name,
    p.status,
    COUNT(ep.employee_id) as team_size,
    SUM(ep.hours_allocated) as total_hours,
    p.budget / COUNT(ep.employee_id) as budget_per_person
FROM projects p
LEFT JOIN employee_projects ep ON p.id = ep.project_id
GROUP BY p.id, p.name, p.status, p.budget
ORDER BY team_size DESC;

-- Salary distribution
SELECT 
    CASE 
        WHEN salary < 50000 THEN '< 50K'
        WHEN salary < 60000 THEN '50K - 60K'
        WHEN salary < 70000 THEN '60K - 70K'
        WHEN salary < 80000 THEN '70K - 80K'
        ELSE '80K+'
    END as salary_range,
    COUNT(*) as employee_count
FROM employees
GROUP BY salary_range
ORDER BY MIN(salary);

-- Department efficiency (budget per employee)
SELECT 
    d.name as department,
    d.budget,
    COUNT(e.id) as employee_count,
    ROUND(d.budget / COUNT(e.id), 2) as budget_per_employee,
    ROUND(AVG(e.salary), 2) as avg_salary,
    ROUND((d.budget / COUNT(e.id)) / AVG(e.salary), 2) as efficiency_ratio
FROM departments d
LEFT JOIN employees e ON d.name = e.department
GROUP BY d.id, d.name, d.budget
ORDER BY efficiency_ratio DESC;

-- ================================================================
-- SECTION 11: MAINTENANCE AND OPTIMIZATION
-- ================================================================

-- Show table sizes and row counts
SELECT 
    table_name,
    table_rows,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables 
WHERE table_schema = 'practice_db';

-- Show indexes
SHOW INDEXES FROM employees;

-- Analyze table performance
ANALYZE TABLE employees;

-- Show warnings from last operation
SHOW WARNINGS;

-- Check table status
SHOW TABLE STATUS LIKE 'employees';

-- ================================================================
-- SECTION 12: CLEANUP (Optional - run only if you want to reset)
-- ================================================================

-- Drop tables (uncomment to use)
-- DROP TABLE IF EXISTS employee_projects;
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS employees;
-- DROP TABLE IF EXISTS departments;

-- Drop database (uncomment to use)
-- DROP DATABASE IF EXISTS practice_db;

-- ================================================================
-- PRACTICE EXERCISES
-- ================================================================

/*
Try these exercises on your own:

1. Find all employees hired in 2023
2. Calculate the total budget for all departments
3. Find the employee with the highest salary in each department
4. List all projects with their team members and roles
5. Find departments with more than 2 employees
6. Calculate the average project duration
7. Find employees who are not assigned to any projects
8. Update all Engineering employees' salaries by 10%
9. Find the youngest employee in each department
10. Create a report showing department budgets vs actual salary costs

Solutions are not provided - try to write these queries yourself!
*/