作为基础阶段第2弹的数据库技术

JavaSE ---> DB (MySQL ---> <u>JDBC</u> ) ---> JavaWeb ---> SSM(Spring + SpringMVC + MyBatis) ---> SpringBoot2 ---> Projects

---

:pencil: [康师傅: MySQL](./mySQL/GuiguShang/mySQL.md)

:pencil: [UniMelb: MySQL](./mySQL/UniMelb/MySQL_Unimelb.md)

:pencil: [康师傅: JDBC](./JDBC/myJDBC.md)

---



# Part0 Intro 

## Why DBMS

Control of data redundancy

data sharing

Enforcement of integrity constraints

restriction of unauthorized access

Backup and recovery facilities



## Relational Data models

Unimelb前3周讲的







# Part1 搭建PostgresSQL DB



用锤姐17-Java的weather-app project (里面有一份docker-compose.yml配置文件)里, 使用Docker搭建数据库, pgadmin再连接数据库



记得安装Intellij的settings > plugin > docker插件



## docker-compose.yml

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



上面这个yml对应3部分services: 

+ postgres
+ pgadmin
+ graphical-engine



## docker-compose

接下来, 在Terminal跑下面的指令来通过docker建立数据库(可能得等10分钟搭建...)

```bash
docer-compose up -d
```



之后在docker可以看到对应的3个services, 以及他们对应的port number (port on the local host : standard port number)

<img src="./Src_md/docker_afterCompose.png" style="zoom:50%;" />



这样其实是在docker container里分别起了postgres和pgadmin两个服务器, 并将他们的内部端口号 映射为 localhost端口号 

+ Postgres: 5432 ---> 15432 
+ pgAdmin: 80 ---> 18002

<img src="./Src_md/docker_container.png" style="zoom: 50%;" />



## 连接postgres与pgAdmin

有两种办法可以打开pgAdmin (JR18期SQL):

方式1:

在浏览器输入 `localhost:18002`, 即可打开pgadmin的localhost登陆页面, 接着按刚才配置的文件输入User与Password

<img src="./Src_md/pgAdmin_localhost.png" style="zoom:50%;" />



方式2: 

打开下载好的pgadmin App



这两种方式都可以连接刚刚通过docker-compose.yml起好的postgres, 区别在于

+ 如果由localhost:18002启动pgAdmin, 则在连接postgres时， postgres的端口号应为5432; 因为此时pgAdmin和postgres都在docker container里
+ 如果由pgAdmin app连接postgres, 则postgres的端口号应声明为15432; 因为此时pgAdmin在docker container之外, 需要通过localhost的port number与postgres相连接



现在在pgAdmin里点击Add New Server, 填入要连接的postgres server的信息, 注意要上面的docker-compose.yml相匹配, 这样就将pgAdmin和postgres连接起来了

+ Port: 15432 (if pgAdmin app) / 5432 (if pgAdmin 网页端)

+ POSTGRES_DB=weather
+ POSTGRES_USER=postgres
+ POSTGRES_PASSWORD=admin



## 创建表

如果手动在pgadmin中创建database的话, 邮件点击database > create new database, 之后右键新建的database > query tool, 在query editor里面输入DDL:

```sql
CREATE TABLE directors(
	director_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30) NOT NULL
	data_of_birth DATE,
	nationality VARCHAR(20)
)
```

跑一下



接着创建表

```sql
CREATE TBLE movies(
	movie_id SERIAL PRIMARY KEY,
	movie_name VARCHAR(50) NOT NULL,
	movie_length INT,
	movie_lang VARCHAR(20),
	release_date date, 
	age_certificate VARCHAR(5),
	director_id INT REFERENCES directors (director_id)
);
```



```sql
CREATE TABLE actors(
	actor_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	gender char(1),
	date_of_birth DATE
);
```



ALTER TABLE

```sql
-- ALTER table
CREATE TABLE examples(
	example_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30),
	last_name VARCHAR(30)
);

SELECT * FROM examples;

-- 
ALTER TABLE examples
ADD COLUMN email VARCHAR(50) UNIQUE;

ALTER TABLE examples
ADD COLUMN nationality VARCHAR(30),
ADD COLUMN age INT NOT NULL;

-- modify a columns date type
ALTER TABLE examples
ALTER COLUMN nationality TYPE CHAR(3);


-- drop a column from a table
ALTER TABLE examples
DROP COLUMN nationality;
```



接着我们insert  一些data: insert.sql

JR17-Java-sql代码见 [DDL: create table](./JR17_ava_SQL/DDL.sql), 不过还是UniMelb的SQL练习更全面

pgAdmin可以像MySQL那样对数据库进行图形化界面操作, 这里就是展示如何在pgAdmin里通过query tool写SQL并对数据库数据进行操作, JR这部分内容不用怎么看了







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

## 1. DDL

### CREATE DATABASE

```sql
CREATE DATABASE database_name
```





### CREATE TABLE

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





### ALTERT TABLE







### DROP TABLE







### CREATE INDEX







### DROP INDEX







## 2. DML

CRUD



### 2.1 INSERT 

```sql
INSERT INTO BankHQ VALUES
(1, "23 Charles St Peterson North 2022", "Main Branch");

-- 指定column插入
INSERT INTO BankHQ (`HQAddress`, `OtherHQDetails`) VALUES
("23 Charles St Peterson North 2022", "Main Branch");
```



### 2.2 :full_moon: SELECT

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



#### WHERE 子句

`LIKE`

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



---

`AS`

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



---

引号的使用

SQL使用但引号包裹文本

如果是数值则不需要引号



---

AND & OR operator





---

BETWEEN ... AND

作用和   x1<= x<=x2 一样





#### GROUP BY & HAVING

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
+ :bangbang: note `WHERE` cannot be used with aggregation function

```sql
SELECT AVG(OutstandingBalance)
FROM Account
GROUP BY CustomerID
HAVING AVG(OutstandingBalance) < 10000
```

#### Aggregation function

+ AVG()
+ MIN()
+ MAX()
+ SUM()
+ COUNT(): count row number, 尽管某行是null也会被算入; 上面的几个函数计算时会忽略null value

```sql
COUNT(DISTINCT(department.departmentid))  -- 将table中departmentid重复的多行只计为1行
```

#### SELECT 常用的辅助函数

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



#### VIEW 

相当于把SELECT的结果给存起来

```sql
CREATE VIEW v_DEPT_SALARY AS
SELECT ...
```





### 2.3 :full_moon: Join table

#### INNER JOIN

```sql
A INNER JOIN B on A.key = B.key
```

本质是A表不变, 将B表中match criteria的row重新排序, 然后加到A表右侧

<img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Database/Src_md/InnerJoin.jpg" style="zoom:50%;" />



#### OUTER JOIN 

+ can be left or right
+ 相当于INNER JOIN + left or right table中not match 的tuple
  + right join 就返回right table中unmatched rows, 此时它们对应在left table中为null (见下图)
  + left jon同理




<img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Database/Src_md/OuterJoin.jpg" style="zoom: 50%;" />



#### UNION & INTERSECT

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





### 2.4 :moon: Query nesting

墨大没讲明白, 看康师傅吧

IN/NOT IN

EXIST

ANY

ALL





### 2.5 UPDATE

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





### 2.6 DELETE

```sql
DELETE FROM Employee;   -- delete all records in Employee, but table still exists

DELETE FROM Employee
WHERE Name = "Grace";		-- delete matched records

```

note to be aware of the foreign key constraints

+ ON DELETE CASCADE or ON DELETE RESTRICT 





## 3. DCL 









# Part3 Database Basics



## Transaction (事务) 2h32min- 2h57min

一组SQL命令ACID

+ 要么全都执行, 要么全都不执行(Actomicity/原子性)
+ 在分布式语境下, 在transaction开始和完成时, 数据都必须保持一致状态 (Consistency/一致性)
+ 事务在不受外部并发操作影响的"独立"环境执行 (Isolation/隔离性)
+ 事务完成后, 它对于数据的修改是永久的(Durable/持久性)

NoSQL DB大部分不支持Transaction



RDBMS:

Database Normalization

大表拆成小表, 降低冗余消除依赖 (NoSQL不存在这个问题)

+ 1NF
+ 2NF
+ 3NF
+ Boyce-Codd normal form (BCNF)

Database denormalization

小表合成大表



作为developer, 工作中真的需要掌握SQL吗?

+ 需要! 设计DB schema, primary key, foreign key, index, transaction必知必会
+ ORM的性能好不好, 做report时需要sql
+ Data migration
+ Trouble shooting
+ 性能调优



---

除此以外, 关于数据库系统, 还有

+ Relational database design (ER modelling, physical modelling...)
+ Normalization

+ transaction and concurrecy control
+ dataware housing
+ Dimensional modelling
+ Database security
+ distributed database
+ NoSQL
+ Database architecture

等topic, 见 <u>Database System Concepts 7th Edith</u> 以及UniMelb课件. 详细理论性质的东西不在md里记录了
