

JR wk4 lec2 Springboot, 配Intellij project: weather-app 



---

# 1. Spring intro: 0min-15min

+ EJB太复杂了, 
+ Rod Johnson: <<Expert one-on-one J2EE Design and Development>>  --> Sprring framework

## Spring Framework: 

+ an open source Java application framework, based on two key principles: 
  +  dependency injection; 
  +  inversion of control;
+ Spring has the ability to auto-wire the dependency at run time, which allows the developer to write loosely couped code.
+ high cohesion and loose coupling (高内聚低耦合) 有点类似encapsulation的意思

<img src="./Src_md/SpringFramework.jpg" alt="SpringFramework" style="zoom:40%;" />



## Spring Boot:
SpringBoot一套全新框架, 来自Spring大家族, 它的设计初衷是为Spring开发者提供一种更为快速, 体验更好的Spring应用开发方式. Spring boot以**约定大于配置**的核心思想, 默认帮我们进行了很多配置, 开箱即用, 同时也可快速扩展. 支持运行期内嵌容器, 如Tomcat, Jetty等. 没有冗余代码, 无需XML配置 (避免manual configuration带来错误)

https://spring.io/projects/spring-boot%C2%A0 官网介绍:

Spring Boot = Spring Framework + Embedded Server - Manual Configuration

可以看官方文档或者Spring官方GitHub来学习

---

Spring Boot 特性:

+ 使用Spring项目引导页面可以在几秒内构建一个project
+ Spring容器, 日志, 自动配置AutoConfiguration, Starter, 方便对外输出各种形式的服务, 如REST API, WebSocket, Web, Streaming, Tasks
+ 非常简洁的安全策略集成
+ 支持relational DB, non-relational DB
+ 支持运行期内嵌容器, 如Tomcat, Jetty
+ 强大的开发包, 支持热启动
+ 自动管理依赖
+ 自带应用监控
+ 支持各种IDE, 如Intellij, NetBeans

# 2. 第一个Spring Boot project 15min-1h35min

创建你的第一个spring boot project: https://start.spring.io/

选择gradle-Groovy, Java, SpringBoot 3.01, Artifact: weather-app, packaging Jar, Java17

dependency选择Spring web, Lombok, DevTools, validation, 然后点击generate

用intellij打开刚才generate的gradle project, 打开project structure --> set up SDK (JDK 17),  之后去build, Execution, Deployment > build tool > gradle 检查gradle确实使用了指定版本的JDK, 之后便会自动下载dependency

File > setting 搜索Annotation Processors: enable Annotation Processing

现在, WeatherappApplication class可以被run了, 邮件点击class name, run: 可以看到terminal 打印了log: 

debug时一定要注意看log, 尤其是第一个Exception

```bash
2023-01-04T21:50:24.682+11:00  INFO 4316 --- [  restartedMain] c.e.weatherapp.WeatherAppApplication     : Starting WeatherAppApplication using Java 17.0.5 with PID 4316 (/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Programming_Language/Java_Spring/weather-app/build/classes/java/main started by lixueshuo in /Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Programming_Language/Java_Spring/weather-app)
2023-01-04T21:50:24.684+11:00  INFO 4316 --- [  restartedMain] c.e.weatherapp.WeatherAppApplication     : No active profile set, falling back to 1 default profile: "default"
2023-01-04T21:50:24.702+11:00  INFO 4316 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2023-01-04T21:50:24.703+11:00  INFO 4316 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2023-01-04T21:50:25.078+11:00  INFO 4316 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2023-01-04T21:50:25.083+11:00  INFO 4316 --- [  restartedMain] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2023-01-04T21:50:25.083+11:00  INFO 4316 --- [  restartedMain] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.4]
2023-01-04T21:50:25.110+11:00  INFO 4316 --- [  restartedMain] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2023-01-04T21:50:25.110+11:00  INFO 4316 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 407 ms
2023-01-04T21:50:25.240+11:00  INFO 4316 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2023-01-04T21:50:25.252+11:00  INFO 4316 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2023-01-04T21:50:25.256+11:00  INFO 4316 --- [  restartedMain] c.e.weatherapp.WeatherAppApplication     : Started WeatherAppApplication in 0.712 seconds (process running for 0.939)
```

+ 可以看到port: 8080(http) --> 来源于Spring Boot默认配置
+ service: Tomcat; 想要我们的server side application要接受http请求, 需要web server, Tomcat就是这样一个web server, 我们的application是跑在web server中的. Spring Boot则是包在web server外面. 

<img src="/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Programming_Language/Java_Spring/Src_md/webServer.png" alt="webServer" style="zoom:50%;" />

在intellij运行project之后, 在浏览器输入http://localhost:8080/, 可见如下:

<img src="./Src_md/localhost8080.jpg" alt="localhost8080" style="zoom:50%;" />



# 3. build tool: gradle

## 3.1 gradle command 44min-1h14min

+ build.gradle > dependency: Springboot-starter 不写版本号是因为它自动follow up plungins中Springboot版本

+ maven central repo: 用来搜索dependency(找library) https://mvnrepository.com/repos/central, 搜索apache common lang, 在build.gradle中导入如下dependency:

  + ```
    implementation 'org.apache.commons:commons-lang3:3.12.0'
    ```


gradle command(也可在terminal输入命令): 在intellij右侧的gradle面板的task也可, e.g:

+ Application > bootRun: 编译project并运行
+ build > build: 在build > libs产生jar包
+ help > dependencies: 生成tree来显示dependency之间的依赖关系

---

题外话 1h10min- 1h14min:  

iTerm2: 老师用的Mac上的terminal 

ohmyzsh: 使得terminal五颜六色



## 3.2 为什么需要构建工具(build tool)? 1h14min-1h19min

+ 管理依赖.
+ 管理构建过程(build process). 我们希望在开发, 测试, production环境下能有一致的行为, 能够把build 出来的jar包运行在不同的环境

build tool的发展: Apache Ant --> maven --> gradle

further reading: :book: [maven vs. gradle](https://tomgregory.com/maven-vs-gradle-comparison/)



## 3.3 A little bit deeper: Annotation 1h19min-1h35min

:star:第二遍该看这个了

就是一个类或方法开头@...



AutoConfiguration



## 3.4. :full_moon: 代码目录结构 1h35min-2h15min

配置相关
```yaml
server:
  port: 8888      // 注意中间的空格
```



---

代码目录结构与应用的架构关系: 

service之间可以相互调用, 而不是直接去调用别的service对应的repository, 这样边界可以划的更加清晰, 方便重用降低耦合

结合PPT看



<img src="./Src_md/Catalog_structure.png" width=80%>





---

2h15min-2h21min 

歇息

# 4. :moon:RESTful API 2h21min-

最简单的request mapping 

<img src="./Src_md/restful1.png" width=80%>



Post 的结果. 利用postman



<img src="./Src_md/postman1.png" width=80%>