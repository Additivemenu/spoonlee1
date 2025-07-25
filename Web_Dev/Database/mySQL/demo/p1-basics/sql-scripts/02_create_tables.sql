-- ================================================================
-- 02 - TABLE CREATION (DDL - Data Definition Language)
-- MySQL 8 Practice - Create Tables with Relationships
-- db diagram: https://www.mermaidchart.com/app/projects/c643b2e9-8ac4-4f7a-a637-82f3f0959963/diagrams/ac2c9347-2a46-4d23-b465-2f11c39edee6/version/v0.1/edit
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
