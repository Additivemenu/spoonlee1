3-3 Steven tutorial

# 1. Backend code review

response的返回信息是Json格式

controller中deleteUser这个api返回类型为void, @ResponseStatus正确就可以

## 关于业务中的''权限'' 14min- 

权限一般不会通过接口来做(不放在AuthorityController里), 一般放在JWT中. 前端可以直接读取到user的authority, 通过这个信息来做判断呈现不同的ui



## 关于`@Transactional` 16min -

`@Transactional` 这个注解一般我们不会用的, 这个注解一般在多表的读写才会用 (e.g. 想同时改A表和B表， 且修改A, B表要么同时成功， 要么同时失败)



## 关于`@Autowired`与循环依赖 28min-

`@Autowired` 能不用就不要用, 它没法检测循环依赖,  运行时在生产环境下可能会出错. 用`@RequiredArgsConstructor` + `private final`来做依赖注入

:star: 关于循环依赖的说明 32min-  : Bean产生的先后顺序 

```java
@RequriedArgsConstructor
class A{	// 想生成A, 得先生成它所依赖的beans: B
   
  private final B;
  
}

@RequiredArgsConstructor
class B {	// 想生成B, 得先生成它所依赖的beans: A
  private final A;
  
}
```

注意避免循环依赖, 如果产生了循环依赖，把一个依赖项移除来打破循环依赖



### :moon: 回头 1h39min- 

`private final` + `@RequiredArgsConstructor` 注入依赖

`@Bean` 也不能随便用, 加上之后会被spring IoC容器管理, 有的地方不需要写`@Bean`注解

`@Component`是放在class头上, `@Bean`是放在method头上, 二者本质是一类注解， 会将class变成instance或者将method的返回值 保存在spring container里, 如果别的地方用到就注入进去

说白了想创建一个class的ntstance, 而这个instance没法通过`@component`生成 (e.g. 要调用框架中的类, 生成intance, 你又不能在人家源码中在class头上加个`@component`)， 就用`@Bean`来生成intance. `@Bean`要起作用, 需要在它锁修饰饿方法所在的类的头上加上`@Configuration`





## 继续review code 42min-



## 52min- 

article 分页, 不需要把page全部返回前端

和前端协商 选好返回的page中的内容



## 关于鉴权 55min- 1h39min 

Q & A

登录成功后只是确认你是合法用户, 但是如何确认你是哪个用户?

:star: ---> 通过JWT, 比如id为1的author来post article, post上去的article里的userid也必须是1

问题是 post body里articlePostDto里对应的author id 不一定保真 (e.g. 前端可以随便author id)

我们可以在filter chain里来检查post上去的article里的author id是否保真



>  在进入controller之前的filter chain那里就把鉴权, 验证相关的阔肌都做好， 这样controller里只需要考虑业务逻辑
>
> 所以一般进入公司只要不是新项目, 你不需要去考虑鉴权验证的逻辑, 只要考虑业务逻辑就好了
>
> :star: 核心思想是鉴权验证逻辑和业务逻辑分离, 只有鉴权通过的数据才能进入controller
>
> 面试的话， 鉴权 security相关的其实问的也少. 大部分人还是只要关注业务逻辑就可以 (Steven现在对自己公司的鉴权逻辑也不知道， 也没必要知道)



展示JWT 的代码如何做鉴权 1h



关于RESTfyk API URL的设计, 

e.g.以下的设计一来更make snese, 二来方便做鉴权

```java
@RequestMapping("users/{userId}/articles/{articleId}/comments")
public class CommentController{}

@RequestMapping("users/{userId}/articles/{articleId}")	// 表示私人查看自己的article
public class ArticleController{}
```

不过也看业务需求, 如果说Article是所有合法用户都可以看, ArticleController

```java
@RequestMapping("articles/{articleId}")
public class ArticleController{}
```

也可以两种都有, 一种articleController用来表示公开的, 一种articleController表示查看私人的article



# 2. Frontend code review 

