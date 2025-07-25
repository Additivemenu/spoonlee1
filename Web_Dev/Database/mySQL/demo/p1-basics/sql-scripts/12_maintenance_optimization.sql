-- ================================================================
-- 12 - DATABASE MAINTENANCE AND OPTIMIZATION
-- MySQL 8 Practice - Performance and Database Management
-- ================================================================

-- Show table sizes and row counts
SELECT 
    table_name,
    table_rows,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb,
    ROUND((data_length / 1024 / 1024), 2) AS data_mb,
    ROUND((index_length / 1024 / 1024), 2) AS index_mb,
    engine,
    table_collation
FROM information_schema.tables 
WHERE table_schema = 'practice_db'
ORDER BY size_mb DESC;

-- Show indexes for all tables
SELECT 
    table_name,
    index_name,
    column_name,
    seq_in_index,
    non_unique,
    index_type
FROM information_schema.statistics 
WHERE table_schema = 'practice_db'
ORDER BY table_name, index_name, seq_in_index;

-- Show specific indexes for employees table
SHOW INDEXES FROM employees;

-- Analyze table performance
ANALYZE TABLE employees;
ANALYZE TABLE departments;
ANALYZE TABLE projects;
ANALYZE TABLE employee_projects;

-- Show warnings from last operation
SHOW WARNINGS;

-- Check table status
SHOW TABLE STATUS LIKE 'employees';

-- Show process list (current connections and queries)
SHOW PROCESSLIST;

-- Show database variables (configuration)
SHOW VARIABLES LIKE 'innodb%';
SHOW VARIABLES LIKE 'max_connections';
SHOW VARIABLES LIKE 'query_cache%';

-- Check database size
SELECT 
    schema_name as database_name,
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as size_mb
FROM information_schema.tables 
WHERE schema_name = 'practice_db'
GROUP BY schema_name;

-- Performance analysis - slow query identification
-- Note: This requires the slow query log to be enabled
SELECT 
    sql_text,
    exec_count,
    avg_timer_wait / 1000000000 as avg_exec_time_sec,
    sum_timer_wait / 1000000000 as total_exec_time_sec
FROM performance_schema.events_statements_summary_by_digest
WHERE schema_name = 'practice_db'
ORDER BY avg_timer_wait DESC
LIMIT 10;

-- Index usage statistics
SELECT 
    object_name as table_name,
    index_name,
    count_fetch,
    count_insert,
    count_update,
    count_delete
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE object_schema = 'practice_db'
ORDER BY count_fetch DESC;

-- Table lock statistics
SELECT 
    object_name as table_name,
    count_read,
    count_write,
    count_read_normal,
    count_read_with_shared_locks,
    count_read_high_priority,
    count_read_no_insert,
    count_read_external,
    count_write_allow_write,
    count_write_concurrent_insert,
    count_write_delayed,
    count_write_low_priority,
    count_write_normal,
    count_write_external
FROM performance_schema.table_lock_waits_summary_by_table
WHERE object_schema = 'practice_db';

-- Create additional indexes for optimization (examples)
-- Note: These are examples - analyze your query patterns first
-- CREATE INDEX idx_employee_dept_salary ON employees(department, salary);
-- CREATE INDEX idx_project_status_dates ON projects(status, start_date, end_date);
-- CREATE INDEX idx_emp_proj_hours ON employee_projects(hours_allocated);

-- Query optimization example - EXPLAIN usage
EXPLAIN FORMAT=JSON 
SELECT e.first_name, e.last_name, e.salary, d.name as dept_name
FROM employees e
INNER JOIN departments d ON e.department = d.name
WHERE e.salary > 60000
ORDER BY e.salary DESC;

-- Check for duplicate data
SELECT 
    email, 
    COUNT(*) as duplicate_count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;

SELECT 
    employee_code, 
    COUNT(*) as duplicate_count
FROM employees
GROUP BY employee_code
HAVING COUNT(*) > 1;
