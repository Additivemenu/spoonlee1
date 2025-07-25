-- ================================================================
-- 06 - JOINS (Combining data from multiple tables)
-- MySQL 8 Practice - Table Relationships and Joins
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
