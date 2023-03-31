主要是JR18期 Java wk6-wk9 Steven tut的内容



| Class | content |
| ----- | ------- |
| [1](./SpringBoot1.md) | docker, Postgres, 用SpringBoot写个Post API 的基本流程 |
| [2](./SpringBoot2.md) | Exception Handling, 用SpringBoot实现CRUD中的RUD |
| [3](./SpringBoot3.md) | 利用flyway创建新的table, JPA实现连表查询service,  格式转化: mapper, mapStruct,    Unit test |
| [4](./SpringBoot4.md) | :star: Entity之间的联动, 连表查询,  `@builder |
| [5](./SpringBoot5.md) | 分页, spring security introduction |
| [6](./SpringBoot6.md) | spring security |
| [7](./SpringBoot7.md) | Backend code review |
|  |  |



代码见crud-demo-recode



+ 关于JPA: 根据自定义继承Repository接口的接口中的方法名来自动生成SQL查询数据库, 并且会根据方法的输入和返回类型自动调整格式(容器, array or single value)
  + 其背后的连表查询写法值得研究

+ 关于Mapper: 根据自定义Mapper中的方法的argument和return的类型来转化dto <----> entity
  + 其背后的dto <---> entity转化过程值得研究



```java
package com.avengers.gamera.service;


import com.avengers.gamera.constant.EArticleType;
import com.avengers.gamera.dto.article.ArticleGetDto;
import com.avengers.gamera.dto.article.ArticlePostDto;
import com.avengers.gamera.entity.Article;
import com.avengers.gamera.entity.Game;
import com.avengers.gamera.entity.Genre;
import com.avengers.gamera.entity.User;
import com.avengers.gamera.mapper.ArticleMapper;
import com.avengers.gamera.repository.ArticleRepository;
import com.avengers.gamera.repository.GameRepository;
import com.avengers.gamera.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @Mock
    private ArticleMapper articleMapper;

    @Mock
    private ArticleRepository articleRepository;


    @Mock
    private GameService gameService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ArticleService articleService;

    private final ArticlePostDto articlePostDto = ArticlePostDto.builder()
            .coverImgUrl("https://assets-prd.ignimgs.com/2023/02/20/legend-of-zelda-tears-of-the-kingdom-1663081213439-1675804568959-1676863480057.jpg?fit=crop&width=282&height=282&dpr=2")
            .gameId(1L)
            .authorId(2L)
            .title("review for last of us")
            .text("review body text for last of us")
            .type(EArticleType.REVIEW)
            .build();

    Genre mockGenre2 = Genre.builder().id(1L).name("ZZ").createdTime(OffsetDateTime.now()).updatedTime(OffsetDateTime.now()).build();

    List<Genre> updatedGenreList = List.of(mockGenre2);
    private final Game mockGame = Game.builder()
            .id(1L)
            .name("Game1")
            .description("Excellent game")
            .isDeleted(false)
            .createdTime(OffsetDateTime.now())
            .updatedTime(OffsetDateTime.now())
            .genreList(updatedGenreList)
            .build();

    private final User mockUser = User.builder()
            .id(2L)
            .name("Bob")
            .email("Bob@gmail.com")
            .createdTime(OffsetDateTime.now())
            .updatedTime(OffsetDateTime.now())
            .build();

    private final Article mockArticle = Article.builder()
            .coverImgUrl("https://assets-prd.ignimgs.com/2023/02/20/legend-of-zelda-tears-of-the-kingdom-1663081213439-1675804568959-1676863480057.jpg?fit=crop&width=282&height=282&dpr=2")
            .title("review for last of us")
            .type(EArticleType.REVIEW)
            .text("review body text for last of us")
            .user(mockUser)
            .game(mockGame)
            .build();

    private final ArticleGetDto mockArticleGetDto = ArticleGetDto.builder().build();

    @Test
    void shouldSaveNewArticleWhenCreateArticle() {
        when(articleMapper.articlePostDtoToArticle(articlePostDto)).thenReturn(mockArticle);
        when(userService.findUser(articlePostDto.getAuthorId())).thenReturn(mockUser);
        when(gameService.findActiveGame(articlePostDto.getGameId())).thenReturn(mockGame);
        when(articleMapper.articleToArticleGetDto(any())).thenReturn(mockArticleGetDto);

        ArticleGetDto articleGetDto =  articleService.createArticle(articlePostDto);

        assertEquals(articleGetDto, mockArticleGetDto);
        verify(articleRepository).save(mockArticle);
    }
}
```

