SpringBoot class3

# 1. Tips 0 -

be careful when you want to use `static`. Define static method only in following scenarios:

​	1.if you are writing utitility classes and they are not supposed to be changed

​	2.if the method is not using any instance variable

​	3.if any operation is not dependent on instance creation

​	4.if there is some code that can easily be shared by al the instance methods, extract that code into a static method

​	5.if you are sure that the definition of the method will never be changed or overriden. As static method cannot be overridden

​	remember it might affect when you test other methods who use a static method

there should be no business logic in controller. Controller usually contain required validation (you could choose to put dto <-> entity in controllers too)

e.g. better not to define instance variable in controller class, might lead to bug. 

```java
@RestController
public class UserController {
    private List<User> users = new ArrayList<>();		// 后面如果你想对方法return的User object进行存储, 这种在controller里定义instance variable的写法不推荐. 会出现奇奇怪怪的问题,
}
```



If using default @Service / @Component annotation. should avoid adding any field that you want to use to stroe data in request



# 2. RESTful API 10min-

REST stands for *REpresentational State Transfer*. **REST is a web standards based architecture and uses HTTp Protocol for data communication.** It revolves around resources where every component is a resource and a resource is accessed by a common interface using HTTP standard methods. 

In REST architecture, a REST Server simply provides access to resources and the REST client accesses and presents the reousrces.

+ Here each resource is identified by **URIs / Global IDs**. 

+ REST uses various representations to represent a resource like Text, JSON and XML. JSON is now the most popular format being used in Web Services. 

**RESTful Web Services** are basically ***REST Achitecture based Web Services***. In REST Architecture everything is a resource. RESTful web services are light weight, highly scalable and maintainable and are very commonly used to create APIs for web-based applications.



REST server and REST client:

<img src="./Src_md/RESTful_API1.PNG" width=70%>

## 2.1 Resource 18min-

In REST architecture, everything is a resource. A **REST Server** simply provides access to resources and the **REST client** accesses and presents the reousrces. I/O流的产物.

+ Here each resource is identified by **URIs / Global IDs**. Every resource is unique.

+ REST uses various representations to represent a resource like Text, JSON and XML. JSON is now the most popular format being used in Web Services. 

:gem: Representation of resources: XML, JSON, HTML etc. 

```XML
// XML:
<user>
  <id>1</id>
  <name>Mahesh</name>
  <profession>Teacher</profession>
</user>
```

```jason
// JSON:
{
	"id": 1,
	"name": "Mahesh",
	"profession": "Teacher"
}
```

Good resource representation:

+ Understandability: Both server and client should be able to understand and utilize the representation format of the resource.
+ Completeness: Format should be able to represent a resource completely
+ Linkability: A resource can have a linkage to another resource. 就像对象里面可以包含另一个对象.





## 2.2 Messages 27min-

:book: [MDN: HTTP message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)

Message: HTTP request, HTTP response

Component of a HTTP Request: 

+ **Verb**: indicate HTTP methods (e.g. GET, POST, DELETE, PUT etc.)
+ **URI**: Uniform Resouce Identifier to identify the resource on the server
+ **HTTP Version**: e.g. HTTP v1.1
+ R**equest Header:** Contains metadata for the HTTP Request message as key-value pairs. e.g. client (or browser) type, format supported by the client, format of the message body, cache settings, etc.
+ **Request Body:** Message content or Resource representation



Component of a HTTP response:

+ **Status/Response code:** Indicates the Server status for the requested resource. e.g. 404 means resource not found. 200 means response is OK. 记住常见的规定的status code和对应含义.  :book: [MDN: HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
+ **HTTP Version:** e.g. HTTP v1.1
+ **Response Header:** Contains metadata for the HTTP Response message as key-value pairs. e.g. content length, content type, response date, server type, etc.
+ **Response Body:** Response message content or Resource representation



用DevTool > Network可以查看HTTP request, response; e.g.用如下url查看

https://samples.openweathermap.org/data/2.5/forecast?q=Melbourne,au&appid=b6907d289e10d714a6e88b30761fae22



## 2.3 Addressing 49min-

Addressing refers to locating a resource or multiple resources **lying on the server**.

e.g. https://samples.openweathermap.org/data/2.5/forecast?q=Melbourne,au&appid=b6907d289e10d714a6e88b30761fae22 is URL, in which: <u>data/2.5/forecast?q=Melbourne,au&appid=b6907d289e10d714a6e88b30761fae22</u> is URI

Constructing a standard URI:

+ **Use Plura Noun:** use plural noun to define resources
+ **Avoid using space:** use underscore (_) or hypenth (-) (more recommended) instead
+ **Use lowercase letter:** Although URI is case-insensitive, it is good practice to keep the url in lower case letters only
+ :star: **Maintain backward compatibility:** As web service is a public service, a URI once made public should always be available. In case, URI gets updated, redirect the older URI to a new URI using the HTTP status code, 300.
  + 可以在URI里声明版本号
+ **Use HTTP Verb:** Alway use HTTP Ver like GET, PUT, DELETE to do the operation on the resources. It is no good to include operations name in the URI.

```bash
// bad practice
GET http://localhost:8080/UserManagement/rest/UserService/getUser/1
DELETE http://localhost:8080/UserManagement/rest/UserService/deleteUser/1

// good practice
GET http://localhost:8080/usermanagement/api/v1/userservice/users/1
DEL http://localhost:8080/usermanagement/api/v1/userservice/users/1

// better
GET http://localhost:8080/api/v1/users/1
DEL http://localhost:8080/api/v1/users/1
```





## 2.4 Methods 1h06min-

即HTTP Verb提示的HTTP Method

The most commonly used HTTP methods in a REST based  architecture:

CRUD:

+ **GET:** provides a read only access to a resource
+ **POST:** used to create a new resource
+ **PUT:** used to update an existing resource or create a new resource
+ **DELETE:** used to remove a resource (大多数情况下不会用, 我们不会随便删除生产环境的数据)
+ **OPTIONS:** used to get the supported operations on a resource

中间穿插一些Q&A

:question: what are the differences between GET and POST ?

:gem: e.g.

| HTTP Method | URI       | Operation                                    |
| :---------- | --------- | -------------------------------------------- |
| GET         | /books    | Get list of books                            |
| GET         | /books/1  | Get book with Id 1                           |
| PUT         | /books2/2 | Update book with Id 2                        |
| POST        | /books    | Create a book                                |
| DELETE      | /books/1  | Delete Book with Id 1                        |
| OPTIONS     | /books    | List the supported operations in web service |



## 2.5 :moon: Stateless 1h26min-

**As per the REST architecture, a RESTful Web Service should not keep a client state on the server (也正因如此, 我们不应该在controller, service层面存储数据). **This restriction is called Statelessness. It is the responsibility of the client to pass its context to the server and then the server can store this context to process the client's further request. For example, session maintained by server is identified by session identifier passed by the client.

```xml
<book>
  <id>1</id>
  <name>Game of throne</name>
</book>
```

**Stateless means every time, you hit the RESTful Service, it should return the same value, regardless the State of the user journey.**

Ideompotency: 幂等性. 当用户短时间内输入多次相同的操作时, 服务器该如何处理. 比如1s内两次支付商品, 1s内多次booking restaurant. :question: google做further understanding



Stateless Pros vs. Cons

+ Pros
  + web services can treat each method request independently. 很大程度上降低server side的软件设计复杂度.
  + web services need not maintain the client's previous interactions. It simplifies the application design
  + As HTTP is itself a statelessness protocol, RESTful web services work seamlessly with HTTP protocols
+ Cons
  + Web services need to get extra information in each request and then interpret to get the client's state in case the client interactions are to be taken care of.
+ Solutions
  + Server side session, business process engine in the background etc.



1h44min-1h57min 歇息

## 2.6 Caching 1h57min-











## 2.7 Security