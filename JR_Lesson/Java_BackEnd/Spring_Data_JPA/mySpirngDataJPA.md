JR17-22-9-25 lec



接上节Database SQL的课, 配weatherapp-2



# Introduction to JPA



ORM



JPA







# hands-on 12min-

## 准备工作

打开上次的weather-app (fullstack/...../springboot2/weather-app2)

打开对应docker database和pgadmin

Build.gradle放入Spring data jpa依赖

```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'org.postgresql:postgresql'
implementation 'org.flywaydb:flyway-core'
```

接着配置好resource > application.yml

```yml
spring:
  datasource:  		# 注意database的数据要和docker.compose.yml中的匹配
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:15432/postgres?currentSchema=weather			
    username: postgres
    password: admin
  flyway:
    enabled: true
    schemas: weather
  jpa:
    properties:
      hibernate:
        default_schema: weather
        jdbc:
          time_zone: UTC
    show-sql: true			# 这样执行的时候能够看到由Spirng JPA到底生成并运行了哪些SQL语句
```



19-20min intellij注入环境变量 了解即可, 用到在学 (不知道这个这节课不受影响)



## run application 21min-

Run application, 正常没报错

可以看到jpa启动起来的日志提示信息





创建Weather entity 25min-

```java
package com.fiona.weatherapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;     // Spring data jpa enabled
import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-30 9:36 pm
 */
@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weather")        // refer to database table: "weather"
public class Weather {
    @Id         // PK
    @GeneratedValue( strategy = GenerationType.IDENTITY)        // auto-generation strategy
    @Column(name = "id", updatable = false, nullable = false)       // constraint
    private Long id;

    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String country;
    @Column
    private String description;
    @Column
    private OffsetDateTime updatedTime;
}
```

其中用的多的Spring-data-jpa enabled annotation (主要是能够和数据库交互, 封装了JDBC?):

@Entity

@Table( )

@Id

@GeneratedValue( strategy = GenerationType.IDENTITY)

@Column



:bangbang:一些注意事项 https://www.jpa-buddy.com/blog/lombok-and-jpa-what-may-go-wrong/， lombok和Spring-data-jpa一起用有的地方会冲突

- Avoid using `@EqualsAndHashCode` and `@Data` with JPA entities;
- Always exclude lazy attributes when using `@ToString`;
- Don’t forget to add `@NoArgsConstructor` to entities with `@Builder` or `@AllArgsConstructor`.





:gem: 示例 33min-

注意这里的配置在实际开发中其实是应该避免使用的



如果启用如下的application.yml的配置

```yml
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:15432/postgres?currentSchema=weather
    username: postgres
    password: admin
  flyway:
    enabled: false				# don't do this in real production 
    schemas: weather
  jpa:
    properties:
      hibernate:
        default_schema: weather
        jdbc:
          time_zone: UTC
    show-sql: true
    hibernate:
      ddl-auto: update		# don't do this in real production
```



run application, 能看到下面的log



Log:

```bash
2023-02-03 10:13:58.694  INFO 2782 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2023-02-03 10:13:58.800  INFO 2782 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
```

性能瓶颈主要是I/O操作, 也就是数据库访问时用TCP, 最花时间的是建立连接的操作, 而数据库连接池(database connection pool)就是为了缓解这个问题提升性能, 起到类似缓存的作用, 把connection缓存到一个pool中





以及能看到pgadmin > postgres database 中一个Weather (基于我们刚刚定义的Weather entity)的table被创立了, 但里面没有tuple



## repository 48min-

WeatherRepository:

```java
import com.fiona.weatherapp.entity.Weather;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository                                           // <entity, pk data type>
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Optional<Weather> findByCityAndCountry(String city, String country); // Optional class避免nullPointer
    Page<Weather> findByCountry(String country, Pageable pageable);
    List<Weather> findAllByCountry(String country, Pageable pageable);
}
```





### test repository 55min- 1h15min

repository test的tricky point:

+ 要造数据来mock数据库的行为
+ 数据库其实作为第三方依赖, 这里其实就不是unit test而是某种层面的integration test

 

先在Test下新建一个directory: resources, 然后在里面新建一个application-test.yml的文件, 先不往里放东西



WeahterRepository对应的test class

```java
import com.fiona.weatherapp.entity.Weather;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.OffsetDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author xueshuo
 * @create 2023-02-03 10:47 am
 */
@SpringBootTest
public class WeatherRepositoryTest {

    @Autowired
    private WeatherRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testRepositoryFunctions() {
        OffsetDateTime now = OffsetDateTime.now();
        Weather mel = Weather.builder().city("Melbourne").country("AU").description("Windy").updatedTime(now).build();
        Weather syd = Weather.builder().city("Sydney").country("AU").description("Cloudy").updatedTime(now).build();
        repository.save(mel);
        repository.save(syd);

        // 比对
        assertEquals(2, repository.findAll().size());
        assertThat(repository.findByCityAndCountry("Melbourne", "AU").get())
                .usingRecursiveComparison().ignoringAllOverriddenEquals().isEqualTo(mel);   // 用assertThat()就不用重写equals()了
        repository.deleteAll();

        assertEquals(0, repository.findAll().size());
    }
}
```

尽量不用@SpringBootTest 在P3, 但test repository却要用, 为什么呢?  锤姐讲了





run test class, 可以在log里看到当运行 `testRepositoryFunctions()` 到底执行了哪些sql语句 (由我们在application.yml里的show-sql: true)

```bash
Hibernate: select weather0_.id as id1_0_, weather0_.city as city2_0_, weather0_.country as country3_0_, weather0_.description as descript4_0_, weather0_.updated_time as updated_5_0_ from weather.weather weather0_
Hibernate: insert into weather.weather (city, country, description, updated_time) values (?, ?, ?, ?)
Hibernate: insert into weather.weather (city, country, description, updated_time) values (?, ?, ?, ?)
Hibernate: select weather0_.id as id1_0_, weather0_.city as city2_0_, weather0_.country as country3_0_, weather0_.description as descript4_0_, weather0_.updated_time as updated_5_0_ from weather.weather weather0_
Hibernate: select weather0_.id as id1_0_, weather0_.city as city2_0_, weather0_.country as country3_0_, weather0_.description as descript4_0_, weather0_.updated_time as updated_5_0_ from weather.weather weather0_ where weather0_.city=? and weather0_.country=?
Hibernate: select weather0_.id as id1_0_, weather0_.city as city2_0_, weather0_.country as country3_0_, weather0_.description as descript4_0_, weather0_.updated_time as updated_5_0_ from weather.weather weather0_
Hibernate: delete from weather.weather where id=?
Hibernate: delete from weather.weather where id=?
Hibernate: select weather0_.id as id1_0_, weather0_.city as city2_0_, weather0_.country as country3_0_, weather0_.description as descript4_0_, weather0_.updated_time as updated_5_0_ from weather.weather weather0_
```



Q & A  1h10min - 1h15min

锤姐: 不要在repository里滥用SQL

谨慎使用selectAll, delete





# 基本查询 1h15min-



预先生成的方法



JpaRepository, PagingAndSortingRepository, CrudRepository 之间的关系





自定义简单查询 1h19min-



P15 有一个表





# 复杂查询 1h23min-

在实际的开发中, 需要用到分页, 筛选, 连表等查询的时候, 就需要用到特殊的方法或者自定义SQL



## 分页查询 1h23min-

WeatherRepository 中 有3个方法, 现在我们采用测试分页查询

```java
@Repository                                           // <entity, pk data type>
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Optional<Weather> findByCityAndCountry(String city, String country); // Optional class避免nullPointer

    // Optional<Weather> findByCityLike(String city);

    Page<Weather> findByCountry(String country, Pageable pageable);		// return  a Page
    List<Weather> findAllByCountry(String country, Pageable pageable);		// return a List
}
```





Spring Data JPA已经帮我们实现了分页的功能, 在查询的方法中, 需要传入参数Pageable 当查询中有多个参数的时候, Pageable建议做为最后一个参数输入:



在WeatherRepository对应的Test Class中写入如下测试方法

unit test: pageable

```java
@Test
public void testPageQuery() {

    // save mock data into database
    OffsetDateTime now = OffsetDateTime.now();
    Weather syd = Weather.builder().city("Sydney").country("AU").description("Cloudy").updatedTime(now).build();
    Weather mel = Weather.builder().city("Melbourne").country("AU").description("Windy").updatedTime(now).build();
    repository.save(mel);
    repository.save(syd);

    // page的settings
    int page = 0, size = 10;
    Sort sort = Sort.by(Sort.Direction.DESC, "id"); // 由id降序sort
    Pageable pageable = PageRequest.of(page, size, sort);

    // 分别测试WeatherRepository中的3个方法
    Page<Weather> all = repository.findAll(pageable);
    Page<Weather> countryPage = repository.findByCountry("AU", pageable);
    List<Weather> allCities = repository.findAllByCountry("AU", pageable);

    System.out.println("test");
}
```



:question: Pageable, Page 各代表啥, 上面这个测试结果呈现什么样子???



## 限制查询 1h29min

看到这里





