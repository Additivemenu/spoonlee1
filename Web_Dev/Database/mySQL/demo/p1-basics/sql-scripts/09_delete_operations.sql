-- ================================================================
-- 09 - DELETE OPERATIONS (Be careful!)
-- MySQL 8 Practice - Data Removal
-- ================================================================

-- First, let's add some test data to delete
INSERT INTO employees (employee_code, first_name, last_name, email, department, position, salary, hire_date, is_active) VALUES
('TEMP01', 'Test', 'Employee1', 'test1@company.com', 'Engineering', 'Intern', 30000.00, '2023-07-01', FALSE),
('TEMP02', 'Test', 'Employee2', 'test2@company.com', 'Marketing', 'Intern', 28000.00, '2023-07-01', FALSE),
('TEMP03', 'Test', 'Employee3', 'test3@company.com', 'Sales', 'Intern', 25000.00, '2023-07-01', FALSE);

-- Verify test data was inserted
SELECT * FROM employees WHERE employee_code LIKE 'TEMP%';

-- Delete specific employee
DELETE FROM employees WHERE employee_code = 'TEMP01';

-- Delete based on condition
DELETE FROM employees WHERE is_active = FALSE AND position = 'Intern';

-- Delete with subquery (be very careful!)
-- Example: Delete employees from departments with low budget (commented for safety)
-- DELETE FROM employees 
-- WHERE department IN (
--     SELECT name FROM departments WHERE budget < 100000
-- );

-- Safe delete with LIMIT (good practice for large tables)
DELETE FROM employees 
WHERE employee_code LIKE 'TEMP%' 
LIMIT 5;

-- Verify deletions
SELECT COUNT(*) AS remaining_temp_employees 
FROM employees 
WHERE employee_code LIKE 'TEMP%';

-- Show all current employees
SELECT employee_code, first_name, last_name, is_active 
FROM employees 
ORDER BY employee_code;
