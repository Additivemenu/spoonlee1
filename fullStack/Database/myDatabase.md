作为基础阶段第2弹的数据库技术

JavaSE ---> DB (MySQL ---> <u>JDBC</u> ) ---> JavaWeb ---> SSM(Spring + SpringMVC + MyBatis) ---> SpringBoot2 ---> Projects

---

:pencil: [康师傅: MySQL](./mySQL/GuiguShang/mySQL.md)

:pencil: [UniMelb: MySQL](./mySQL/UniMelb/MySQL_Unimelb.md)

:pencil: [康师傅: JDBC](./JDBC/myJDBC.md)

---



# Part1 搭建PostgresSQL DB



用锤姐17-Java的weather-app project (里面有一份docker-compose.yml配置文件)里, 使用Docker搭建数据库, pgadmin再连接数据库

Docker-compose.yml:

```yml
version: '3.7'

services:

  postgres: // 表示用postgres搭建数据库的port, 与登入信息 (我们是用docker搭建的, 所以看这部分)
    image: postgres:14.2-alpine
    volumes:
      - postgresql_data:/var/lib/postgresql/test/data/
    restart: always
    ports:
      - 15432:5432
    environment:
      - POSTGRES_DB=weather
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=admin
    networks:
      - persist

  pgadmin:	// 表示用pdadmin搭建数据库的port, 与登入信息
    image: dpage/pgadmin4
    volumes:
      - pgadmin-data:/var/lib/test/pgadmin
    restart: always
    ports:
      - 18002:80
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@test.com
      PGADMIN_DEFAULT_PASSWORD: admin
    networks:
      - persist

  graphql-engine:
    image: hasura/graphql-engine:v2.9.0
    ports:
      - "18080:8080"
    depends_on:
      - "postgres"
    restart: always
    environment:
      ## postgres database to store Hasura metadata
      HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://postgres:admin@postgres:5432/weather
      ## this env var can be used to add the above postgres database to Hasura as a data source. this can be removed/updated based on your needs
      PG_DATABASE_URL: postgres://postgres:admin@postgres:5432/weather
      ## enable the console served by server
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      ## enable debugging mode. It is recommended to disable this in production
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      # HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
    networks:
      - persist

volumes:
  postgresql_data: {}
  pgadmin-data: {}
networks:
  persist: {}
```



Terminal跑下面的指令来通过docker建立数据库(可能得等10分钟搭建...)

```bash
docer-compose up -d
```



之后在pgadmin register server

填入信息和上面的docker-compose.yml相匹配

+ Port: 15432

+ POSTGRES_DB=weather
+ POSTGRES_USER=postgres
+ POSTGRES_PASSWORD=admin









---

# Part2 SQL 语言部分

UniMelb sql浓缩, 揉和17锤姐的lec

SQL provides the following capabilities:
+ Data Definition Language (DDL)
  + To define and set up the database
  + `CREATE`, `ALTER`, `DROP`
+ :full_moon: Data Manipulation Language (DML): 搞CRUD
  + TO maintain and use the database
  + `SELECT`, `INSERT`, `DELETE`, `UPDATE`
+ Data Control Language (DCL)
  + To control access to the database
  + `GRANT`, `REVOKE`
+ Other commands
  + Administer the database
  + Transaction Control
    + `START TRANSACTION`
    + `BEGIN`, `END`

# 1. DDL

## CREATE DATABASE

```sql
CREATE DATABASE database_name
```





## CREATE TABLE

```sql
CREATE TABLE Account(
    AccoutID            INT            AUTO_INCREMENT, 
    AccountName         VARCHAR(12),
    OutstandingBalance  DECIMAL(10,2)   NOT NULL,
    CustomerID          INT             NOT NULL,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (CustomerID) REFFERENCES Customer(CustomerID)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
)
```





## ALTERT TABLE







## DROP TABLE







## CREATE INDEX







## DROP INDEX







# 2. DML

CRUD



## 2.1 INSERT 

```sql
INSERT INTO BankHQ VALUES
(1, "23 Charles St Peterson North 2022", "Main Branch");

-- 指定column插入
INSERT INTO BankHQ (`HQAddress`, `OtherHQDetails`) VALUES
("23 Charles St Peterson North 2022", "Main Branch");
```



## 2.2 :full_moon: SELECT

```sql
-- 一般顺序
SELECT ...
FROM ...
WHERE ...
GROUP BY ...
HAVING ...  -- note HAVING cannot go before GROUP BY or WHERE
ORDER BY ...
LIMIT ...
```

### LIKE

String filter
+ `%` represents zero, one, or multiple characters
+ `_` represents a single character

在此基础上我们可以有:
```sql
WHERE CustLastName LIKE 'a%'        -- find any value that start with 'a'

WHERE CustLastName LIKE '%a'        -- find any value that end with 'a'

WHERE CustLastName LIKE '%or%'      -- finds any value that have 'or' in any position

WHERE CustLastName LIKE '_r%'       -- find any value that has 'r' in the second position

WHERE CustLastName LIKE 'a_%_%'     -- find any values that starts with 'a' and are at least 3 characters in length

WHERE CustLastName LIKE 'a%o'       -- find any values that starts with 'a' and end with 'o'
```

### AS 

alias, 用于修改query结果的column name的修改
```sql
SELECT custtype AS "Customer Type", COUNT(customerid) AS CUST_TOTAL
FROM customer
GROUP BY custtype;
```

LIMIT & OFFSET, ORDER BY

beautify query results
+ `LIMIT N`: limits the output size
+ `OFFSET N`:  skips the first N records

### GROUP BY & HAVING

usually used with aggregate function

```sql
-- 建立一个histogram, 横坐标为 CustomerID, 纵坐标为 AVG(OutstandingBalance)
SELECT AVG(OutstandingBalance)
FROM Account
GROUP BY CustomerID;
```

:bangbang: 注意
```sql
GROUP BY Name, Value  -- aggregate function 会认为 record with the same Name, Same Value为一类
GROUP BY Name -- aggregate function会认为 record with the same name为一组 (不管value是否一样)

```


the only way to put a filter on GROUP BY is to use HAVING
+ note where cannot be used with aggregate function

```sql
SELECT AVG(OutstandingBalance)
FROM Account
GROUP BY CustomerID
HAVING AVG(OutstandingBalance) < 10000
```

### Aggregation function

+ AVG()
+ MIN()
+ MAX()
+ SUM()
+ COUNT(): count row number, 尽管某行是null也会被算入; 上面的几个函数计算时会忽略null value

```sql
COUNT(DISTINCT(department.departmentid))  -- 将table中departmentid重复的多行只计为1行
```

### SELECT 常用的辅助函数

CONCAT() 字符串连接

```sql
CONCAT (firstname, '', lastname)

```

FORMAT()

```sql
SELECT department.departmentid, FORMAT(AVG(employee.salary), 2) AS averageSalary
FROM department INNER JOIN employee
on department.departmentid = employee.departmentid
GROUP BY department.departmentid
HAVING AVG(salary) > 55000;
```



日期相关的

MONTHNAME(date) e.g. 'June'

DAYNAME(date)

YEAR(date)

YEAR(CURRENT_DATE())

DAYDIFF(date1, date2)	date1 in the future



### VIEW 

相当于把SELECT的结果给存起来

```sql
CREATE VIEW v_DEPT_SALARY AS
SELECT ...
```





## 2.3 :full_moon: Join table

### INNER JOIN

```sql
A INNER JOIN B on A.key = B.key
```

本质是A表不变, 将B表中match criteria的row重新排序, 然后加到A表右侧



<img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Database/Src_md/InnerJoin.jpg" style="zoom:50%;" />



### OUTER JOIN 

+ can be left or right
+ 相当于INNER JOIN + left or right table中not match 的tuple



<img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Database/Src_md/OuterJoin.jpg" style="zoom: 50%;" />



### UNION & INTERSECT

UNION & INTERSECT 结果中元素不会重复, 操作集合之间的并, 交

```sql
A = {1, 2, 3}
B = {2, 3, 4}
A UNION B = {1, 2, 3, 4}
A INTERSECT B = {2, 3}

```

UNION ALL & INTERSECT ALL 结果中元素可能重复

```sql
A = {1, 2, 3}
B = {2, 3, 4}
A UNION ALL B = {1, 2, 3, 2, 3, 4}

```



Union is faster than Join,

+ INNER JOIN is faster than NATURAL JOIN

+ INNER JOIN is faster than sub-query





## 2.4 :moon: Query nesting

墨大没讲明白, 看康师傅吧

IN/NOT IN

EXIST

ANY

ALL





## 2.5 UPDATE

Change existing data in tables

+ Order of statement is important
+ Specifying a WHERE clasuse is important



```sql
-- incorrect statement order
UPDATE Salaried
	SET AnnualSalary = AnnualSalary * 1.05
	WHERE AnnualSalary <= 100000;
UPDATE Salaried
	SET AnnualSlary = AnnualSalary * 1.10
	WHERE AnnualSalary > 100000;
-- order of statement is important! if you do such as above, problem arise: e.g. People with salary of 99999 get boosted salary when running first stateement, and it will get boosted again when running second one

-- correct statement order:
UPDATE Salaried
	SET AnnualSlary = AnnualSalary * 1.10
	WHERE AnnualSalary > 100000;
UPDATE Salaried
	SET AnnualSalary = AnnualSalary * 1.05
	WHERE AnnualSalary <= 100000;
	
-- more conveniently 
-- use CASE statement
UPDATE Salaried
	SET AnnualSalary =
			CASE 
					WHEN AnnualSalary <= 100000
					THEN AnnualSalary * 1.05
					ELSE AnnualSalary * 1.10
			END;
```







## 2.6 DELETE

```sql
DELETE FROM Employee;   -- delete all records in Employee, but table still exists

DELETE FROM Employee
WHERE Name = "Grace";		-- delete matched records

```

note to be aware of the foreign key constraints

+ ON DELETE CASCADE or ON DELETE RESTRICT 







# 3. DCL 





# 其他
