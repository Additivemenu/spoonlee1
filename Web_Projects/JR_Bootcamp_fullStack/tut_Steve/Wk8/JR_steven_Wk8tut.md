1-27 tut



接上节课, 还是crud-demo-recode project

重构已经写好的代码, 之后写深一层的CRUD比如连表操作



# Refactor

User ---> UserGetDto function



mapper package下新建UserMapper class

注意一定要有@Component 注解, 当你在controller中使用service作为成员变量, 在service中使用mapper作为成员变量时， 成员变量所属类头上必须有@Component (@Service里包含@Component) (repository头上没写注解是因为它继承的JpaRepository头上已经写了)

```java
@Component
public class UserMapper {
    public UserGetDto mapUserToUserGetDto(User user){

        UserGetDto userGetDto = new UserGetDto();

        userGetDto.setId(user.getId());
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }

    public User mapUserPostDtoToUser(UserPostDto userPostDto){

        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setName(userPostDto.getName());
        user.setPassword(userPostDto.getPassword());

        return user;
    }

}
```







利用UserMapper封装dto转化的方法, 提升代码复用率

+ mapUserToUserGetDto(User user)
+ mapUserPostDtoToUser(UserPostDto userPostDto)



封装find Usder entity in database

```java
Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互
User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
// T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

```

写成如下函数

```java
private User findUser(Long userId){

  return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User " + userId));
}

```



上节课有个东西讲错了 22min-

getUserByEmail()

```java
@GetMapping
public UserGetDto getUserByEmail(@Param(value = "email") String email)		// 注解写错了
```

```java
@GetMapping
public UserGetDto getUserByEmail(@RequestParam String email)		// 应该是这个 @RequestParam
```

如果你不写 @RequestParam， 且在Postman中测试的URL没有提供email, getUserByEmail()会执行方法体; 写上@RequestParam当URL没有提供email, 就会被拦截不会执行getUserByEmail()的方法体, 节省服务器资源; 所以写上肯定是good practice



同学 Q & A 25min-31min



# 加表 Property 31min-



加表并联表查询



在db.migration里新建文件: V2__create_property_table.sql

```sql
CREATE TABLE "user" (
                        "id" BIGSERIAL PRIMARY KEY,
                        "email" VARCHAR(255) UNIQUE NOT NULL,
                        "name" VARCHAR(255) NOT NULL,
                        "password" CHAR(64) NOT NULL,
                        "created_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                        "updated_time" TIMESTAMP WITH TIME ZONE NOT NULL
);
```



注意想创建新表千万别在V1__create_user_table.sql中加sql DDL,  因为application会自动检查该文件是否被修改, 如果被修改了(包括加空格), run application就跑不动了



注意entity的类名要和sql创建的表名一样(大小写不区分), 如果不同在entity class头上写

```java
@Table(name = "property")
```

entity里的成员变量名也要和sql里column name相对应





在entity 包下新建:

注意对于FK的处理, 这里不是像SQL那样只存储一个USerID, 而是根据owner_id直接存了一个User entity! 这样也方便后续getProperty()时进行格式转换User-->UserGetDto

```java
@Entity   // 证明这是个Entity, 是要与数据库作用的
@Getter
@Setter
public class Property {

    @Id     // 指定修饰的属性为primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 指定主键自动生成模式： 自增长
    private Long id;

    private String type;

    private Integer landSize;

    // FK: property : user --> many to one
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User user;
    
    @CreationTimestamp      // 指定自动管理
    private OffsetDateTime createdTime;

    @UpdateTimestamp        // 指定自动管理
    private OffsetDateTime updatedTime;


}
```



repository包下:

```java
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
}
```



Controller 51min-

## createProperty() 

及其所需的service, dto, repository





run application ,then Postman > Post request: http://localhost:8080/api/v1/properties

body:

```jsn
{
    "type": "TOWNHOUSE",
    "landSize": "288",
    "userId": "1"
}
```

打开pgadmin, 可以查看到create property成功



## getProperty() 1h04min-

Param ---> controller ---> service ----> repo ---> database

Controller  <--GetDto--- Service  <--entity- database

在entity部分, Property的FK指向User, 所以Property entity 有 User entity作为成员变量 而不是像SQL table单纯地只存储User的id

注意在做格式转化时, PropertyGetDto中对于Property entity的成员变量User的处理



PropertyGetDto class

注意里面的FK如何处理的



PropertyService



PropertyContoller







Run application, then Postman > get request: http://localhost:8080/api/v1/properties/1

前台返回:

```java
{
    "id": 1,
    "type": "TOWNHOUSE",
    "landSize": 288,
    "userGetDto": {
        "id": 1,
        "name": "user",
        "email": "user@gmail.com",
        "createdTime": "2023-01-25T12:50:12.080028+11:00",
        "updatedTime": "2023-01-25T12:50:12.080448+11:00"
    },
    "createTime": "2023-01-28T11:09:25.749902+11:00",
    "updateTime": "2023-01-28T11:09:25.749925+11:00"
}
```

 





## 剩余的方法 1h21min-

模仿UserController里把

updateProperty(), 

deleteProperty(), 

getPropertyByUserId()写一下





Q & A 1h23min-

接着看这个