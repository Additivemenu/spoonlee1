# Demo1

112-120

Demo intro: 一个标准的二元组件: 1) a component used to collect user input; 2) a component used to present the results in response to user request

## :question: Q & A

+ react 组件之间通信可以传递non-state variable吗?
+ 什么时候一个variable应该是state? (有点React 设计模式的味道了, 其实就是经验总结)

> 1. **dynamic** data in a web page. e.g. user input, response data to a request
>
> 2. boolean variable that is used to control **dynamic (conditional)** content and styling

+ react 的re-render到底是什么时候触发? 触发涉及的的组件范围?

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
> As for the scope of the component that will be affected by a state change: a state change will cause the component where the state change occurred and all its child components to re-render. 
>
> However, only the components that actually use the part of the state that changed will re-render. React's diffing algorithm ensures that only components that need to re-render will do so. 
>
> For example, if you have a parent component with two child components, and only one of the child components uses the state that changed, only the parent and that one child will re-render. The other child component won't re-render, because its output wouldn't have changed.
>
> Furthermore, if you use `React.memo()` or `shouldComponentUpdate()`, you can prevent child components from re-rendering even if their parent re-renders, as long as their props haven't changed. This can be useful for optimizing performance in large component trees.



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
+ 但是对于invalid user input & conditional component 不太好



# Demo2

121-132