Assertion断言



以下由信息由chatGPT提供



# 1. What is Assertion in Java?

Assertions in Java are a way to programmatically verify that certain conditions are true during runtime. They allow developers to test assumptions about the code, and provide a way to catch errors and bugs early on.

In Java, assertions are implemented using the `assert` keyword. The basic syntax for an assertion is as follows:

```java
assert condition;
```

Here, `condition` is a boolean expression that should evaluate to `true` if the code is working correctly. If the condition is `false`, the assertion will fail and an `AssertionError` will be thrown.

Assertions can also include an optional message that is printed when the assertion fails:

```java
assert condition : message;
```

Here, `message` is a string that provides additional information about the assertion failure.



Assertions can be useful in testing and debugging code, but it's important to use them appropriately.

+ :bangbang: Assertions should be used to test assumptions about the code that should always be true, rather than to handle errors or unexpected conditions. They should also not be used as a substitute for proper exception handling.



# 2. First Taste of Assertions

```java
public class MyClass {
    public int square(int x) {
        assert x >= 0 : "x must be a non-negative integer";
        return x * x;
    }
}
```

In this example, the `square()` method takes an integer `x` as an argument, and returns the square of `x`. However, before computing the square, the method uses an assertion to check that `x` is non-negative. If `x` is negative, the assertion will fail and an `AssertionError` will be thrown, along with the message `"x must be a non-negative integer"`.



Here's how you could use this method in a test:

```java
public class MyClassTest {
    @Test
    public void testSquare() {
        MyClass obj = new MyClass();
        int result = obj.square(5);
        assertEquals(25, result);
    }
}
```

In this test, we create an instance of `MyClass` and call the `square()` method with the argument `5`. Since `5` is a non-negative integer, the assertion in `square()` will not fail, and the method will return `25`. We then use an assertion from the `JUnit` testing library to verify that the result is equal to `25`.

If we were to call `square()` with a negative argument, such as `-3`, the assertion would fail and an `AssertionError` would be thrown, indicating that `x` must be a non-negative integer. This helps us catch errors early on and ensure that our code is working correctly.



# 3. Common API in assertions

## `assertEquals()` 

Both `assertEquals()` and `assertThat()` are methods provided by the `JUnit` testing library for performing assertions in Java tests.



The `assertEquals()` method is used to compare two values for equality, and is typically used when testing simple values such as integers, strings, and other basic data types. The basic syntax for `assertEquals()` is as follows:

```Java
assertEquals(expected, actual);
```

Here, `expected` is the value that we expect the test result to have, and `actual` is the value that was actually produced by the code under test. If the two values are equal, the test passes. If they are not equal, the test fails and an `AssertionError` is thrown.



## `assertThat()`

`assertThat()` is a method provided by the `JUnit` testing library in Java that allows you to perform more complex and flexible assertions using a fluent API.

The `assertThat()` method takes two arguments:

+ the actual value that you want to test, 
+ and a `Matcher` object that defines the assertion that you want to perform on that value. 
  + Matchers are classes that implement the `Matcher` interface and provide a wide range of assertion methods that can be used to test different aspects of the actual value.



Here's an example of how to use `assertThat()`:

```java
@Test
public void testString() {
    String str = "hello world";
    assertThat(str, is(notNullValue()));
    assertThat(str, equalToIgnoringCase("Hello World"));
    assertThat(str, containsString("hello"));
}
```

In this example, we define a simple test that checks various properties of the `str` string variable. We use the `assertThat()` method to perform the following assertions:

- `assertThat(str, is(notNullValue()))` - Checks that the `str` variable is not null.
- `assertThat(str, equalToIgnoringCase("Hello World"))` - Checks that the `str` variable is equal to the string `"Hello World"` ignoring case.
- `assertThat(str, containsString("hello"))` - Checks that the `str` variable contains the substring `"hello"`.



:bangbang: Note that each `assertThat()` statement reads almost like a sentence, which can make the *te*st <u>code more readable and easier to understand.*</u> Additionally, because **matchers can be chained together** using the fluent API, you can create complex assertions that would be difficult or impossible to express using simple equality checks.



### `Matcher` interface

Here are some of the most commonly used methods in the `Matcher` interface in the `JUnit` testing library:

- `equalTo()` - checks if the value is equal to a given value
- `equalToIgnoringCase()` - checks if the value is equal to a given value, ignoring case
- `greaterThan()` - checks if the value is greater than a given value
- `greaterThanOrEqualTo()` - checks if the value is greater than or equal to a given value
- `lessThan()` - checks if the value is less than a given value
- `lessThanOrEqualTo()` - checks if the value is less than or equal to a given value
- `closeTo()` - checks if the value is close to a given value, within a specified delta
- `hasSize()` - checks if a collection or array has a given number of elements
- `contains()` - checks if a collection or array contains a given element
- `containsString()` - checks if a string contains a given substring
- `startsWith()` - checks if a string starts with a given prefix
- `endsWith()` - checks if a string ends with a given suffix
- `isNull()` - checks if the value is null
- `notNullValue()` - checks if the value is not null
- `instanceOf()` - checks if the value is an instance of a given class
- `not()` - negates the result of another matcher

These methods are just a few examples of the many methods available in the `Matcher` interface. Depending on your testing needs, you may find that you need to use different matchers to test different properties of your code. The `Matcher` interface provides a wide range of options that can help you write expressive and powerful tests in Java.



## `assertEquals()`  VS. `assertThat()`

Both `assertEquals()` and `assertThat()` are methods provided by the `JUnit` testing library for performing assertions in Java tests.

:gem: Here's an example of using both methods to test a simple addition function:

```Java
public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}

public class MathUtilsTest {
    @Test
    public void testAdd() {
        int result = MathUtils.add(2, 3);
        assertEquals(5, result);					// for simple equality checks
        assertThat(result, equalTo(5));		// more readable, more flexible for complex checking logics
    }
}
```

In this example, we define a simple `add()` method in the `MathUtils` class that takes two integers and returns their sum. We then write a test in the `MathUtilsTest` class that calls the `add()` method with the arguments `2` and `3`, and uses both `assertEquals()` and `assertThat()` to verify that the result is equal to `5`. 

The two assertions are functionally equivalent, but the `assertThat()` assertion is written using a fluent API that may be more readable for complex assertions.







# 4. Unit Test

Unit test的核心思想是只检查被测试的unit内部的逻辑是否正确, 应排除掉其他任何外部依赖的影响.



question: can you give me exmaple of unit test for creating User in springboot2 for RESTful api without using @Autowired， and also corresponding createUser() in service?



Sure, here's an example of a unit test for creating a user in a Spring Boot 2 RESTful API without using `@Autowired`, and the corresponding `createUser()` method in the service:

UserController.java:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest) {
        User user = userService.createUser(userRequest.getName(), userRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

UserService.java:

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        return userRepository.save(user);
    }
}
```

UserRequest.java:

```java
public class UserRequest {

    private String name;
    private String email;

    // getters and setters omitted for brevity
}
```

UserTest.java:

```java
@RunWith(MockitoJUnitRunner.class)
public class UserTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userService = new UserService(userRepository);
    }

    @Test
    public void testCreateUser() {
        // 1. Arrange
        UserRequest userRequest = new UserRequest();
        userRequest.setName("John Doe");
        userRequest.setEmail("john.doe@example.com");

        User user = new User();
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");

        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);

        // 2. Act
        User createdUser = userService.createUser(userRequest.getName(), userRequest.getEmail());

        // 3. Assert
        assertThat(createdUser.getName()).isEqualTo(user.getName());
        assertThat(createdUser.getEmail()).isEqualTo(user.getEmail());

        Mockito.verify(userRepository).save(Mockito.any(User.class));
    }
}
```

In this example, we've defined a RESTful API endpoint that handles POST requests to create a new user. The `createUser()` method in the `UserController` class calls the `createUser()` method in the `UserService` class to create a new `User` object and persist it to the database using the `UserRepository` interface.

The `UserTest` class uses Mockito to create a mock of the `UserRepository` interface, and then passes this mock to the `UserService` constructor. The `testCreateUser()` method then calls the `createUser()` method on the `userService` object, passing in a `UserRequest` object that contains the user's name and email.

+ in step3 Assert in `testCreateUser()`:

  + After calling the `createUser()` method, <u>we use the `Mockito.verify()` method to verify that the `userRepository.save()` method was called with a `User` object as an argument.</u> This is a way to ensure that the `User` object was successfully saved to the database as expected.

  + Finally, we use `assertThat()` methods to check that the `User` object returned from the `createUser()` method (这个是指UserGetDto, 不过看需求createUser()这个方法也可以不返回UserGetDto) matches the expected `User` object. This helps to ensure that the `UserService` is correctly creating and returning `User` objects.





# 一个前后端连接CRUD的简单demo

question: can you show me the full code of a demo: using react query for communicating the front end and backend, using springboot to code the backend for CRUD, using react to build the front end to allow user CRUD books 

