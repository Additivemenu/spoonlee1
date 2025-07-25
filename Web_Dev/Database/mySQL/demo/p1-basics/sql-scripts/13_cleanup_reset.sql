-- ================================================================
-- 13 - CLEANUP AND RESET
-- MySQL 8 Practice - Database Cleanup Operations
-- ================================================================

-- WARNING: These operations will delete data and tables!
-- Only run these commands if you want to reset your practice database

-- Show current tables before cleanup
SHOW TABLES;

-- Show current data counts
SELECT 'departments' as table_name, COUNT(*) as row_count FROM departments
UNION ALL
SELECT 'employees' as table_name, COUNT(*) as row_count FROM employees
UNION ALL
SELECT 'projects' as table_name, COUNT(*) as row_count FROM projects
UNION ALL
SELECT 'employee_projects' as table_name, COUNT(*) as row_count FROM employee_projects;

-- ================================================================
-- OPTION 1: Delete all data but keep table structure
-- ================================================================

-- Delete data from tables (order matters due to foreign key constraints)
-- Uncomment these lines to delete all data:

-- DELETE FROM employee_projects;
-- DELETE FROM projects;
-- DELETE FROM employees;
-- DELETE FROM departments;

-- Reset auto-increment counters
-- ALTER TABLE employee_projects AUTO_INCREMENT = 1;
-- ALTER TABLE projects AUTO_INCREMENT = 1;
-- ALTER TABLE employees AUTO_INCREMENT = 1;
-- ALTER TABLE departments AUTO_INCREMENT = 1;

-- ================================================================
-- OPTION 2: Drop all tables (removes structure and data)
-- ================================================================

-- Drop tables in correct order (due to dependencies)
-- Uncomment these lines to drop all tables:

-- DROP TABLE IF EXISTS employee_projects;
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS employees;
-- DROP TABLE IF EXISTS departments;

-- ================================================================
-- OPTION 3: Drop entire database
-- ================================================================

-- Drop the entire database (be very careful!)
-- Uncomment this line to drop the entire database:

-- DROP DATABASE IF EXISTS practice_db;

-- ================================================================
-- VERIFICATION QUERIES (Safe to run)
-- ================================================================

-- Check if tables exist
SELECT 
    table_name,
    table_type,
    engine,
    table_rows
FROM information_schema.tables 
WHERE table_schema = 'practice_db'
ORDER BY table_name;

-- Check if database exists
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name = 'practice_db';

-- Show all databases (to confirm cleanup if database was dropped)
SHOW DATABASES;

-- ================================================================
-- QUICK RESET SCRIPT (All in one)
-- ================================================================

/*
-- Uncomment this entire block to perform a complete reset:

-- Step 1: Drop all tables
DROP TABLE IF EXISTS employee_projects;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- Step 2: Recreate tables (you can run the 02_create_tables.sql file instead)
-- [Table creation scripts would go here]

-- Step 3: Reload sample data (you can run the 03_insert_data.sql file instead)
-- [Data insertion scripts would go here]

-- Step 4: Verify reset
SHOW TABLES;
SELECT COUNT(*) as total_employees FROM employees;
SELECT COUNT(*) as total_departments FROM departments;
SELECT COUNT(*) as total_projects FROM projects;
SELECT COUNT(*) as total_assignments FROM employee_projects;
*/
