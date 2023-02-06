1-30 React

Blog List Demo

下节课讲状态管理





# 要点

+ useState, useEffect的使用
+ 如何从后端索要数据







# 需求

从后端返回一个String[], 将String[]中的元素按每页面10个输出在网页中, 分成多个页面, 并提供按钮来切换这些页面





5min-
老师在code sandbox react中写, 

+ 我选择在vscode里写, 在vscode中安装axios依赖会导致npm run start失效

安装axios依赖, 在react project路径下 `npm install axios`



算了就用codesandbox react吧





---

几个面试问题 11min- 

为什么要使用hooks?



functional components中调用hooks要注意什么: 

+ 避免在循环中使用hooks



---





aa -21min

创建初始代码框架

App.js

Posts.js

Pagination.js

试验性地在每个component中写个hello world, 确保他们能先import成功





22min-









27min-

App.css





useState, useEffect 39min-



59min-

创建新的state

App.js

```react
const [currentPage, setCurrentPage] = useState(1);
const [currentPosts, setCurrentPosts] = useState([]);
const [postsPerPage] = useState(10);
```





面试题 1h17min-

Props 与 state的区别

+ 父传子props:  readonly, immutable
+ 子传父: callback
+ 父传孙子(不直接相关的component share 数据):  redux toolkit, context



currentPagePost做完



1h29min- pagination







1h41min- 

Pagination.js 

useEffect() 依赖项







1h45min-



Pagination.js

Button onClick







# 至此, 效果实现了



App.js

```react
import React, { useState, useEffect } from "react";

import "./App.css";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";

const App = () => {
  // states -------------------------------------
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [postsPerPage] = useState(10);

  // fetch all posts using axios API -----------------
  const fetchPosts = async () => {
    // note JS is single threaded, use try-catch to
    // handle exceptions like axios API fails
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log("res", res);
      setPosts(res.data); // 将API返回的data赋值给state: posts
      setLoading(false); // 表示data loading完毕
    } catch (error) {
      setLoading(false); // data loading 出错
    }
  };

  useEffect(() => {
    // fetch all posts 在第一次挂载时就执行
    fetchPosts();
  }, []);

  // 当[currentPage, postsPerPage, posts]中有任意一项改变时,
  // 执行 () => {}里的代码: setCurrentPosts()
  useEffect(() => {
    // get current posts (on current page): page 5: posts[40, 49]
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // 从posts里截取current page的posts
    const currentPostArr = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPostArr);
  }, [currentPage, postsPerPage, posts]);


  // jsx return html -------------------
  return (
    <div className="container">
      <h1 className="title">My Blog</h1>
      <Posts currentPosts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
```



App.css

```react
.App {
  font-family: sans-serif;
  text-align: center;
}

.title {
  display: flex;
  justify-content: center;
}

.container {
  max-width: 80%;
  margin: 0 auto;
}

.list-group {
  display: flex;
  flex-direction: column;
}

.list-group-item {
  padding: 1.75rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
  /* 让上面的post的bottom border往上收一收, 防止和下面的post border重叠 */
  margin-bottom: -1px;

  list-style: none;
}

.pagination {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
}

.page-btn {
  color: #0d7bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  margin-left: -1px;
  padding: 0.5rem 0.75rem;
}
```



Components > Posts.js

```react
// 当前页面的posts
import React from "react";

const Posts = ({ currentPosts, loading }) => {
  if (loading) {
    // if data not ready (loading = true)
    return <h2>Loading</h2>;
  }

  // jsx
  return (
    <ul className="list-group">
      {currentPosts.length > 0 &&
        currentPosts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
    </ul>
  );
};

export default Posts;
```



components > Pagination.js

```react
// 底部的页码
import React, { useEffect, useState } from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage
}) => {
  // state
  const [pageNumbers, setPageNumbers] = useState([]);

  //
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalPosts, postsPerPage]);

  // jsx ----------------------------------------
  return (
    <nav>
      <ul className="pagination">
        {/* 将一个array的信息转化为一组html tag */}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              style={{
                background: currentPage === number ? "lightblue" : null
              }}
              className="page-btn"
              onClick={() => {
                setCurrentPage(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
```









另一种做法 1h52min- 2h

子传父: callback

