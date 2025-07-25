-- ================================================================
-- 08 - UPDATE OPERATIONS
-- MySQL 8 Practice - Data Modification
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

-- Update project status
UPDATE projects 
SET status = 'On Hold'
WHERE end_date < CURDATE() AND status = 'Active';

-- Verify updates
SELECT employee_code, first_name, last_name, salary, notes 
FROM employees 
WHERE employee_code IN ('EMP001', 'EMP005');

-- Show updated salaries in Engineering
SELECT first_name, last_name, salary, department
FROM employees 
WHERE department = 'Engineering'
ORDER BY salary DESC;
