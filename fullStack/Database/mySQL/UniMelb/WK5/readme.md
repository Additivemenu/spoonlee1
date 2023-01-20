
# 0. show the catalogue (meta data) about hte Department table
```sql
DESC Department;
DESC employee;
```

# 1. SELECT
```sql
SELECT *
FROM department;
```

```sql
SELECT *
FROM employee;
```

# 2. Filtering
## 2.1 filter to particular colums ---
```sql
SELECT Name, Floor
From department;
```

```sql
Select firstname, lastname, departmentid
From employee;
```

## 2.2 filter to particular rows ---
```sql
Select *
From department
where floor =2;
```

```sql
Select *
From department
where Name LIKE 'M%';     #name start with M 
```

```sql
Select firstname, lastname, departmentid
From employee
where salary < 55000;
```

## 2.3 filtering under multiple conditions
```sql
select *
from department
where Name LIKE 'M%' AND ManagerID =1;
```

```sql
select *
from department
where Name LIKE 'M%' OR ManagerID =1;
```

## 2.4 Math conditions
```sql
Select *
From department
Where floor > 1;
```

```sql
Select Name, Floor
From department 
where Floor != 5;
```

```sql
Select Name, floor
From department 
where floor <> 5;
```

# 3. Order by
```sql 
Select name, Floor
From department
Where Floor != 5
Order by Floor;
```

```sql
Select name, Floor
From department
Where Floor != 5
Order by Floor DESC;
```

## 3.1 Oder by more than one column
```sql
Select *
From department
Order by Floor DESC, departmentid ASC;			# sorting Floor is in priority, then deparmentid
```

## 3.2 practice 
```sql
Select firstname, lastname, departmentid, salary
From employee
Where departmentid = 11 AND salary > 55000;
```

```sql
Select firstname, lastname, departmentid, salary
From employee
Where departmentid = 11 OR salary > 55000;
```

```sql
Select firstname, lastname, salary, departmentid
From employee
Where salary > 45000 
Order by salary Desc;
```

```sql
Select *
From employee
Order by departmentid, lastname;
```

# 4. Limit
```sql
Select name
From department
Where Floor = 5
Order by name Asc
Limit 2;
```

```sql
Select name
From department
Where Floor = 5
Order by name desc
Limit 2;
```

```sql
Select firstname, lastname, salary
From employee
Order by salary desc
Limit 5;
```

# 5. AS
```sql
Select '1334347' AS studid, name, Floor
From department;
```

```sql
Select '1344347' AS studid, department.*
From department;
```

# 6. Functions
## 6.1 Count()
```sql
Select count(*)
From department;
```

```sql
Select count(name)
From department;
```

```sql
Select concat(firstname, ' ', lastname, 'work in the', department.name, ' department') AS INFO
From employee
Natural Join department;  # we do not recommend using natural join as it is slower than inner join
```

```sql
Select count(*)
From employee;
```

# 7.:full_moon:Group by
Group by永远伴随着aggregate function一起使用, 如下例中,
Group by floor 代表count()是针对floor不同的值, 分别进行count;

如果不写group by, 则结果count全部的row, 所以注意在使用aggregate function时确保你写了正确的group by. group by 后面也可跟多个column, 见week6 tut 4.

```sql
Select floor, count(departmentid)
From department
Group by floor
Order by floor;
```

```sql
Select floor, count(departmentid)
From department
Order by floor;
```

## 7.1 practice
```sql
Select departmentid, count(employeeid)
From employee
Group by departmentid;
```

```sql
Select departmentid, avg(salary)
From employee
Group by departmentid;
```

```sql
Select departmentid, max(salary) AS Max_salary
From employee
Group by departmentid
Order by Max_salary desc
Limit 1;
```

```sql
Select departmentid, min(salary) AS Min_salary
From employee
Group by departmentid
Order by Min_salary 
Limit 1;
```