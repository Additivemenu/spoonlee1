# Demo1

[Demo1: game platform selection bars]()

> What is the difference between a react state and a normal variable in js?
>
> React state and a normal variable differ in their scope, mutability, and how they affect the component's rendering.
>
> 1. Scope: Normal variables have a local scope within the function where they are defined. React state, on the other hand, has a component scope and can be accessed and updated from any method within the component.
> 2. Mutability: React state is mutable, meaning that it can be changed over time using the `setState()` method provided by React. Normal variables, on the other hand, are immutable by default and cannot be changed once they are defined.
> 3. :star: Rendering: When a React component's state changes, React will automatically re-render the component and update the UI to reflect the new state. Normal variables, on the other hand, do not trigger a re-render and do not affect the UI unless they are explicitly used in the component's render method. 如果组件中有normal variable Y 是由 state X推导出来的， 那么当X改变时， 涉及到Y的语句都会再次被执行 (也是re-render的一部分)
>    1. 进阶问题: when will a component be re-rendered in react?
>
> In summary, React state and normal variables differ in their scope, mutability, and how they affect the component's rendering. React state is designed to manage dynamic data that can change over time and trigger re-renders, while normal variables are used for static data that does not affect the component's rendering.
>
> 

代表selected article的list需要是state吗? --- 它的改变确实应该改变页面的ui, 因此应该将其看作state





> Too many re-renders. React limits the number of renders to prevent an infinite loop.
>
> a





JS 基础:

> what should I pay attention when using spread operator in nested object?
>
> When using the spread operator (`...`) with nested objects in JavaScript, there are a few things you should keep in mind:
>
> 1. Shallow copy: The spread operator creates a shallow copy of an object, which means that only the top-level properties of the object are copied. If the object contains nested objects, those nested objects are still references to the original objects. This can lead to unexpected behavior if you modify the nested objects.
> 2. Overwriting properties: When using the spread operator to merge two objects with the same property name, the value of the second object will overwrite the value of the first object. This can also happen with nested objects if they have the same property name.
> 3. Immutable data: JavaScript objects are mutable by default, which means that their values can be changed. When using the spread operator with nested objects, you need to be careful not to accidentally modify the original object or nested objects. To avoid this, it's best to use immutable data structures or make a deep copy of the object using a library like `lodash` or `immer`.
>
> Here's an example of using the spread operator with a nested object:
>
> ```js
> javascriptCopy code
> const originalObject = {
>   a: 1,
>   b: {
>     c: 2,
>     d: 3
>   }
> };
> 
> // shallow copy
> const newObject = { ...originalObject };
> newObject.b.c = 4;
> 
> console.log(originalObject.b.c); // Output: 4 (unexpected behavior)
> 
> // deep copy using JSON.parse() and JSON.stringify()
> const deepCopy = JSON.parse(JSON.stringify(originalObject));
> deepCopy.b.c = 5;
> 
> console.log(originalObject.b.c); // Output: 4 (unchanged)
> ```
>
> In this example, the original object has a nested object `b` with properties `c` and `d`. The shallow copy of the object is created using the spread operator, and the value of `c` is changed in the new object. However, this also changes the value of `c` in the original object, which is unexpected. To avoid this, a deep copy of the object can be made using `JSON.parse()` and `JSON.stringify()`. This creates a new object with a new reference for all nested objects.



思考: 如果我现在已经写出了组件, 现在想在已有的组件上做新的需求, 在考虑到react组件复用性与遵守react 哲学的基础上, 我的新需求的实现是否也得遵守react 哲学 采用bottom-up的方式来定义新的state



React的核心是状态管理, 而面对动态页面你首先要考虑的是它对应的核心状态是什么? 该用怎样的数据结构来表示. 之后再去根据复用性等等方面的需求来决定state的最高点放在哪里

一个核心的state可以推导出其他的衍生state



所谓的state lifting 有两个作用:

+ 组件通信
+ 抽象化组件, 将组件中<u>变化的东西 (往往是代表一个list数据的state)</u> 提取出来放到它的父亲或者祖先组件那里, 这样组件被抽象化(真正的''函数式''组件)就可以被复用了



> can normal variable be passed over functional components in react?
>
> Yes, you can pass a normal variable as a prop to a functional component in React. In fact, passing data as props is a fundamental way of sharing data between components in React.
>
> When you pass a variable as a prop, it becomes an attribute of the component in the JSX code. For example:
>
> ```react
> javascriptCopy code
> import React from 'react';
> 
> function MyComponent(props) {
>   return <div>{props.message}</div>;
> }
> 
> const message = 'Hello, world!';
> 
> function App() {
>   return <MyComponent message={message} />;
> }
> ```
>
> In this example, we define a `MyComponent` function that accepts a `props` object as an argument. We then use the `props.message` property to render the message in the component.
>
> We also define a `message` variable outside of the component and pass it as a prop to `MyComponent` in the `App` function. The `message` variable can be any type of data, such as a string, number, boolean, or object.
>
> When `MyComponent` is rendered, it will receive the `message` prop as an attribute, like this:
>
> ```react
> phpCopy code
> <div message="Hello, world!"></div>
> ```
>
> The component can then access the prop through the `props` object and use it to render content.
>
> So, to answer your question, normal variables can be passed as props to functional components in React. This is a common way to share data between components and build more complex UIs.
