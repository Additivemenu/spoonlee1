-- ================================================================
-- 10 - ADVANCED QUERIES (MySQL 8.0+ Features)
-- MySQL 8 Practice - Window Functions, CTEs, and Advanced SQL
-- ================================================================

-- Window functions (MySQL 8.0+)
SELECT 
    first_name,
    last_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
    DENSE_RANK() OVER (ORDER BY salary DESC) as overall_rank,
    PERCENT_RANK() OVER (ORDER BY salary) as salary_percentile
FROM employees;

-- Running total
SELECT 
    first_name,
    last_name,
    salary,
    hire_date,
    SUM(salary) OVER (ORDER BY hire_date) as running_total_payroll,
    AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg_salary
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
    END AS salary_category,
    CASE 
        WHEN YEAR(CURDATE()) - YEAR(birth_date) < 30 THEN 'Young'
        WHEN YEAR(CURDATE()) - YEAR(birth_date) < 40 THEN 'Mid-Career'
        ELSE 'Senior'
    END AS age_group
FROM employees;

-- Common Table Expression (CTE)
WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary,
        MAX(salary) as max_salary,
        MIN(salary) as min_salary
    FROM employees
    GROUP BY department
),
salary_categories AS (
    SELECT 
        department,
        COUNT(CASE WHEN salary >= 70000 THEN 1 END) as high_earners,
        COUNT(CASE WHEN salary < 70000 THEN 1 END) as regular_earners
    FROM employees
    GROUP BY department
)
SELECT 
    d.name,
    ds.emp_count,
    ds.avg_salary,
    ds.max_salary,
    ds.min_salary,
    sc.high_earners,
    sc.regular_earners,
    CASE 
        WHEN d.budget IS NOT NULL THEN d.budget / ds.emp_count 
        ELSE NULL 
    END as budget_per_employee
FROM department_stats ds
INNER JOIN departments d ON ds.department = d.name
INNER JOIN salary_categories sc ON ds.department = sc.department;

-- Recursive CTE example (organizational hierarchy)
-- Note: This assumes we have manager_id relationships set up
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers (no manager)
    SELECT 
        id, 
        employee_code,
        first_name, 
        last_name, 
        manager_id,
        0 as level,
        CAST(first_name AS CHAR(200)) as hierarchy_path
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT 
        e.id,
        e.employee_code,
        e.first_name, 
        e.last_name, 
        e.manager_id,
        eh.level + 1,
        CONCAT(eh.hierarchy_path, ' -> ', e.first_name)
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT 
    employee_code,
    CONCAT(REPEAT('  ', level), first_name, ' ', last_name) as indented_name,
    level,
    hierarchy_path
FROM employee_hierarchy
ORDER BY hierarchy_path;
