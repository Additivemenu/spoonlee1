# MySQL Practice Scripts - README

This directory contains a comprehensive set of MySQL practice scripts broken down into manageable, focused files. Each file covers specific aspects of MySQL and SQL operations.

## 📁 File Structure

### Core Learning Files (Run in Order)

1. **`01_database_setup.sql`** - Database creation and initial setup
2. **`02_create_tables.sql`** - Table creation with relationships and indexes
3. **`03_insert_data.sql`** - Sample data insertion for practice
4. **`04_basic_select.sql`** - Basic SELECT queries and filtering
5. **`05_aggregates_grouping.sql`** - Aggregate functions and GROUP BY
6. **`06_joins.sql`** - Table joins and relationships
7. **`07_subqueries.sql`** - Subqueries and advanced filtering
8. **`08_update_operations.sql`** - Data modification operations
9. **`09_delete_operations.sql`** - Data deletion operations
10. **`10_advanced_queries.sql`** - Window functions, CTEs, and MySQL 8.0+ features

### Analysis and Maintenance Files

11. **`11_data_analysis.sql`** - Business intelligence and reporting queries
12. **`12_maintenance_optimization.sql`** - Database performance and maintenance
13. **`13_cleanup_reset.sql`** - Database cleanup and reset operations
14. **`14_practice_exercises.sql`** - Self-study exercises and challenges

### Original Reference

- **`practice.sql`** - The original comprehensive file (kept for reference)

## 🚀 Getting Started

### Prerequisites

- MySQL 8.0+ installed
- Access to MySQL command line or phpMyAdmin
- Docker with the provided docker-compose.yml (recommended)

### Quick Start with Docker

```bash
# Start the containers
docker-compose up -d

# Access phpMyAdmin at http://localhost:8080
# Login: root / rootpassword
```

### Running the Scripts

#### Option 1: Sequential Learning (Recommended for beginners)

Run the files in order from 01 to 14:

```sql
-- In MySQL command line or phpMyAdmin
SOURCE /path/to/01_database_setup.sql;
SOURCE /path/to/02_create_tables.sql;
SOURCE /path/to/03_insert_data.sql;
-- ... continue with other files
```

#### Option 2: Quick Setup (For experienced users)

```sql
-- Run the first 3 files to set up the environment
SOURCE /path/to/01_database_setup.sql;
SOURCE /path/to/02_create_tables.sql;
SOURCE /path/to/03_insert_data.sql;

-- Then explore specific topics as needed
```

#### Option 3: Use Original File

```sql
-- Run the complete original file
SOURCE /path/to/practice.sql;
```

## 📚 Learning Path

### Beginner Path

1. Start with `01_database_setup.sql`
2. Learn table creation with `02_create_tables.sql`
3. Practice basic queries with `04_basic_select.sql`
4. Explore aggregates with `05_aggregates_grouping.sql`

### Intermediate Path

1. Master joins with `06_joins.sql`
2. Learn subqueries with `07_subqueries.sql`
3. Practice data modification with `08_update_operations.sql` and `09_delete_operations.sql`

### Advanced Path

1. Explore modern SQL features with `10_advanced_queries.sql`
2. Learn business analysis with `11_data_analysis.sql`
3. Understand optimization with `12_maintenance_optimization.sql`

### Expert Path

1. Challenge yourself with `14_practice_exercises.sql`
2. Experiment with performance optimization
3. Create your own complex scenarios

## 🛠 Database Schema

The practice database includes four main tables:

- **`departments`** - Company departments with budgets and locations
- **`employees`** - Employee information with salaries and hire dates
- **`projects`** - Company projects with timelines and budgets
- **`employee_projects`** - Many-to-many relationship between employees and projects

## 📊 Sample Data

Each table includes realistic sample data:

- 6 departments (Engineering, Marketing, HR, Sales, Finance, Operations)
- 10 employees across different departments
- 5 projects with various statuses
- Project assignments linking employees to projects

## 🎯 Key Learning Objectives

### Basic SQL Skills

- ✅ Database and table creation
- ✅ Data insertion and basic queries
- ✅ Filtering with WHERE clauses
- ✅ Sorting and limiting results

### Intermediate SQL Skills

- ✅ Aggregate functions and grouping
- ✅ Table joins (INNER, LEFT, RIGHT)
- ✅ Subqueries and correlated queries
- ✅ Data modification (UPDATE, DELETE)

### Advanced SQL Skills

- ✅ Window functions and ranking
- ✅ Common Table Expressions (CTEs)
- ✅ Recursive queries
- ✅ Performance optimization

### Business Analysis Skills

- ✅ Reporting and analytics
- ✅ Data quality assessment
- ✅ Performance metrics calculation
- ✅ Business intelligence queries

## 🔧 Tools and Environment

### Recommended Tools

- **phpMyAdmin** (included in docker-compose) - Web-based MySQL administration
- **MySQL Workbench** - Visual database design and querying
- **VS Code with MySQL extensions** - Code editing and execution

### Docker Environment

The provided `docker-compose.yml` includes:

- MySQL 8.0 database server
- phpMyAdmin for web-based administration
- Persistent data storage
- Pre-configured networking

## 📈 Performance Tips

1. **Index Usage**: Pay attention to the indexes created in `02_create_tables.sql`
2. **Query Optimization**: Use `EXPLAIN` to understand query execution plans
3. **Data Types**: Notice the appropriate data type choices for different fields
4. **Relationships**: Understand the foreign key relationships between tables

## 🚨 Safety Notes

- **Backup Important Data**: These scripts include DELETE and DROP operations
- **Test Environment**: Use a dedicated practice database, not production
- **Gradual Learning**: Don't run all scripts at once - learn incrementally
- **Read Comments**: Each file has detailed comments explaining the operations

## 🤝 Contributing

Feel free to:

- Add new practice scenarios
- Improve existing queries
- Submit performance optimizations
- Share additional learning resources

## 📝 Next Steps

After completing these exercises:

1. **Practice Real Scenarios**: Apply these skills to actual business problems
2. **Explore Advanced Topics**: Study stored procedures, triggers, and functions
3. **Learn Other Databases**: Apply similar concepts to PostgreSQL, SQL Server
4. **Build Applications**: Integrate SQL skills into web development projects

## 🔗 Additional Resources

- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [SQL Performance Tuning](https://use-the-index-luke.com/)
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [SQL Practice Problems](https://www.hackerrank.com/domains/sql)

---

Happy Learning! 🎓
