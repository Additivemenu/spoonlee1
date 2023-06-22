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