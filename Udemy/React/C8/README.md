# Demo1

112-120

Demo intro: 一个标准的二元组件: 1) a component used to collect user input; 2) a component used to present the results in response to user request

## :question: Q & A

:question: react 组件之间通信可以传递non-state variable吗?

+ 什么时候一个variable应该是state? (有点React 设计模式的味道了, 其实就是经验总结)

> 1. **dynamic** data in a web page. e.g. user input, response data to a request
>
> 2. boolean variable that is used to control **dynamic (conditional)** content and styling

:question: react 的re-render到底是什么时候触发? 触发涉及的的组件范围?

https://www.developerway.com/posts/react-re-renders-guide

https://felixgerschau.com/react-rerender-components/

+ DOM vs. VDOM
  + React Diffing algorithm: VDOM => DOM
    +  State changes in your application will be applied to the VDOM first. If the new state of the VDOM requires a UI change, the *ReactDOM* library will efficiently do this by trying to update only what *needs* to be updated. When the VDOM gets updated, React compares it to to a previous *snapshot* of the VDOM and then *only* updates what has changed in the real DOM. If nothing changed, the real DOM wouldn't be updated at all. **This process of comparing the old VDOM with the new one is called \*diffing\***. 

> 以下来自chatgpt
>
> React components will re-render under several conditions:
>
> 1. When their state changes: When you use the `setState()` method in a class component or the setter function from a `useState()` hook in a functional component, the component will schedule a re-render with the new state.
>
> 2. When their props change: If a parent component passes different props to a child component, the child component will re-render with the new props.
>
> 3. When the parent component re-renders: Even if a child component's state and props haven't changed, it may still be re-rendered if its parent component re-renders. However, React has optimizations (like `React.memo()` and `shouldComponentUpdate()`) to prevent unnecessary re-renders in this case.
>
> 4. When you explicitly call a force update: In class components, there's a `forceUpdate()` method that will force a re-render. But this is rarely used, because it bypasses the normal rules of React and can lead to issues.
>
> As for the scope of the component that will be affected by a state change: a state change will **cause the component** **where the state change occurred** and **<u>all its child components to re-render</u>,  regardless of whether their states or props have changed or not**.**
>
> + It's important to note that React is smart about re-rendering. **If a state change happens but the result is the same as the previous state, React won't cause a re-render, thanks to `React's Diffing algorithm (aka. reconciliation process)`** Similarly, if a component's props don't change during a parent's re-render, that component also won't re-render, thanks to React's reconciliation process.
> + Furthermore, if you use `React.memo()` or `shouldComponentUpdate()`, you can prevent child components from re-rendering even if their parent re-renders, as long as their props haven't changed. This can be useful for optimizing performance in large component trees.

:question: state-update in react is asynchronous？

> When you print a state in React, **the value you see is the current value of that state at the time of the render cycle you are in.** <u>*React state updates are asynchronous, meaning they do not happen immediately but are scheduled to happen at the next render cycle.*</u> Because of this, if you call `setState` and then immediately log the state, you'll see the old state value because the state update hasn't been applied yet.
>
> If you need to work with the new state value right after calling `setState`, you can use the `useEffect` hook, which will run after the render is committed to the screen:
>
> ```js
> const [count, setCount] = useState(0);
> 
> // meaning: when count is changed, exe the function
> useEffect(() => {
>  console.log(count); // This will print the new value of count
> }, [count]);
> ```

:question: event.target.value 类型?





for the start up of a project, you needs to be clear: 

+ how should the component tree look like
+ what events needs to be handled => what state do I need to manage?



Hint: 

+ component: break down into a component tree
+ event:  at least 3 events needs to be handled 
  + user input change
  + reset button is clicked
  + form submission
+ component-scoped styling: use *styled component* or *css modules*



自己练习的结果:

+ 可以写出来collect user input, calculate and display result
  + 利用<input/>的onChange来通过event.target.value来capture user input
    + event.target.name用来绑定<input/>和state object中某个field

+ 关于conditional content, 在user没有输入时显示no calculation result; 有输入计算结束后显示result table
  + 再看看老师是如何检测empty input的

+ :bangbang: bug: reset之后再calculate没反应 (还未解决)

  + 似乎是和react的diffing algorithm有关系,  对于同一个`<input>` , 用一个state来carry其value, 如果reset之后， 和上次输入的数据一样， 那么就不会re-render, 但是reset之后, 再次输入时上次的数据不应该是""吗? 
  
+ `<form>` 相关

  + `<form`>内部的`<button`>的type可以和`<form`>的onSubmit, onReset属性联动

  ```html
      <form className="form" onSubmit={submitHandler} onReset={resetHandler}>
        <p className="actions">
          <button type="reset" className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
  ```

  + `<form>`的sumbit event会刷新页面, 需要event.preventDefault()





# Demo2

121-132

还是二元组件: 

+ one for collecting user input; 
+ one for displaying result in response to  user request

稍微的难点在于, user input empty or invalid时， 弹窗提示错误信息 => wrapper component + conditional content







5 steps thinking in React:

+ Step1: 设计component tree, 搭骨架
+ Step2: 写css, 构成静态网页
+ Step3: 最低state
+ Step4: state lift up, 实现component communication
+ Step5: 调整, 最终构成动态网页



直接听lecturer讲, 但我用的是styled component. 几个关键点:

+ wrapper component for reusable component e.g. Card, Button, ErrorModal

  + reusable: 组件props接收外界input, 并将该信息动态展示在自己身上; 

+ :bangbang: manage error state to conditional show ErrorModal -> P131 秒!

  + Overlay, 弹窗的产生与关闭: 其实还是state-controlled conditional content

  + 一个react pattern我感觉， 在哪个component定义state, 就在哪个component定义如何handle that state change, 其他component用到再传给他们这个handler

+ use two-way binding to display <input> value in real time

+ `event.target.value` returns a String, even if you specify type of an <input> to be number. You would need to manually convert it to the data type you like.

+ styled component的使用

  + ``````js
    // 方式1. 创建新的styled component
    const MyStyledComponent = styled.div`
    ...
    `
    
    // 方式2. 基于已有的component, 加装style
    const MyStyledCard = styled(Card)`
    ...specified styles
    `
    
     
    ``````

:bangbang: 其中方式2需要为Card传递className作为apply specified style的conduit, 这和styled component的工作原理有关, 具体原因如下:

In React, `className` is a prop that can be used to specify a CSS class for a DOM element. When you use styled-components to style an existing component, <u>**under the hood, styled-components generates a unique CSS class with the styles you specify**</u> and **<u>then applies that class to the component by passing it via the `className` prop.</u>** 

The `className` prop in your `Card` component acts as a conduit for the styles from the styled-component to be applied to the correct DOM node. 

```jsx
// Card.js
import React from 'react';

const Card = ({ className, children }) => {
  return <div className={className}>{children}</div>; 
};
```

In the example above, the `className` prop is being passed down to the `div` element. This means that when you create a styled component from `Card`, the styles will be applied to the `div`:

```jsx
// MyStyledCard.js
import styled from 'styled-components';
import Card from './Card';

const MyStyledCard = styled(Card)`
  background-color: lightgray;
  padding: 16px;
  border-radius: 8px;
`;
```

工作原理:  MyStyledCard / styled component generate a unique className for specified style => Card / pass that className to div=> div with that className been assigned specified style

1. In the `MyStyledCard` declaration, styled-components will generate a unique className, and the styles you've specified will be associated with that className. 

2. When `MyStyledCard` is used, it internally renders the `Card` component and passes the generated className as a prop. `Card` in turn attaches this className to the `div`, resulting in the `div` being styled according to your specifications.

:bangbang: If `Card` did not accept and use a `className` prop, the styles from `MyStyledCard` would not be able to be applied. However, not all components will pass along the `className` prop by default. Many built-in components in libraries such as Material-UI do not pass along the `className` prop. In these cases, you would need to either wrap the component in a styled component, or use a different method to style the component, depending on the library's recommendations.



该看125了
