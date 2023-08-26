References:

+ :book: [React official tut](https://react.dev/learn)

+ [Udemy react: complete guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25595350#overview)

  + :book: [配套Github repo](https://github.com/academind/react-complete-guide-code/tree/01-getting-started)

  + [Community & Discussion board](https://academind.com/community/)
    + 有很多其他tutorial

似乎还得学next.js, tailwind...




---

代码见另一个repo了...

只选取欠缺的章节学习, 节省时间学后端和算法



:bangbang: npm install 下载node modules

推荐插件

+ react component tree



本课涉及到的react design pattern

+ state-controlled rendering:  conditional component, conditional styling

+ stateful & stateless component
  + 在哪个component定义的state, 就在哪个component定义stateChangeHandler

+ Wrapper: to combat "div soup" problem

  + ```js
    const Wrapper = (props) => {
      return props.children;
    };
    export default Wrapper;
    ```


  + React acutally has built-in Wrapper component => use `<React.Fragment>` to combat 'div soup' problem

+ `<ReactDOM.createPortal()>` to make overlay, backdrop component semantically better

+ `useReducer` on top of `useState` for managing complex state: to gain high cohesion and low coupling 

+ `useContext` 与 Context Provider component, 实现集中管理某种相关的一系列状态 (e.g. login, logout authentication)



## Course Content


React基础篇

| Episode             | Title                                                        | Description |
| ------------------- | ------------------------------------------------------------ | ----------- |
| [1](./C1/README.md) | Intro                                                        |             |
| [2](./C2/README.md) | JS Refersh                                                   |             |
| [3](./C3/README.md) | React basics, working with component                         | React component <br> props <br> wrapper components vs. normal components |
| [4](./C4/README.md) | :star: React state, working with event,  :bangbang: component communication | State <br> :bangbang: update state based on previous state <br> :bangbang: `<input>`: two way binding <br>Event |
| [5](./C5/README.md)                   | Rendering List, Conditional Content                          | Map list to JSX; <br>conditional react component |
| [6](./C6/README.md) | Styling React Component                                      | conditional styling; <br>styled component + css modules |
| [7](./C7/README.md) | :bangbang: Debugging react apps                              | break points <br>React dev-tools |
| [8](./C8/README.md) | :gem: Practice: a complete Practice Project         | :bangbang: react re-render mechanism <br> :question: demo1:  还有关于react diffing的小bug. 先不管， 先往下学 <br> demo2 : error state management; 弹窗的产生与关闭<br> |

进阶篇

| Episode               | Title                                                        | Description                                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [9](./C9/README.md)   | Working with Fragments, portals and "Ref"                    |                                                              |
| [10](./C10/README.md) | :star: Handing side effect, use Reducers & Context   ----> Redux later | `useEffect()` <br>`useReducer()` <br>`useContext()`          |
| [11](./C11/README.md) | :gem: Practice: Building a food order App                    | review and apply what we learned so far                      |
| [12](./C12/README.md) | :bangbang: Scene behind react & Optimization <br> mainly for performance optimization | state or props change of a component => re-evaluation of this component<br>:bangbang: re-evaluation of a component !== re-rendering the real DOM <br> `React.memo()` <br> `useCallback()`  for memorizing callback function across render cycle<br> `useMemo()`  for memorizing data across render cycle |
| 13                    | Alternative way: class component                             |                                                              |

中级篇

| 14   | :star: sending HTTP request                              |      |
| ---- | -------------------------------------------------------- | ---- |
| 15   | :star: Building custom react hooks                       |      |
| 16   | Working with forms & User input                          |      |
| 17   | :gem: Practice: adding HTTP & form to the food order app |      |
| 18   | :star: Redux (Alternative to Context)                    |      |
| 19   | :star: Advanced Redux                                    |      |
| 20   | :star: Build a Multi-Page SPA with React Router          |      |
| 21   | Adding Authentication to React Apps                      |      |

Ajax与Axios 见其他笔记



Bonus篇

| 22   | Deploying react app                          |      |
| ---- | -------------------------------------------- | ---- |
| 23   | Introduction to Next.js                      |      |
| 24   | Animating React Apps                         |      |
| 25   | Replacing Redux with React Hooks             |      |
| 26   | :star: Test React Apps (Unit test)           |      |
| 27   | React + Typescript                           |      |
| 28   | Optional: react hooks introduction & Summary |      |
| 29   | Optional: React summary                      |      |
