-- ================================================================
-- 14 - PRACTICE EXERCISES
-- MySQL 8 Practice - Self-Study Challenges
-- ================================================================

/*
PRACTICE EXERCISES - Try these on your own!

Complete these exercises to test your SQL skills. 
Solutions are not provided - try to write these queries yourself!

BASIC LEVEL:
============

1. Find all employees hired in 2023
   Hint: Use WHERE with date functions

2. Calculate the total budget for all departments
   Hint: Use SUM() aggregate function

3. Find the employee with the highest salary in each department
   Hint: Use window functions or subqueries

4. List all projects with their team members and roles
   Hint: Use JOINs between projects, employee_projects, and employees

5. Find departments with more than 2 employees
   Hint: Use GROUP BY with HAVING

INTERMEDIATE LEVEL:
==================

6. Calculate the average project duration in days
   Hint: Use DATEDIFF() and AVG() functions

7. Find employees who are not assigned to any projects
   Hint: Use LEFT JOIN with NULL check or NOT EXISTS

8. Update all Engineering employees' salaries by 10%
   Hint: Use UPDATE with WHERE clause

9. Find the youngest employee in each department
   Hint: Use MIN() with birth_date or window functions

10. Create a report showing department budgets vs actual salary costs
    Hint: JOIN departments with aggregated employee salaries

ADVANCED LEVEL:
==============

11. Find employees who work on more projects than the average
    Hint: Use subquery with COUNT and AVG

12. Calculate the utilization rate for each employee (total hours / 40 hours per week)
    Hint: Use SUM of hours_allocated and calculate percentage

13. Find departments where the average salary exceeds the department's budget per employee
    Hint: Complex calculation with GROUP BY and HAVING

14. Create a hierarchical report showing managers and their direct reports
    Hint: Use self-join on manager_id

15. Find the most common first name in each department
    Hint: Use COUNT, GROUP BY, and window functions

EXPERT LEVEL:
============

16. Calculate the ROI (Return on Investment) for each project
    Formula: (Project Budget - Total Salary Cost) / Total Salary Cost
    Hint: Complex JOINs and calculations

17. Find employees whose salary is within 1 standard deviation of their department average
    Hint: Use STDDEV() function and complex WHERE conditions

18. Create a monthly hiring report showing trends over time
    Hint: Use DATE_FORMAT() or MONTH() functions with GROUP BY

19. Find "skill gaps" - departments with projects but insufficient staff
    Hint: Compare project requirements vs employee availability

20. Build a recommendation engine: suggest which employees should work on which projects
    Based on department match, current workload, and salary level
    Hint: Complex scoring algorithm with multiple JOINs and CASE statements

BONUS CHALLENGES:
================

21. Create a stored procedure that calculates employee bonuses based on performance metrics

22. Write a query that finds potential salary inequities (similar roles, different pay)

23. Build a query that simulates organizational restructuring scenarios

24. Create a data quality report that identifies inconsistencies in the database

25. Write a query that predicts future staffing needs based on project pipeline

PERFORMANCE CHALLENGES:
======================

26. Optimize a slow query using proper indexing strategies

27. Rewrite a complex subquery using JOINs for better performance

28. Create a query that efficiently handles large datasets (use LIMIT, pagination)

29. Write a query that uses CTEs to improve readability and performance

30. Create an execution plan analysis for a complex reporting query

*/

-- ================================================================
-- SAMPLE SOLUTIONS STRUCTURE (Fill in the actual queries!)
-- ================================================================

-- Example structure for Exercise 1:
-- SELECT ... FROM employees WHERE ...;

-- Example structure for Exercise 3:
-- SELECT ... FROM employees e1 WHERE e1.salary = (SELECT MAX(e2.salary) FROM employees e2 WHERE e2.department = e1.department);

-- Example structure for Exercise 7:
-- SELECT ... FROM employees e LEFT JOIN employee_projects ep ON ... WHERE ep.employee_id IS NULL;

-- ================================================================
-- HINTS AND TIPS
-- ================================================================

/*
General Tips:
- Start with simple queries and build complexity gradually
- Always test your queries with small datasets first
- Use EXPLAIN to understand query performance
- Comment your complex queries for future reference
- Validate your results by cross-checking with known data

Common Patterns:
- Use JOINs to combine related data
- Use subqueries for complex filtering conditions
- Use window functions for ranking and running calculations
- Use aggregate functions with GROUP BY for summaries
- Use CTEs for readable complex queries

Performance Tips:
- Create indexes on frequently queried columns
- Use LIMIT when testing large result sets
- Avoid SELECT * in production queries
- Use appropriate JOIN types (INNER vs LEFT)
- Consider query execution order and optimization

Debugging Tips:
- Break complex queries into smaller parts
- Use temporary tables for intermediate results
- Print intermediate results to verify logic
- Use database tools to visualize execution plans
- Test with edge cases and empty datasets
*/
