
CRUD后端流程

---
7min-

docker

postman

spring initializer

版本先选择2.7.8

+ Spring web
+ lombok
+ spring data jpa
+ h2 database
+ postgresSQL driver
+ validation
+ flyway
+ spring boot actuator
+ spring security  


VM option复制输入如下代码:
-Djava.rmi.server.hostname=localhost

32min-
actuator的作用:
+ postman输入http://localhost:8080/actuator/health


---
35min-

搭建数据库
- dock-compose.yml: 输入如下配置

```yml
version: "3.3"
services:
  database:
    image: postgres:13.0-alpine
    volumes:
      - postgresql_data:/var/lib/postgresql/data/
    ports:
      - "5478:5432"
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=admin
volumes:
  postgresql_data: {}
```

之后在terminal输入: 
```bash
docker-compose up
```

45min-
yml 配置文件的讲解

47min-
pgadmin安装

53min-
创建一个数据库里的table

main>resource>db.migration>new file: V1__create_user_table.sql

在里面写:
```sql
CREATE TABLE "user" (
                        "id" BIGSERIAL PRIMARY KEY,
                        "email" VARCHAR(255) UNIQUE NOT NULL,
                        "name" VARCHAR(255) NOT NULL,
                        "password" CHAR(64) NOT NULL,
                        "created_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                        "updated_time" TIMESTAMP WITH TIME ZONE NOT NULL
);
```

application.properties --> application.yml, 复制粘贴如下配置信息

```yml
server:
  servlet:
    context-path: /api/v1
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:5478/postgres
    username: postgres
    password: admin
  jpa:
    database: postgresql
    properties:
      hibernate:
        default_schema: public
        jdbc:
          time_zone: UTC
```


运行application
```bash
2023-01-13 20:40:48.687  INFO 6719 --- [           main] o.f.c.i.database.base.BaseDatabaseType   : Database: jdbc:postgresql://localhost:5478/postgres (PostgreSQL 13.0)
2023-01-13 20:40:48.708  INFO 6719 --- [           main] o.f.core.internal.command.DbValidate     : Successfully validated 1 migration (execution time 00:00.006s)
```

连接数据库与pgadmin
- 注意输入和docker-composer.yml的配置一样

---
1h17min-

开始写代码

