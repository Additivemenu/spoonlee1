1-20 tut



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



## 26min- 

精简
