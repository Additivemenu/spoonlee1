1-28 tut



19:36-

# Query: given user id, return all property he owns



RESTful api 设计：

http://localhost:8080/api/v1/users/{userId}/properties



controller里每个方法对应一个RESTful api

```java
// http://localhost:8080/api/v1/users/{userId}/properties
@GetMapping("/{userId}/properties")
public List<PropertyGetDto> getPropertiesByUserId(@PathVariable Long userId){

  return  propertyService.getPropertyByUserId(userId);
}
```



还是在PropertyRepositoy里直接写



```java
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByUser_Id(Long userId);

}
```





run application, Postman > get: http://localhost:8080/api/v1/users/1/properties





另一种实现方式20:17-

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



20:43 - 继续优化代码

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

