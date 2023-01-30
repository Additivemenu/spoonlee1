1-28 tut



# 要点

+ 继续体会设计并实现一个RESTful API的流程: 先写controller, 再写service同时补充需要的dto, mapper, repository
+ UserController里调用PropertyService
+ 对于数组使用stream API来操作





# 实现新的RESTful API需求

接上节课, 实现 query: given user id, return all property he owns



RESTful api 设计：

`http://localhost:8080/api/v1/users/{userId}/properties`  表明这是个关于UserController的RESTful api



## 实现方法一

方式一: given userId, 从数据库中查找并返回property list, 再将其转化为propertyGetDto list返回

UserController

controller里每个方法对应一个RESTful api

```java
// http://localhost:8080/api/v1/users/{userId}/properties
@GetMapping("/{userId}/properties")
public List<PropertyGetDto> getPropertiesByUserId(@PathVariable Long userId){

  return  propertyService.getPropertyByUserId(userId);
}
```



PropertyService

```java
public List<PropertyGetDto> getPropertyByUserId(Long userId) {
  	// get property list from database given userId 
    List<Property> propertyList = propertyRepository.findByUser_Id(userId);		// TODO:  

    // property list---> propertyGetDto list
    return propertyList.stream()
      .map(property -> propertyMapper.mapPropertyToPropertyGetDto(property))
      .toList();
}
```



在PropertyRepositoy里直接写

这个接口直接封装好了数据库查询过程(封装了JDBC?), 只需写个声明式的函数名即可

```java
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByUser_Id(Long userId); // 注意方法名一定是 findByUser_Id(), findBy之后的部分要和数据库里的tuple的column name一致

}
```



run application, Postman > get: http://localhost:8080/api/v1/users/1/properties





## 实现方法二 20:17-

接着这个看



User里定义

```java
@OneToMany(mappedBy = "user")       // 对应Property里User的成员变量名
private List<Property> propertyList;
```





Q&A 20:28-

如果db.migration写错了, 该怎么改





20:37-继续

Spring security 加密user的password

建议P3先别写login的后端



## 20:43 - 继续优化代码

用@Builder

UserGetDto class头上加上@builder



UserMapper里

```java
   public UserGetDto mapUserToUserGetDto(User user){
        // 方式1
//        UserGetDto userGetDto = new UserGetDto();
//
//        userGetDto.setId(user.getId());
//        userGetDto.setName(user.getName());
//        userGetDto.setEmail(user.getEmail());
//        userGetDto.setCreatedTime(user.getCreatedTime());
//        userGetDto.setUpdatedTime(user.getUpdatedTime());
        
        // 方式2: 通过builder来写
        UserGetDto userGetDto = UserGetDto.builder()
                .createdTime(user.getCreatedTime())
                .id(user.getId())
                .email(user.getEmail())
                .updatedTime(user.getUpdatedTime())
                .name(user.getName())
                .build();
        
        return userGetDto;
    }
```



Entity class得加

```
@Builder
@AllArgsConstructor
@NoArgsConstructor
```





# unit test 20:52-21:36



```
// UserService里的依赖其他类的方法不会测试 -- 如何理解???
// 而是用mock结果替换运行时的那行调用其他类的代码
```

