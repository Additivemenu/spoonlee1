Ally 2-6 react tut

本节课讲状态管理

Github上可以放一些小项目(7,8个足矣), GitHub链接放在简历上, 别人是有可能看的



最终效果展示




# Review: state management 

code sandbox



父传子 props readonly immutable

子传父	callback

父传孙子 redux toolkit, context



```react
1. context API: 实现了数据传递和共享

2. context + userReducer: 实现低配版的redux, 用于中小型项目的状态管理  基于react devtools

3. redux + react-redux: 公司级别的项目基本都要用redux, 用于中大型项目的状态管理  基于redux  devtools
```

今天讲第二个 context + userReducer, 用useState, useEffect, useReducer, useContect做一个低配中的低配的redux



12min-

:book: [React官方文档: hooks](https://reactjs.org/docs/hooks-reference.html)

用到两个hooks: useReducer, useContext

# 正式开始15min-



<img src="./Src_md/finalEffect.png" width=50%>



## 打开code sandbox react, 加入dependencies

```react
@mui/material
@mui/icons-material
@emotions/styled
@emotions/react
```



vscode里输入如下装dependency

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```



在Src下创建components, context folder







## 创建静态页面, 保证组件连接成功 17min-26min



看到26min, 回去看尚硅谷React: hooks





