Ally 2-27 tut



下节课讲image-uploading, 前端是react, 后端是node

code test时也需要做unit test



这节课用脚手架了

# 要点

+ 理解redux的slice是对状态管理的一种模块化方式, 我们只需要先通过思考核心state和action把slice定义好, 不需要关注组件怎么用slice. 等到了写component时再去想如何调用对应slice里的action改变对应的状态

# Redux知识

> What is the relationship between redux slice and store?
>
> Redux Slice is a feature in Redux that allows you to create a reducer function, action creators, and selectors for a specific slice of state in your Redux store.
>
> On the other hand, the Redux store is the single source of truth for the state of your application. It holds the entire state tree of your application and allows you to dispatch actions to update the state.
>
> In other words, Redux Slice is a way to define and manage a specific part of the state within the Redux store. When you create a slice, it automatically generates the necessary actions and reducers to update that slice of state within the store.
>
> You can add the slice's reducer to your store using the `createSlice()` function provided by Redux, and it will automatically combine with other reducers in the store. The store is the container that holds all the reducers that make up your application's state.
>
> So, the relationship between Redux Slice and the store is that a Redux Slice is a tool for managing a specific slice of the state in the store. The slice's reducer is added to the store's reducers, and when an action is dispatched, the store's reducers handle the action and update the store's state accordingly.



> What is redux store?
>
> Redux is a popular state management library for JavaScript applications. <u>The Redux store is a JavaScript object that holds the state of the application</u>. It is the single source of truth for the entire application's state, which means that all the components in the application can access and update the state in the same way.
>
> <u>The Redux store is immutable, which means that you cannot directly change the store's state. Instead, you need to dispatch an action to describe the state change that you want to make.</u> The action is a plain JavaScript object that has a type property and any other data that is necessary to describe the state change. <u>The reducer function then takes the current state and the action and returns a new state based on the action.</u>
>
> The store maintains the current state of the application and notifies all the subscribed components whenever the state changes. This allows the components to update their UI based on the new state.
>
> In summary, the Redux store is the central place where the state of the application is managed, and it is updated by dispatching actions to reducers, which calculate the new state based on the current state and the action.



> what is a slice in redux?
>
> A slice in Redux is a small, self-contained piece of the Redux store <u>that contains the state and the reducers for a specific feature or domain of the application</u>. (可以说1个slice对应1个state以及这个state如何变化的管理吗?) It is a way to organize and modularize the state management of an application. 可以更好地实现状态管理和组件中状态的分离, 比如在slice里我可以提前预定好状态的形式, 然后通过reducer定义好state是如何根据action变化的,  此时我们只需要思考需要什么样的state, state根据action.payload如何变化即可, 不用关注组件里怎么调用, 等写到组件了再去调用指定slice里的action function去一步步实现所有功能
>
> A slice typically consists of three parts:
>
> 1. The `name` of the slice: a string that identifies the slice and is used to reference it in the store.
> 2. The `initialState`: an object that represents the initial state of the slice.
> 3. The `reducers`: <u>**a set o**f reducer functions</u> that handle state changes for the slice.
>
> Here's an example of how to create a slice in Redux using the Redux Toolkit library:
>
> ```js
> import { createSlice } from '@reduxjs/toolkit';
> 
> const initialState = {
>   count: 0
> };
> 
> const counterSlice = createSlice({
>   name: 'counter',
>   initialState,
>   reducers: {
>     increment(state) {
>       state.count += 1;
>     },
>     decrement(state) {
>       state.count -= 1;
>     },
>     incrementByAmount(state, action) {
>       state.count += action.payload;
>     }
>   }
> });
> 
> export const { increment, decrement, incrementByAmount } = counterSlice.actions;
> export default counterSlice.reducer;
> 
> ```
>
> 





# Redux Toolkit 

前面我们讲过用useReducer和useContext来实现低配版的Redux, 大的项目里基本都用Redux



https://redux-toolkit.js.org/tutorials/quick-start

过一遍quick start doc



安装依赖

```bash
npm install @reduxjs/toolkit react-redux
```





成果展示 8min-

相当于一个发帖页面, 在title和body的框框内输入文字, 点击add可以在下方生成post card.  也可点击post card上的delete来删除该post card 

<img src="./Src_md/finalResult.png" width=70%>



# 开始写

## 准备工作14min-

### 分解ui形成目录结构 

```js
|--- components
		|--- PostForm
  	|--- PostList
  	|--- Post
|--- store
		|--- index.js
		|--- PostSlice.js
App.js
index.js
...
```





### 复制粘贴scss

根路径下的 Index.scss, 被index.js调用

```scss
@import url('https://fonts.googleapis.com/css?family=Roboto');
 
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
 
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}
 
.post {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
 
  h2 {
    margin-top: 0;
  }
 
  p {
    margin: 0;
  }
}
 
.post-form {
  margin-bottom: 20px;
 
  label {
    display: block;
    margin-bottom: 5px;
  }
 
  input[type="text"],
  textarea {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
 
  button[type="submit"] {
    background-color: #008000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
 
    &:hover {
      background-color: #006400;
    }
  }
}
.delete-button {
  margin-top:1rem;
  background-color: red;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
 
  &:hover {
    background-color: darkred;
  }
}
```



先在脚手架里安装sass依赖, 才能让scss文件有效

```bash
npm install node-sass
```





### 创建Redux store 21min-

store路径下

可以参考官方文档写

index.js

```js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
})

export default store
```

PostSlice.js

Creating a slice requires 

+ a string name to identify the slice, 
+ an initial state value, 
+ and one or more reducer functions to define how the state can be updated. 

Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

```js
import { createSlice } from '@reduxjs/toolkit'      // just like createContext in previous tutorials

const initialState = [
  {id: 1, title: 'First Post', body: 'This is the first post'},
  {id: 2, title: 'Second Post', body: 'This is the second post'}
]

// Slice is like Context, which is used to warp states and functions as a 'package'
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost:  (state, action) => {
            const {title, body} = action.payload	// 接收action.payload里的东西
            const id = state.length+1
            state.push({id, title, body})

        },
        deletePost: (state, action) => {
            const postId = action.payload
            const res = state.filter(post => post.id !== postId)
            console.log('res', res)
            return res;

        }
    }

})


// ! 注意这里不同的export 方式
// !export action ! 哪里有postSlice.actions属性?
export const {addPost, deletePost} = postSlice.actions;      // named export

export default postSlice.reducer;        // default export
```



36min- 

回去把reducer加到store里

store路径下的index.js

```js
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './PostSlice'      // default import

const rootReducer = {
    posts: postsReducer
}

// store 里也可能会有不同的reducer
export const store = configureStore({
  reducer: rootReducer
})

```



Slice里定义了initial state, 以及(1个或多个)reducer( 内部定义一个个的action: state该如何更新)

接着我们把一个Slice的reducer export出去, 放到store里面, 之后通过redux的provider, 就可以让被Provider包裹的组件查收使用store里封装的reducer了



### Prodive redux store to react 44min-

用redux的Provider包住目标组件 

根路径下的index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider包住的component都可以获取store里的内容
  <Provider store={store}>    
    <App />
  </Provider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```





###  49min-

PostList.js

```js
import React from 'react'

const PostList = ()=>{
    return (
        <div className='post-list'>
            list
        </div>
    )
}

export default PostList
```

App.js

```js
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
        <h1>Online Post App</h1>
        <PostList/>
    </div>
  );
}

export default App;
```

yarn start, 应该能看到PostList在页面中显示



### 尝试做Post组件与PostList中的map() 1h01min-1h07min

PostList组件里接收store的东西



```js
import React from 'react'

import {useSelector} from 'react-redux'

const PostList = ()=>{
    // Call useSelector with a function that takes the Redux store state as its argument and returns the value (即store里的指定reducer所在的slice的state) you want to select from the state. 
    // This will subscribe the component to the Redux store and automatically update the component whenever the selected value changes:
    const posts = useSelector (state => state.posts)            // 像useContext那样, 获取redux的Provider组件里绑定的store的东西 
    // ! 这里的state指的是什么?---应该是Redux store的state   
    // !这里state.posts居然得到了我们在PostSlice里隐性定义的state (由initialState隐性定义)
    // ! 这样理解, state表示store的状态, state.posts代表了我们定义在PostSlice中的reducer, 也就能够找到该slicer的state
    // state.posts中posts指的是store里的

    console.log('posts', posts)

    return (
        <div className='post-list'>
            {
                posts.map(post => {
                    return (
                        <div>{post.body}</div>
                    )
                })
            }
        </div>
    )
}

export default PostList
```





1h07min-1h12min 

帮同学debug



### 1h12min-1h22min

Post.js

+ 使用useDispatch()获得dispatch, 在dispatch里才能使用在slice里定义的, 用来改变该slice内的state的action function

```js
import {useDispatch} from 'react-redux'
import {deletePost} from '../store/PostSlice'       // as we use named export in PostSlice


// Post card component
const Post = ({post}) => {

    // 拿到action
    const dispatch = useDispatch();    

    const handleDelete = () => {
        dispatch(deletePost(post.id));      // post.id 将作为action.payload
    }

    return (
        <div className="post">
            
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button 
                className="delete-button"
                onClick = {handleDelete}>
                    Delete
            </button>

        </div>
    )
}

export default Post;
```

PostList.js

+ 将Post组件拿到map()里做映射

```js
import React from 'react'

import {useSelector} from 'react-redux'
import Post from './Post'

const PostList = ()=>{
    // Call useSelector with a function that takes the Redux store state as its argument and returns the value (即store里的指定reducer所在的slice的state) you want to select from the state. 
    // This will subscribe the component to the Redux store and automatically update the component whenever the selected value changes:
    const posts = useSelector (state => state.posts)            // 像useContext那样, 获取redux的Provider组件里绑定的store的东西 
    // ! 这里的state指的是什么?---应该是Redux store的state   
    // !这里state.posts居然得到了我们在PostSlice里隐性定义的state (由initialState隐性定义)
    // ! 这样理解, state表示store的状态, state.posts代表了我们定义在PostSlice中的reducer, 也就能够找到该slicer的state
    // state.posts中posts指的是store里的

    console.log('posts', posts)

    return (
        <div className='post-list'>
            {
                posts.map(post => {
                    return (
                        <Post key={post.id} post={post}/>
                    )
                })
            }
        </div>
    )
}

export default PostList
```



现在可以实现点击Delete button删除Post card的功能



帮学生debug 1h23min-1h37min



### :moon: PostForm 1h37min-1h52min

难点!



PostForm.js

+ 注意学习其中onSumbit, 触发的事件以及如何把title和body输入的内容传入action function: addPost( )
+ 注意Slice是状态管理的modular way, 我们是先根据核心state和action function 写好slice, 再去在具体的组件里去dispatch对应的Slice中的action function
+ onChange, onSubmit 对应回调函数的参数都是event

```js
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addPost} from '../store/PostSlice'

const PostForm =  () => {
    // hooks
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    // functions
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost({title, body}))        // need state
    }

    // jsx
    return (
        <form className='post-form' onSubmit = {handleSubmit}>
            <h2>Add Post</h2>

            <label htmlFor='title'>Title:</label>
            <input type='text' id='title' value={title} onChange={e => {setTitle(e.target.value)}}></input>

            <label htmlFor='body'>Body:</label>
            <textarea id='body' value={body} onChange={e => {setBody(e.target.value)}}></textarea>

            <button type='submit'>Add</button>
        </form>
    )
}

export default PostForm;
```



App.js

+ 添加上PostForm到App

```js
function App() {
  return (
    <div className="App">
        <h1>Online Post App</h1>
        <PostForm/>
        <PostList/>
    </div>
  );
}
```





帮学生debug 1h53min-1h58min





Q&A 1h58min-













