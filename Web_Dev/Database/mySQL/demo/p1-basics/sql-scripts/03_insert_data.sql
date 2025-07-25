-- ================================================================
-- 03 - INSERT DATA (CREATE operations)
-- MySQL 8 Practice - Sample Data Insertion
-- ================================================================

-- Insert departments first
INSERT INTO departments (dept_code, name, description, budget, location) VALUES
('ENG', 'Engineering', 'Software development and technical innovation', 500000.00, 'Building A, Floor 3'),
('MKT', 'Marketing', 'Brand management and customer acquisition', 200000.00, 'Building B, Floor 1'),
('HR', 'Human Resources', 'Employee relations and talent management', 150000.00, 'Building A, Floor 2'),
('SAL', 'Sales', 'Revenue generation and client relationships', 300000.00, 'Building B, Floor 2'),
('FIN', 'Finance', 'Financial planning and accounting', 180000.00, 'Building A, Floor 1'),
('OPS', 'Operations', 'Business operations and logistics', 250000.00, 'Building C, Floor 1');

-- Insert employees
INSERT INTO employees (employee_code, first_name, last_name, email, phone, department, position, salary, hire_date, birth_date) VALUES
('EMP001', 'John', 'Doe', 'john.doe@company.com', '555-0101', 'Engineering', 'Senior Developer', 85000.00, '2022-01-15', '1990-03-20'),
('EMP002', 'Jane', 'Smith', 'jane.smith@company.com', '555-0102', 'Marketing', 'Marketing Manager', 70000.00, '2022-02-01', '1988-07-12'),
('EMP003', 'Mike', 'Johnson', 'mike.johnson@company.com', '555-0103', 'Engineering', 'Lead Developer', 95000.00, '2021-11-20', '1985-11-05'),
('EMP004', 'Sarah', 'Wilson', 'sarah.wilson@company.com', '555-0104', 'Human Resources', 'HR Specialist', 55000.00, '2023-03-10', '1992-09-18'),
('EMP005', 'David', 'Brown', 'david.brown@company.com', '555-0105', 'Sales', 'Sales Representative', 60000.00, '2023-02-15', '1991-12-03'),
('EMP006', 'Lisa', 'Garcia', 'lisa.garcia@company.com', '555-0106', 'Finance', 'Financial Analyst', 65000.00, '2022-08-01', '1989-04-25'),
('EMP007', 'Tom', 'Anderson', 'tom.anderson@company.com', '555-0107', 'Engineering', 'Junior Developer', 55000.00, '2023-06-01', '1995-01-14'),
('EMP008', 'Emily', 'Davis', 'emily.davis@company.com', '555-0108', 'Operations', 'Operations Manager', 75000.00, '2022-05-15', '1987-08-30'),
('EMP009', 'Chris', 'Miller', 'chris.miller@company.com', '555-0109', 'Marketing', 'Content Specialist', 50000.00, '2023-04-20', '1993-06-08'),
('EMP010', 'Anna', 'Taylor', 'anna.taylor@company.com', '555-0110', 'Sales', 'Senior Sales Rep', 68000.00, '2022-12-01', '1986-10-22');

-- Insert projects
INSERT INTO projects (project_code, name, description, start_date, end_date, budget, status, department_id) VALUES
('PRJ001', 'Mobile App Development', 'Develop new mobile application for customer engagement', '2023-01-01', '2023-12-31', 200000.00, 'Active', 1),
('PRJ002', 'Brand Refresh Campaign', 'Complete rebranding and marketing campaign', '2023-03-01', '2023-09-30', 150000.00, 'Active', 2),
('PRJ003', 'CRM System Upgrade', 'Upgrade customer relationship management system', '2023-02-15', '2023-08-15', 100000.00, 'Completed', 1),
('PRJ004', 'Employee Training Program', 'Comprehensive skills development program', '2023-01-15', '2023-06-15', 75000.00, 'Completed', 3),
('PRJ005', 'Sales Automation Tool', 'Implement new sales automation platform', '2023-04-01', '2023-10-31', 120000.00, 'Active', 4);

-- Insert employee-project assignments
INSERT INTO employee_projects (employee_id, project_id, role, start_date, hours_allocated) VALUES
(1, 1, 'Lead Developer', '2023-01-01', 40.00),
(3, 1, 'Senior Developer', '2023-01-01', 35.00),
(7, 1, 'Junior Developer', '2023-06-01', 30.00),
(2, 2, 'Project Manager', '2023-03-01', 25.00),
(9, 2, 'Content Creator', '2023-03-01', 30.00),
(1, 3, 'Technical Lead', '2023-02-15', 20.00),
(4, 4, 'Training Coordinator', '2023-01-15', 35.00),
(5, 5, 'Sales Consultant', '2023-04-01', 15.00),
(10, 5, 'Senior Consultant', '2023-04-01', 20.00);

-- Verify data insertion
SELECT COUNT(*) AS total_departments FROM departments;
SELECT COUNT(*) AS total_employees FROM employees;
SELECT COUNT(*) AS total_projects FROM projects;
SELECT COUNT(*) AS total_assignments FROM employee_projects;
