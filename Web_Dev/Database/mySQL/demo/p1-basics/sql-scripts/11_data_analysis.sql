-- ================================================================
-- 11 - DATA ANALYSIS QUERIES
-- MySQL 8 Practice - Business Intelligence and Reporting
-- ================================================================

-- Employee demographics analysis
SELECT 
    department,
    COUNT(*) as total_employees,
    ROUND(AVG(YEAR(CURDATE()) - YEAR(birth_date)), 1) as avg_age,
    ROUND(AVG(salary), 2) as avg_salary,
    ROUND(MIN(salary), 2) as min_salary,
    ROUND(MAX(salary), 2) as max_salary,
    ROUND(STDDEV(salary), 2) as salary_std_dev,
    MIN(hire_date) as earliest_hire,
    MAX(hire_date) as latest_hire,
    ROUND(AVG(DATEDIFF(CURDATE(), hire_date) / 365.25), 1) as avg_tenure_years
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Project participation analysis
SELECT 
    p.name as project_name,
    p.status,
    p.budget,
    COUNT(ep.employee_id) as team_size,
    SUM(ep.hours_allocated) as total_hours,
    ROUND(p.budget / NULLIF(COUNT(ep.employee_id), 0), 2) as budget_per_person,
    ROUND(p.budget / NULLIF(SUM(ep.hours_allocated), 0), 2) as budget_per_hour,
    DATEDIFF(COALESCE(p.end_date, CURDATE()), p.start_date) as project_duration_days
FROM projects p
LEFT JOIN employee_projects ep ON p.id = ep.project_id
GROUP BY p.id, p.name, p.status, p.budget, p.start_date, p.end_date
ORDER BY team_size DESC;

-- Salary distribution analysis
SELECT 
    CASE 
        WHEN salary < 50000 THEN '< 50K'
        WHEN salary < 60000 THEN '50K - 60K'
        WHEN salary < 70000 THEN '60K - 70K'
        WHEN salary < 80000 THEN '70K - 80K'
        WHEN salary < 90000 THEN '80K - 90K'
        ELSE '90K+'
    END as salary_range,
    COUNT(*) as employee_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM employees), 1) as percentage
FROM employees
GROUP BY salary_range
ORDER BY MIN(salary);

-- Department efficiency analysis (budget per employee vs actual costs)
SELECT 
    d.name as department,
    d.budget as department_budget,
    COUNT(e.id) as employee_count,
    ROUND(SUM(e.salary), 2) as total_salary_cost,
    ROUND(d.budget / NULLIF(COUNT(e.id), 0), 2) as budget_per_employee,
    ROUND(AVG(e.salary), 2) as avg_salary,
    ROUND((d.budget - SUM(e.salary)) / NULLIF(d.budget, 0) * 100, 1) as budget_remaining_pct,
    ROUND(SUM(e.salary) / NULLIF(d.budget, 0) * 100, 1) as salary_to_budget_ratio
FROM departments d
LEFT JOIN employees e ON d.name = e.department
GROUP BY d.id, d.name, d.budget
ORDER BY salary_to_budget_ratio DESC;

-- Employee productivity by project involvement
SELECT 
    e.employee_code,
    CONCAT(e.first_name, ' ', e.last_name) as full_name,
    e.department,
    e.salary,
    COUNT(ep.project_id) as project_count,
    SUM(ep.hours_allocated) as total_allocated_hours,
    ROUND(AVG(ep.hours_allocated), 1) as avg_hours_per_project,
    CASE 
        WHEN COUNT(ep.project_id) = 0 THEN 'No Projects'
        WHEN COUNT(ep.project_id) = 1 THEN 'Single Project'
        WHEN COUNT(ep.project_id) <= 3 THEN 'Multi-Project'
        ELSE 'High Load'
    END as workload_category
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
GROUP BY e.id, e.employee_code, e.first_name, e.last_name, e.department, e.salary
ORDER BY project_count DESC, total_allocated_hours DESC;

-- Quarterly hiring trends
SELECT 
    YEAR(hire_date) as hire_year,
    QUARTER(hire_date) as hire_quarter,
    COUNT(*) as new_hires,
    GROUP_CONCAT(CONCAT(first_name, ' ', last_name) ORDER BY hire_date) as hired_employees
FROM employees
GROUP BY YEAR(hire_date), QUARTER(hire_date)
ORDER BY hire_year, hire_quarter;

-- Cross-department project collaboration
SELECT 
    p.name as project_name,
    COUNT(DISTINCT e.department) as departments_involved,
    GROUP_CONCAT(DISTINCT e.department ORDER BY e.department) as departments,
    COUNT(ep.employee_id) as total_team_members
FROM projects p
INNER JOIN employee_projects ep ON p.id = ep.project_id
INNER JOIN employees e ON ep.employee_id = e.id
GROUP BY p.id, p.name
HAVING COUNT(DISTINCT e.department) > 1
ORDER BY departments_involved DESC;
