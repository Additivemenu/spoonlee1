-- ================================================================
-- 07 - SUBQUERIES
-- MySQL 8 Practice - Advanced Query Techniques
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

-- Correlated subquery - employees earning more than department average
SELECT e1.first_name, e1.last_name, e1.department, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);

-- EXISTS example - departments that have employees
SELECT d.name, d.budget
FROM departments d
WHERE EXISTS (
    SELECT 1 
    FROM employees e 
    WHERE e.department = d.name
);
