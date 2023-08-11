4



# Abstract 



# Intro

## REST Services

Consider a business problem:

we want to build a client app that provides the weather report for a city, and we need to get weather data from external service (a 3rd party weather service)

```terminal
our app   <===>  weather app server
```



Problem is: how do we connect to the weather service ? 

+ we can make **REST(REpresentational State Transfer) API** calls over HTTP, 

  + a lightweight approach for communicating between applications
  + REST is language independent. 牛逼! 意味着前后端用什么语言写无所谓
  + REST can use any data format. Commonly see XML and JSON

+ Use online Weather Service API provided by: e.g. <u>openweathermap.org</u>

  + ```api
    // pass below url, weather service will respond in JSON
    api.openweathermap.org/data/2.5/weather?q={city name}
    OR
    api.openweathermap.org/data/2.5/weather?q={city name}, {country code}
    ```

    

## JSON

JSON is also language independent

```json
{
  "id": 14,
  "fisrtname": "Mario",
  "lastname": Rossi,
  "address": {
    "street": "100 Main St",
    "zip": "19103",
    "country": "USA"
  },
  "languages": ["Java", "C#", "Python"]
}
```



## SpringBoot REST HTTP Basics

Most common use of REST is over HTTP so that we could leverage HTTP methods for CURD 

| HTTP Method | CRUD Operation                           |
| ----------- | ---------------------------------------- |
| POST        | Create a new entity                      |
| GET         | Read a list of entities or single entity |
| PUT         | Update an existing entity                |
| DELETE      | Delete an existing entity                |



HTTP Request Message: it has 3 components:

+ Request line: the HTTP command
+ Header variables: request metadata
+ Message body: contents of message



HTTP Response Message

+ Response line: server protocol and status code
+ Header variable: response metadata
+ Message body:  contents of message

Status code

| Code Range | Description   |
| ---------- | ------------- |
| 100-199    | Informational |
| 200-299    | Successful    |
| 300-399    | Redirection   |
| 400-499    | Client error  |
| 500-599    | Server error  |

MEME Content type

+ The message format is described by MIME (Multipurpose Internet Mail-Extension) content type
+ basic syntax: type / sub-type
  + e.g. text / html, text / plain
  + e.g. application / json, application / xml, ...



Client tool

we need a client tool to send HTTP requests to the REST Web Service / API for testing!

+ Plenty of tools: curl, Postman, etc...

## Postman

https://jsonplaceholder.typicode.com/

It provides some api for quick testing postman



# SpringBoot REST 

93-

## Controller 

Much easier to do REST testing using postman than browser



just choose "Spring Web" as dependency, and create a new SpringBoot project

Controller:

+ super simple: create a rest controller with GetMapping

```java
@RestController
@RequestMapping("/test")
public class DemoRestController {
    // add code for the "/hello" endpoint
    @GetMapping("/hello")
    public String sayHello(){
        return "Hello World!";
    }
}
```

Visit http://localhost:8080/test/hello in postman



看至96

## POJO







## Path Variable







## Exception Handling





## Global Exception Handling





## REST API design







# Hands-on:  a demo

113-136



## SpringBoot REST DAO





## Service Layer





## SpringBoot REST CRUD

122





## SpringBoot REST: Spring Data JPA



## SpringBoot REST :Spring Data REST 



