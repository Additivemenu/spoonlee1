2023-1-28 tut



# 要点

+ 继续体会设计并实现一个RESTful API的流程: 先写controller, 再写service同时补充需要的dto, mapper, repository
+ UserController里调用PropertyService
+ 对于数组使用stream API来操作
+ Entity, repository里是不是有JDBC的封装? 一些annotation直接允许和数据库互动了
+ 手写mapper的另一种方法: 使用 lombok的@builder (其实和完全手写没太大区别, 只是简化了一丢丢)



# 实现新的RESTful API需求

接上节课, 实现 query: given user id, return all property he owns


RESTful api 设计：

`http://localhost:8080/api/v1/users/{userId}/properties`  表明这是个关于UserController的RESTful api



## 实现方法一

方式一: given userId, 从数据库中查找(该方法由property repo提供)并返回 List\<Property\>, 再将其转化为 List\<PropertyGetDto\>返回



UserController

controller里每个方法对应一个RESTful api, 此时我们的UserController调用PropertyService 

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

这个接口直接封装好了数据库查询过程(封装了JDBC?), 只需写个声明式的函数名和返回的类型即可即可

```java
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByUser_Id(Long userId); // 注意方法名一定是 findByUser_Id(), findBy之后的部分要和数据库里的tuple的column name一致

}
```



run application, Postman > get: http://localhost:8080/api/v1/users/1/properties





## 实现方法二 1h46min

方法二: 在User里定义好 List\<Property\>, 并通过annotation直接在User里就和数据库做好映射关系 (而不是方式一通过repository和数据库建立关系), 当给定userId时直接返回User entity里的这个成员, 再将其转化为List\<PropertyGetDto\> 返回前台

评价: 个人不喜欢这个方式 相对于Property entity里有User作为成员变量来说, 再往User entity里定义一个List<Property>有点重复了



User里定义

```java
@OneToMany(mappedBy = "user")       // 对应Property里User的成员变量名
private List<Property> propertyList;
```



Q&A 20:28-

如果db.migration写错了, 该怎么改



继续20:37-

Spring security 加密user的password

建议P3先别写login的后端, 先写别的





# 继续优化mapper的代码书写1h07min-

上节课我们讲了使用mapstruct工具来快速生成mapper, 也可以自己手动写mapper. 这里我们再提供一种手动写mapper的方式:

用 lombok @Builder



UserGetDto class头上加上

```java
@Builder
```



UserMapper里

```java
   public UserGetDto mapUserToUserGetDto(User user){
        // 方式1: Setter, Getter
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



Entity class得加以下三个annotation才能用builder (用builder得保证你有constructor)

User class头上加上以下annotation

```
@Builder
@AllArgsConstructor
@NoArgsConstructor
```



UserMapper里

```java
public User mapUserPostDtoToUser(UserPostDto userPostDto){

//        // 方式1: Getter Setter
//        User user = new User();
//
//        user.setEmail(userPostDto.getEmail());
//        user.setName(userPostDto.getName());
//        user.setPassword(userPostDto.getPassword());

        // 方式2: @builder
        User user = User.builder()
                .email(userPostDto.getEmail())
                .name(userPostDto.getName())
                .password(userPostDto.getPassword())
                .build();


        return user;
}
```





# Unit test 1h15min-



```
// UserService里的依赖其他类的方法不会测试 -- 如何理解???
// 而是用mock结果替换运行时的那行调用其他类的代码
```

