2023-1-27 tut



接上节课, 还是crud-demo-recode project

重构已经写好的代码, 之后写深一层的CRUD比如联表操作

# 要点

+ 在db.migration中添加新表如何操作
+ 后端service如何联表查询
+ 进一步理解联表中Dto, entity和DB的tuple之间的关系
+ 关于设计并实现一个RESTful API的流程: 先写controller, 再写service同时补充需要的dto, mapper, repository
+ Refactor: service里mapper的使用来模块化Dto <---> entity
  + mapstruct工具对于快速产生mapper方法的使用
    + 注意mapstruct的原理: 匹配输入和返回的对象的相同名称的field, 所以保证mapper两端的class(entity与dto)的字段名称命名时需要匹配 这里很容易因为打错了名字而出现bug




# Refactor: mapper

实现User <---> Dto的模块化



mapper package下新建UserMapper class

注意一定要有@Component 注解, 当你在controller中使用service作为成员变量, 或在service中使用mapper作为成员变量时， 成员变量所属类头上必须有@Component (@Service里包含@Component) (repository头上没写注解是因为它继承的JpaRepository头上已经写了)

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

+ UserGetDto mapUserToUserGetDto(User user)
+ User mapUserPostDtoToUser(UserPostDto userPostDto)



UserService: 封装find User entity in database

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



## SQL DDL

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

:bangbang: 注意想创建新表千万别在V1__create_user_table.sql中加sql DDL,  因为application会自动检查该文件是否被修改, 如果被修改了(包括加空格), run application就跑不动了



:bangbang: 注意entity的类名要和sql创建的表名一样(大小写不区分), 如果不同需要在entity class头上写

```java
@Table(name = "property")
```

同时entity里的成员变量名也要和sql里column name相对应



## entity

+ 注意这里对于FK的处理, 这里不是像SQL那样只存储一个USerID, 而是根据owner_id直接存了一个User entity! 这样也方便后续getProperty()时进行格式转换User-->UserGetDto

在entity包下新建对应刚创建sql table的entity class

(one to many: pk on 'one' side becomes FK on 'many' side)

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



## repository

新建interface:

```java
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
}
```



## Controller 51min-

现在来设计并实现一个个关于Property的RESTful api, 涉及Property的controller, service (又涉及dto, repository, 甚至别的service)



### 增: createProperty() 

PropertyController

```java
@RestController
@RequestMapping("properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProperty(@RequestBody PropertyPostDto propertyPostDto){
        propertyService.createProperty(propertyPostDto);
    }
}
```

及其所需的service, dto, repository

PropertyService

```java
@Service
@RequiredArgsConstructor
public class PropertyService {
    private final UserService userService;
    private final PropertyRepository propertyRepository;

    private final UserMapper userMapper;
    private final PropertyMapper propertyMapper;

    /**
     *
     * @param propertyPostDto
     */
    public void createProperty(PropertyPostDto propertyPostDto) {
        
        // step1: PostDto from controller ---> entity
      	Property property = new Property();
        property.setType(propertyPostDto.getType());
        property.setLandSize(propertyPostDto.getLandSize());
        // FK
        User user = userService.findUser(propertyPostDto.getUserId());
        property.setUser(user);

        // step2: save property entity into database
        propertyRepository.save(property);
    }
  
}
```



PropertyPostDto

:bangbang: 这里就没有把FK: userId转化为UserPostDto

```java
@Getter
@Setter
public class PropertyPostDto {
    private String type;
    private Integer landSize;
    private Long userId;

}
```



PropertyRepository

```java
public interface PropertyRepository extends JpaRepository<Property, Long> {

}


```





run application, then Postman > Post request: http://localhost:8080/api/v1/properties

body:

```jsn
{
    "type": "TOWNHOUSE",
    "landSize": "288",
    "userId": "1"
}
```

打开pgadmin, 可以查看到create property成功





### 查: getProperty() 1h04min-

front end ---`Param` ---> controller ---> service ----`entity` ---> database

front end  <--- controller <--`GetDto`--- service  <----`entity`---- database

在entity部分, Property的FK指向User, 所以Property entity 有 User entity作为成员变量 而不是像SQL table单纯地只存储User的id

+ 对应地, PropertyGetDto中应有UserGetDto作为成员变量



Property Controller

```java
@GetMapping("/{propertyId}")     // 接URL中/api/v1/users
public PropertyGetDto getProperty(@PathVariable Long propertyId){
  	return propertyService.getProperty(propertyId);
}
```



PropertyService

```java
public PropertyGetDto getProperty(Long propertyId){

        // step1:  query database and find property entity given propertyId
        Property property = propertyRepository.findById(propertyId)
          																		.orElseThrow(() -> new ResourceNotFoundException("Property " + propertyId));

        // step2: property entity ----> propertyGetDto 
        PropertyGetDto propertyGetDto = new PropertyGetDto();
  
        propertyGetDto.setId(property.getId());
        propertyGetDto.setType(property.getType());
        propertyGetDto.setLandSize(property.getLandSize());
        propertyGetDto.setCreateTime(property.getCreatedTime());
        propertyGetDto.setUpdateTime(property.getUpdatedTime());
        // !! 注意我们如何处理和FK相关的成员变量 !!
        propertyGetDto.setUserGetDto(userMapper.mapUserToUserGetDto(property.getUser()));

        // step3: return propertyGetDto
        return propertyGetDto;

    }



```



PropertyGetDto

注意里面的FK如何处理的

```java
@Getter
@Setter
public class PropertyGetDto {
    private Long id;

    private String type;
    private Integer landSize;

    // !! don't get User, not safe! (User has password) !!
    private UserGetDto userGetDto;
  
    @CreationTimestamp
    private OffsetDateTime createdTime;
    @UpdateTimestamp
    private OffsetDateTime updatedTime;
}
```



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

 



### 剩余的方法 1h21min-

模仿UserController里把

updateProperty(), 

deleteProperty(), 

getPropertyByUserId()写一下



Q & A 1h23min-

为什么需要mapper



# mapstruct 1h29min-

其实有能快速产生mapper的工具: mapstruct (不过只是作为更方便的辅助工具, 你也完全可以自己写mapper)



在build.gradle下加入如下dependency:

```gradle
implementation 'org.mapstruct:mapstruct:1.5.2.Final'

annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.2.Final'
```



 1h35min-

在mapper包下新建 UserInfoMapper interface来替换原来的UserMapper class所起到的功能

+ 注意mapstruct的原理是通过对抽象方法的input, output类型进行解析, 方法名是啥不重要

+ 但是repository里findyByEmail就是对变量名的解析, 方法名必须得写对了

```java
@Mapper(componentModel = "spring")  // 自动去匹配输入和返回的对象的相同名称的field, 方法名不重要
public interface UserInfoMapper {
    UserGetDto mapUserToUserGetDto(User user);

    User mapUserPostDtoToUser(UserPostDto userPostDto);
}
```



mapstruct原理 1h42min-1h55min

+ source和target同名字段
+ source和target同类型但不同名字段
+ source和target不同类型的字段 e.g. Property entity{ User }  ----> PropertyGetDto{ UserGetDto }

在mapper包下新建: 

```java
@Mapper(componentModel = "spring", uses = {UserInfoMapper.class})       // 指明利用UserInfoMapper中的 User <--> UserGetDto方法
public interface PropertyMapper {

  // Property entity{ User }  ----> PropertyGetDto{ UserGetDto }
  @Mapping(source = "user", target="userGetDto")
  PropertyGetDto mapPropertyToPropertyGetDto(Property property);  // 自动去匹配输入和返回的对象的相同名称的field, 方法名不重要

}
```



这样在PropertyService里就可以只写1行代码了

```java
public PropertyGetDto getProperty(Long propertyId){

        // step1:  look up database to find property entity given propertyId
        Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property " + propertyId));

//        // step2: property entity ----> propertyGetDto for safety
//        PropertyGetDto propertyGetDto = new PropertyGetDto();
//        propertyGetDto.setId(property.getId());
//        propertyGetDto.setType(property.getType());
//        propertyGetDto.setLandSize(property.getLandSize());
//        propertyGetDto.setCreateTime(property.getCreatedTime());
//        propertyGetDto.setUpdateTime(property.getUpdatedTime());
//        // ! 注意我们如何处理和FK相关的成员变量 !
//        propertyGetDto.setUserGetDto(userMapper.mapUserToUserGetDto(property.getUser()));
//
//        // step3: return propertyGetDto
//        return propertyGetDto;


        // 一行顶上面step2 & step3
        return propertyMapper.mapPropertyToPropertyGetDto(property);
    }
```







# Unit Test 1h22min-



## 老师的例子

对应代码放在desktop > JR_materials > fullStack > Steven_prior_SpringSecurity

被测试类

```java
package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPatchDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.Property;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.mapper.PropertyMapper;
import com.example.cruddemorecode.mapper.UserInfoMapper;
import com.example.cruddemorecode.mapper.UserMapper;
import com.example.cruddemorecode.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author xueshuo
 * @create 2023-01-25 12:29 pm
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    // private final UserMapper userMapper;         // 自己写的UserMapper
    private final UserInfoMapper userMapper;        // 通过@Mapper自动创建的

    private final PropertyMapper propertyMapper;

    // 增
    public void createUser(UserPostDto userPostDto){
        // System.out.println(userPostDto);

        User user = userMapper.mapUserPostDtoToUser(userPostDto);

        // 将user存进table
        userRepository.save(user);      // argument必须是entity, not dto
    }


    // 查
    public UserGetDto getUser(Long userId) {

        // User user = findUser(userId);  // 最开始的写法

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User " + userId));

        // System.out.println(user);

        return userMapper.mapUserToUserGetDto(user);
    }


    // 删
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


    // 改
    public UserGetDto updateUser(UserPatchDto userPatchDto, Long userId) {
        // step1
        User user = findUser(userId);

        // step2
        user.setName(userPatchDto.getName());

        // step3
        userRepository.save(user);

        // step4: 将update过后的user entity转化为UserGetDto返回给前台
        return userMapper.mapUserToUserGetDto(user);
    }

    public UserGetDto getUserByEmail(String email) {
        // step1
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User " + email));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        // step2: entity --> dto, then return to front end
        return userMapper.mapUserToUserGetDto(user);
    }



    // helper function: try to find user in database
    // not private because other table might also want to find user when joining tables
    public User findUser(Long userId){
//        Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互
//        User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
//        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.
//        return user;

        // 三行写作一行
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User " + userId));
    }

    public List<PropertyGetDto> getPropertiesByUserId(Long userId) {
        User user = findUser(userId);
        List<Property> propertyList = user.getPropertyList();

        return propertyList.stream()
                .map(property -> propertyMapper.mapPropertyToPropertyGetDto(property))
                .toList();
    }
}

```





对应测试类

```java
package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.mapper.PropertyMapper;
import com.example.cruddemorecode.mapper.UserInfoMapper;
import com.example.cruddemorecode.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.time.OffsetDateTime;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * @author xueshuo
 * @create 2023-01-28 8:53 pm
 */

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    // UserService里的依赖其他类的方法不会测试 -- 如何理解???
    // 而是用mock结果替换运行时的那行调用其他类的代码

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserInfoMapper userMapper;        // 通过@Mapper自动创建的
    @Mock
    private  PropertyMapper propertyMapper;

    @InjectMocks
    private UserService userService;        // what we want to test


    // generate some mock results
    private final UserPostDto userPostDto = UserPostDto.builder()
            .email("s1@gmail.com")
            .name("s")
            .password("password")
            .build();

    private final User user =User.builder()
            .email("s1@gmail.com")
            .name("s")
            .password("password")
            .build();

    private final UserGetDto mockUserGetDto = UserGetDto.builder()
            .email("s@gmail.com")
            .name("s")
            .updatedTime(OffsetDateTime.now())
            .createdTime(OffsetDateTime.now())
            .build();

    // test methods ------------------------------------
    // 原则上讲, 所有的public method都要写对应的test
    // 注意 测试方法名要有可读性

    // 测试一般分为3步：
    // 1. 声明哪些外部依赖项应该被mock data取代
    // 2. 调用被测试方法
    // 3. 验证测试结果
    //      + 如何被测方法没有返回值, 用verify()
    //      + 如果被测方法有返回值, 用assertEquals()


    @Test
    void shouldSaveNewUserInUserRepoWhenCreateUser(){
        // 被测试方法createUser()中的外部依赖: userMapper, userRepository

        // 1. 声明哪些依赖项应该被替换掉
        when(userMapper.mapUserPostDtoToUser(userPostDto)).thenReturn(user);    // user here is mocked

        // 2. 调用被测试方法
        userService.createUser(userPostDto);    // userPostDto here is mocked

        // 3. 验证结果
        verify(userRepository).save(user);      // 方法没有返回值, 用verify
    }


    @Test
    void shouldGetUserDtoWhenGetUser() {
        // 被测试方法中的外部依赖: userRepository, userMapper
        // 一共就两步, 第一步依赖userRepository, 第二部依赖userMapper, 我们这里测试把这两步全用mock data
        // 来替换了. 看起来不是很make sense. 在实际开发中, 往往一个方法会很复杂, 不止只有外部依赖的步骤, 而unit
        // test的核心思想就是去测试哪些没有外部依赖的步骤的逻辑是否正确

        Long userId = 1L;
        // 1. 声明哪些依赖项应该被替换掉
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));        // user is mocked
        when(userMapper.mapUserToUserGetDto(user)).thenReturn(mockUserGetDto);

        // 2. 调用被测试方法
        UserGetDto userGetDto = userService.getUser(userId);

        // 3. 验证结果
        assertEquals(userGetDto, mockUserGetDto);
    }

    @Test
    void shouldDeleteUser(){
        Long userId = 1L;

        // 2. 调用被测试方法
        userService.deleteUser(userId);

        // 3. 验证结果
        verify(userRepository).deleteById(userId);

    }

}

```



1h41min- 打断点debug 查看具体执行流程

Q & A 1h50min- 





## chatGPT给的例子

can you give me exmaple of unit test for creating User in springboot2 without using @Autowired， and also corresponding createUser() and UserRepository?

```java
public class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository = mock(UserRepository.class);
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    public void testCreateUser() {
        // Create a new user
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");
        user.setPassword("password");

        // 1. Configure the mock repository to return the saved user
        when(userRepository.save(user)).thenReturn(user);

        // 2. Call the service method to create the user
        User savedUser = userService.createUser(user);

        // 3. Verify that the user was saved
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getName()).isEqualTo(user.getName());
        assertThat(savedUser.getEmail()).isEqualTo(user.getEmail());
        assertThat(savedUser.getPassword()).isEqualTo(user.getPassword());

        verify(userRepository).save(user);	// 
    }
}

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
	
  	// dependency injection: using constructor
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}

public interface UserRepository extends JpaRepository<User, Long> {

}

```

we are using the `verify` method to check that the `save` method on the `UserRepository` was called exactly once with the expected `User` object. This helps ensure that the `createUser` method is working correctly and interacting with the `UserRepository` as expected.





# Unit Test: website 1-28 part1 video

steven又用简单的语言再次讲了下上面的内容



此时的代码:

user ---> userGetDto 手写, UserService中只有userRepository 1个依赖



写测试的目的: 测试代码逻辑是否正确

```java
// 对 getUser() 方法进行测试
  
public UserGetDto getUser(Long userId) {
  User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User "+ userId))
  
  // entity ---> GetDto
  UserGetDto userGetDto = new UserGetDto();
  userGetDto.setId(userId);
  userGetDto.setName(user.getName());
  userGetDto.setEmail(user.getEmail());
  userGetDto.setCreatedTime(user.getCreatedTime());
  userGetDto.setUpdatedTime(user.getUpdatedTime());

  return userGetDto;
}
```

Scenario: 我们的getUser()的逻辑写的没错, 但是如果docker没起来导致报错,这就会让我们误认为是自己的代码写的有问题，

:star: **unit test的核心目的是: 为了测试getUser()的逻辑有错没有(如果unit test失败， 则只会因为是unit内部的逻辑出错了), 应该排除掉其他因素(隔绝unit之外的环境)的干扰. 上面的例子中， 我们应该排除掉其他依赖(e.g. userRepository)对unit内部的影响**



test module下:

UserServiceTest.java

```java
@ExtendWith(MockitoExtension.class)
public class UserServiceTest{
  @Mock
  private UserRepository userRepository;
  
  @InjectMocks
  private UserService userService;
  
  // 造的假数据
  private final User user = User.builder()
    .id(1L)
    .email("s@gmail.com")
    .name("s")
    .password("password")
    .build();
  
  @Test
  void shouldGetUserDtoWhenGetUser(){
    Long userId = 1L;
    
    // 以下: 不希望真的去查数据库, 而是when running userRepository.findById(userId)时, 不去真的执行它, 而是
    // return Optional.of(user). 这样我们就不必真的去使用被测试方法中的unit之外的东西，而是以假数据代之
    // 此时我们不需要去启动数据库也能测试userService.getUser(userId)方法啦!
    when(userRepository.findById(userId)).thenReturn(Optional.of(user))
    
    // 调用被测试方法:
    UserGetDto userGetDto = userService.getUser(userId);
    
    assertEquals(userGetDto.getId(), 1L);
    assertEquals(userGetDto.getName(), "s");
    assertEquals(userGetDto.getEmail, "s@gmail.com");
  }
  
  
}
```

回过头来看, 其实userService.getUser(userId)做的只是把其内部的依赖 -- userRepository查到的user转化数据格式为userGetDto, 查找数据库的操作其实是userRepository做的

另外， 如果要测试 UserRepository, 其实它很难是unit test了, 而是integration test

