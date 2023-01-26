1-20 tut



接上节课, 注意要启动pgadmin, 并输入密码access existing server



# 查找 0min-

get

+ get没有body, 一般用params



## 将get的结果打印在terminal

接上节课, 在UserController里写入:

```java
@GetMapping("/{userId}")     // 接URL中/api/v1/users
public void getUser(@PathVariable Long userId){
  	userService.getUser(userId);
}
```

在UserService里写入:

```java
public void getUser(Long userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    User user = optionalUser.get();
    System.out.println(user);
}
```



在postman > get request: http://localhost:8080/api/v1/users/2, intellj的console出现:

```bash
User(id=2, email=user1@gmail.com, name=user, password=password888                                                     , createdTime=2023-01-25T12:51:29.322280+11:00, updatedTime=2023-01-25T12:51:29.322345+11:00)
```

说明get成功了



## 把get的结果返回到前台去 14min-



Controller ---dto---> service ----entity----> repository 

Controller <---dto--- service <----entity---- repository 

其中entity class需要@entity annotation, 用来表示是要与数据库交互的, 对成员变量有很多类似SQL DDL的constraint

很多时候, 数据从controller流向repository并不是对称的: 比如用户登陆, 数据从controller流向repository带有用户的密码, 而当我们想get user的某些信息时, 数据从repository流向controller但不能带有用户的密码信息



UserController写入:

```java
@GetMapping("/{userId}")     // 接URL中/api/v1/users
public UserGetDto getUser(@PathVariable Long userId){
    UserGetDto userGetDto = userService.getUser(userId);
    return userGetDto;
}
```



UserService写入:

```java
public UserGetDto getUser(Long userId) {

    Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互

    User user = optionalUser.get();
    System.out.println(user);

    UserGetDto userGetDto = new UserGetDto();
    userGetDto.setId(userId);
    userGetDto.setName(user.getName());
    userGetDto.setEmail(user.getEmail());
    userGetDto.setCreatedTime(user.getCreatedTime());
    userGetDto.setUpdatedTime(user.getUpdatedTime());

    return userGetDto;
}
```



Postman > get request: http://localhost:8080/api/v1/users/2

真的在前台得到结果了, 

```bash
{
    "id": 2,
    "name": "user",
    "email": "user1@gmail.com",
    "createdTime": "2023-01-25T12:51:29.32228+11:00",
    "updatedTime": "2023-01-25T12:51:29.322345+11:00"
}
```



## 处理用户的不合法输入26min- 

精简

上面我们在做信息载体转换的时候(dto <---> entity)写的很繁琐



同时也不是很健壮, 如getUser() 如果输入的userId在数据库中并没有匹配, 就会报错

e.g. postman > get request: http://localhost:8080/api/v1/users/100 (数据库中没有id为100的row)

Postman中返回的:

```bash
{
    "timestamp": "2023-01-26T00:05:44.135+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "path": "/api/v1/users/100"
}
```

返回的错误信息太广了, 应该narrow down一下





在UserService:

使用Optional类来解决数据库中指定id的User不存在的情况: orElseThrow() 抛一个异常

```java
public UserGetDto getUser(Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互

        // User user = optionalUser.get();      // 不够健壮, 如果指定id的user在数据库中不存在呢?

        User user = optionalUser.orElseThrow(() -> new RuntimeException("User: " + userId + " not found"));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        System.out.println(user);

        UserGetDto userGetDto = new UserGetDto();
        userGetDto.setId(userId);
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }
```

但RuntimeException还是太广了, 进一步具体化Exception



自定义Exception

在application的路径下新建package: exception, 并新建一个ResourceNotFoundException class

```java
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(){
        super("Resource not found!");
    }

}
```

并替换掉UserService的getUser()里的RuntimeException

```java
User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException());
```



但是错误信息只在后端显示, 并没有返回给用户

---

把错误信息返回到前台36min-

在exception包下新建如下类

```java
@RestControllerAdvice   // 监视Controller, 如果controller里的方法报了异常的化, 做如下处理
public class ControllerExceptionHandler {

    @ExceptionHandler(value = {ResourceNotFoundException.class})        // 如果controller里报了ResourceNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)           // 让前台返回信息中HttpStatus为404
    public String handleResourceNotFoundException(){
        return "Resource not found";            // 返回该值直接到前台
    }

}
```



这样再跑application, 在postman中如果输入URL指定id的user不存在于数据库的话, 前台也会收到信息: Resource not found, 且http status为404



Q&A 43min-58min

暂停一下解决同学遇到的问题





## 进一步指明错误信息, 并返回给前台 58min-



ResourceNotFoundException中新定义有参构造器

```java
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(){
        super("Resource not found!");
    }

    // 指明哪个resource not found
    public ResourceNotFoundException(String resource){
        super(resource + " not found!");
    }

}

```



UserService:

```java
User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
```



ControllerExceptionHandler 中 handleResourceNotFoundException(e) return e.getMessage

```java
@RestControllerAdvice   // 监视Controller, 如果controller里的方法报了异常的化, 做如下处理
@Slf4j      // enable log
public class ControllerExceptionHandler {


    @ExceptionHandler(value = {ResourceNotFoundException.class})        // 如果controller里报了ResourceNotFoundException, handle it (back-end terminal will not show Exception message)
    @ResponseStatus(HttpStatus.NOT_FOUND)           // 让前台返回信息中HttpStatus为404
    public String handleResourceNotFoundException(ResourceNotFoundException e){
        // log.info(e.getMessage(), e);
        
        return e.getMessage();            // 返回该值直接到前台
    }
}
```



在可能出错的地方throw exception (这个exception应该足够独特, 最好自己自定义一个Exception class, 并添加有参构造器方便指明具体的错误信息对象), 并编写一个ExceptionHanler class在其中处理该独特的exception并将错误信息返回给前台



看至1h14min
