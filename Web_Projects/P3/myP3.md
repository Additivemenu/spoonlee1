# Sprint1 

## API doc

### User

```java
```







### Comments

#### comment entity	

FK需要为entity

(PK on 'one' side becomes FK on 'many' side)

```java
Public class ReviewComment{
    commentId
		
    //parentId 	// 先不管这个
      
    text

    @ManyToOne
    User{}

    @ManyToOne
    Review{}

    isDeleted

}


Public class NewsComment{
    commentId

    //parentId	// 先不管这个 

    text

    @ManyToOne
    User{}

    @ManyToOne
    News{}

    isDeleted
}


```



#### CommentPostDto

此时FK不需要变成Dto, Springboot直接将我们的输入body转化为PostDto

```java
Public class ReviewCommentPostDto{
    
    //parentId 	// 先不管这个
      
    text

		userId

		reviewId
     
}

Public class NewsCommentPostDto{
    //parentId	// 先不管这个 

    text

		userId

		newsId
}
```









#### CommentGetDto

注意此时FK应该转化为对应的dto

```java
public class ReviewCommentGetDto{
    commentId
		
    //parentId 	// 先不管这个
      
    text

    @ManyToOne
    UserGetDto{}

    @ManyToOne
    ReviewGetDto{}

    isDeleted		// 返回给前台吗?
}

public class NewsCommentGetDto{
    commentId
		
    //parentId 	// 先不管这个
      
    text

    @ManyToOne
    UserGetDto{}

    @ManyToOne
    NewsGetDto{}

    isDeleted		//返回给前台吗?
}
```



CommentGetDto的依赖:

```java
public class UserGetDto{
  	userId
  
    name
      
    profile_img_url
      
    created_time
      
    updated_time
}

public class ReviewGetDto{
  	reviewId
      
    GameGetDto{}
  	
  	UserGetDto{}		// author
  
  	title
      
    text
      
    createdTime
      
    updatedTime
}

public class NewsGetDto{
  	newsId
      
   	UserGetDto{}
  
  	title
      
    text
      
    createdTime
      
    updatedTime
  
}
```



上面又依赖: 不写那么细节了

```java
public class GameGetDto{
  
}
```







