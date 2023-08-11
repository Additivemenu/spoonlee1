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





## :moon: POJO

Data binding is the process of converting JSON data to a Java POJO

```
JSON <===Data Binding===> Java POJO
```

Aka. Mapping; Serialization / Deserialization; Marshalling / Unmarshalling



Spring uses the *Jackson* Project behind the scenes 

+ Spring Boot Starter Web automatically includes dependency for Jackson

+ Jackson handles data binding between JSON and Java POJO
  + Jackson calls appropriate setter method when converting JSON to POJO
  + Jackson calls appropriate getter method when converting POJO to JSON

:bangbang: When building Spring REST applications, Spring will automatically handle Jackson Integration behind the scenes

+ JSON data being passed to REST controller is automatically converted to POJO
+ Java object being return from REST controller is automatically converted to JSON



---

continuing demo

```url
/api/students
```

API: return a list of students



entity

```java
public class Student {
    private String firstName;
    private String lastName;

    public Student() {
    }

    public Student(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
  
		// getters & setters
}
```

controller

```java
@RestController
@RequestMapping("/api")
public class StudentRestController {

    // define endpoint for "/students" - return a list of students
    @GetMapping("/students")
    public List<Student> getStudent(){
        List<Student> theStudents = new ArrayList<>();

        theStudents.add(new Student("Poornima", "Patel"));
        theStudents.add(new Student("Mario", "Rossi"));
        theStudents.add(new Student("Mary", "Smith"));

        return theStudents;
    }
}
```

After running, check out  http://localhost:8080/api/students at postman. The results return by controller  indeed becomes JSON automatically





## REST Path Variable @PathVariable

100-

```url
/api/students/{studentId} 
```

对应get student by Id

+ 其中{studentId} is the path variable



controller

```java
@RestController
@RequestMapping("/api")
public class StudentRestController {

    // define a field; Load the field with data; do it only once
    private List<Student> theStudents;

    // define @PostConstruct to load the student data ... only once!
    @PostConstruct
    public void loadData(){
        theStudents = new ArrayList<>();
        theStudents.add(new Student("Poornima", "Patel"));
        theStudents.add(new Student("Mario", "Rossi"));
        theStudents.add(new Student("Mary", "Smith"));
    }

    // define endpoint for "/students" - return a list of students
    @GetMapping("/students")
    public List<Student> getStudent(){

        return theStudents;
    }

    // define endpoint for "students/{studentId}" - return student at index
    @GetMapping("students/{studentId}")
    public Student getStudent(@PathVariable int studentId){     // by default variable name should match
        // just index into the list ... keep it simple for now

        return theStudents.get(studentId);
    }


}
```

After running, visit http://localhost:8080/api/students/1 

+ yes, we could input invalid path variable, we will handle that in exception handlings!







## :moon: REST Exception Handling @ExceptionHandler

103-110

We want to handle the exception and return error as JSON.

+ Step1: Define custom error response class
  + this class's instance will be sent back to client as JSON

+ Step2: Create a custom exception class 
+ Step3: Update REST service to throw exception if student not found
+ Step4: Add an exception handler using @ExceptionHandler





customize exception 

```java
public class StudentNotFoundException extends RuntimeException{
    public StudentNotFoundException(String message) {
        super(message);
    }

    public StudentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public StudentNotFoundException(Throwable cause) {
        super(cause);
    }
}
```



exception response

```java
public class StudentErrorResponse {
    private int status;
    private String message;
    private long timeStamp;

    public StudentErrorResponse() {
    }

    public StudentErrorResponse(int status, String message, long timeStamp) {
        this.status = status;
        this.message = message;
        this.timeStamp = timeStamp;
    }

	 // getters & setters
}
```

controller

+ 在@GetMapping的method中throw exception
+ 同时也要有`@ExceptionHandler` 来处理对应的exception
  + Specific exception
  + General exception

```java
@RestController
@RequestMapping("/api")
public class StudentRestController {

    // define a field; Load the field with data; do it only once
    private List<Student> theStudents;

    // define @PostConstruct to load the student data ... only once!
    @PostConstruct
    public void loadData(){
        theStudents = new ArrayList<>();
        theStudents.add(new Student("Poornima", "Patel"));
        theStudents.add(new Student("Mario", "Rossi"));
        theStudents.add(new Student("Mary", "Smith"));
    }

    // define endpoint for "/students" - return a list of students
    @GetMapping("/students")
    public List<Student> getStudent(){
        return theStudents;
    }

    // define endpoint for "students/{studentId}" - return student at index
    @GetMapping("students/{studentId}")
    public Student getStudent(@PathVariable int studentId){     // by default variable name should match

        // check the studentId again list size
        if ((studentId >= theStudents.size() || (studentId < 0))){
            throw new StudentNotFoundException("Student id not found -" + studentId);       // throws exception, but also need handler
        }

        return theStudents.get(studentId);
    }

    // Add an exception handler using @ExceptionHandler
    // Spring will automatically put the exception thrown that matching with the argument of this method
    @ExceptionHandler
    public ResponseEntity<StudentErrorResponse> handleException(StudentNotFoundException exc){

        // create a studentErrorResponse
        StudentErrorResponse error = new StudentErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        // return a ResponseEntity
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);       // jackson will automatically convert this to JSON
    }

    // add another exception handler ... to catch any exception (catch all)
    @ExceptionHandler
    public ResponseEntity<StudentErrorResponse> handleException(Exception exc){

        // create a studentErrorResponse
        StudentErrorResponse error = new StudentErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        // return a ResponseEntity
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
```

after running, visit http://localhost:8080/api/students/adad or http://localhost:8080/api/students/1000 to chekc exception handling





### Global Exception Handling

109-



## REST API design

111-112





# Hands-on:  a demo

113-136



## SpringBoot REST DAO





## Service Layer





## SpringBoot REST CRUD

122





## SpringBoot REST: Spring Data JPA



## SpringBoot REST :Spring Data REST 



