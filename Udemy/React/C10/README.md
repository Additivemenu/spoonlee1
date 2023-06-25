Handling side effects, using Reducers & Using the context API

+ Effects
+ Reducers: managing more complex state 
+ Context: managing App-Wid or Component-Wide State with Context



# 1. Effects & useEffect

## What are "(side) effects" & introducing useEffect

143

React's `Main job`: render UI & react to user input

What we learned React.js in the past lectures:

```js
1. Evaluate & Render JSX
2. Manage State & Props
3. React to (User) Events & Input
4. Re-evaluate Component upon State & Props Change
```



`Side Effect`:  anything else other than `Main Job`, not ReactJs's main concerns.   React side effects can involve asynchronous data fetching, manually changing the DOM, using timers, logging, and more. In a React component, operations like these that don't directly relate to rendering the UI are referred to as side effects.

+ These tasks **must happen outside of the normal component evaluation and render cycle** - especially since they might block/delay rendering of component (e.g. Http requests). 
+ :bangbang: 其实核心思想就是想让<u>负责render UI与UI交互的逻辑</u>(main job)和<u>其他操作</u>(Side effect)进行分离, 从而减少后者对UI rendering & reaction的影响 => Java GUI里是通过Event Dispatch Thread来做的

```js
e.g.
1. Store Data in Browser Storage; 
2. Send Http Request to Backend Servers 
3. Set & Manage Timers
...
```



### :full_moon: useEffect() hook

:star: Solution: Handling side effects with the useEffect() Hook

```js
useEffect(()=>{...}, [dependencies]);
```

+ arg1: a function that should be executed <u>**AFTER every component evaluation**</u> IF the specified dependencies changed. 
  
  + ```js
    React rendering component tree to UI
    
    after rendering
    	if (any of dependencies changed)
        do callback 
    
    React rendering component tree to UI
    ...
    ```
  
  + Your side effect code goes into this function. 可以认为这里设置了一个callback function, 执行ReactJs component function时(即re-render时)会直接跳过useEffect()的代码块, 等时机合适callback function才会被执行
  
+ arg2: dependencies of this effect - the function only runs if the dependencies changed
  + specify your dependencies of your function here



---

chatGPT:

The `useEffect` Hook is executed after every render, including the first one. By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.



+ case : no dependency

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
In the above example, `useEffect` is setting the document title after React updates the DOM. Whenever the `count` state changes, React will re-render the component, and `useEffect` will be called after the render is done.



+ Case 2: with dependency

The `useEffect` hook can also take a second argument, which is an array of dependencies. The effect will only run when one of these dependencies changes. Here's an example:

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
In this example, the `useEffect` callback will only run when the `count` value changes. If the `count` value is the same between renders, React will skip executing the effect.  In React, when you use the `useEffect` hook with a dependency array, the callback function inside `useEffect` will be executed in the following cases:

1. **After the initial render:** The first time a component renders, React will run the `useEffect` hook after the render is committed to the screen.
2. **When one or more dependencies change:** After the initial render, the `useEffect` hook will only run again if one or more of its dependencies change. React will compare the current value of the dependency with its value during the last render, and if it's different, the effect will be run again.

:bangbang: The callback function inside `useEffect` is executed after the render is committed to the screen, not during the render. React first updates the DOM (the render phase), then it performs the side effects (the commit phase). This is why effects are also known as "after-effects". The side effects do not block the browser from updating the screen, which is important to keep the interface responsive. So, in a nutshell: the `useEffect` callback does not run during the render but runs <u>after the render is finished</u> **AND** <u>the changes have been committed to the screen.</u> This is also why React guarantees the DOM has been updated by the time it runs the effects.





+ Case 3: cleanup

Another key feature of `useEffect` is cleanup. Some effects might require cleanup (e.g., subscriptions or timers), and you can return a function from `useEffect` to handle this cleanup. This returned function will be called by React before it runs the effect the next time and also before the component unmounting.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```
In this example, a new timer is set up with `setInterval` when the component mounts and every time it re-renders, and it is cleared with `clearInterval` before every re-render and before unmounting, avoiding potential memory leaks.







## Using the useEffect() Hook

144

:gem: useEffect demo

利用browser提供的localStorage (which is independent of ReactJs) 来存储user的logged in 状态, 并将读取此等状态的逻辑(即`side effect`)与`main job` 分离 => 使用useEffect hook

实现效果, 当你刷新web page时, 如果此前用户已经logged in, 刷新之后用户还保留在logged in 状态.



```js
import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // note we don't want to run args1 code inside a component function as they are side effects which might disrupt component rendering
  // by putting them in useEfect, we ensure that these code logics are only executed AFTER every component evaluation IF any of the dependencies changed
  // below code only run once if no dependency is specified
  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem("isLoggedIn"); // when re-render, check if user logged in
    if (storedUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); // global variable provided by browser. Item is like a java entry: a key-value pair
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
```





### useEffect & dependencies

145

:gem: useEffect demo



Login.js

+ 每当user input时, 需要check validity of user input, which is independent to the main job => it's a side effect of user input, so do useEffect()

```js
import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // dependency between states;  enteredEmail. enteredPassword => formIsValid
  // whenever base state changes, check validity of user input => also a side effect of user input
  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // move below to useEffect args1
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // move below to useEffect args1
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")    // setEnteredPassword is set value at the end of this render-cycle
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
```







### What to add & not to add as Dependencies

146

该看这了



### Using the useEffect Cleanup Function



### useEffect Summary





# 2. Introducing useReducers & Reducers 







# 3. Introducing React Context (Context API)

