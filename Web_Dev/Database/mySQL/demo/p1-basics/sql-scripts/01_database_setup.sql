-- ================================================================
-- 01 - DATABASE SETUP AND EXPLORATION
-- MySQL 8 Practice - Database Creation and Initial Setup
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
