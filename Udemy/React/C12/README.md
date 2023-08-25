React optimization & behind the scenes





# Abstract

key takeaway

+ State change of a component => re-evaluation of this component => re-run its jsx code => all of its child components gets re-evaluted
  + :bangbang: note re-evaluation of a component !== re-render the real DOM
  + we can use `React.memo()` to prevent unnecessary component re-evaluation
    + we can use `useCallback()` to declare an object (including function) to be singleton to React across render cycles







# How does React work behind the scenes







## Introduction



:pencil: [React vs React DOM](./sub_topics/React_vs_ReactDOM.md)

+ React => blueprint of a house, React DOM or React Native=> construction crew 

+ :bangbang: Re-evaluation of component !== re-rendering the real DOM

![](./src_md/react1.png)



:pencil: [virtual DOM diffing](./sub_topics/VDOM_diffing.md)

```html
// previous evaluation results
<div>
	<h1>Hi there!</h1>
</div>

// current evaluation results
<div>
	<h1>Hi there!</h1> 
  <!--Changes are required <p> should be inserted in DOM (the rest should stay unchanged)-->
	<p>This is new!</p>		
  <!---->
</div>




```



## Components updates in action



now just app.js

+ we use a boolean state to conditionally render a <p> element

```js
import React, { useState } from "react";
import Button from "./components/UI/Button/Button";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraph = () => {
    setShowParagraph((prevShowParagraph) => {
      return !prevShowParagraph;
    });
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>this is new!</p>}
      <Button onClick={toggleParagraph}>Toggle aragraph!</Button>
    </div>
  );
}

export default App;

```





## A closer look at child component re-evaluaiton

187-

:bangbang: conclusion: 

+ State change of component => cause this component to re-run (re-evaluate) => all code in jsx is re-run => `all of its child component in the jsx is re-run`
  + :bangbang: note re-run a functional component **doesn't** mean its corresponding real DOM gets updated 
  + certainly, there are some waste of resources in such re-run of all child component, we will talk about React.memo() to prevent unnecessary re-evaluations





Case1: 

+ we now introduce a child component DemoOutput.js

```js
import React, { useState } from "react";
import Button from "./components/UI/Button/Button";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraph = () => {
    setShowParagraph((prevShowParagraph) => {
      return !prevShowParagraph;
    });
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}></DemoOutput>
      <Button onClick={toggleParagraph}>Toggle aragraph!</Button>
    </div>
  );
}

export default App;
```



````js
import React from "react";

const DemoOutput = (props) => {
  console.log('DEMOOUTPUT RUNNING!')
  return <p>{props.show ? 'This is new' : ''}</p>;
};

export default DemoOutput;
````



+ app.js is re-evaluated , DemoOutput.js is re-evaluated
+ only <p> is re-rendered? 



---

Case2: 

now we don't pass state as props to DemoOutput, it's props should never get changed

```js
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}></DemoOutput>
      <Button onClick={toggleParagraph}>Toggle aragraph!</Button>
    </div>
  );
```

But it turns out the DemoOutput.js component is still re-evaluated once we click on toggle button and thereafter triggers the state change in App.js

+ This is because parent's state change will also trigger parrent component's re-evaluation => re-run parent's jsx => also triggers all children component re-evaluation, but doesn't mean the real DOM of children component is re-rendered
  + :bangbang: note re-run or re-evaluation of a component function !== re-render the real DOM





### :moon: Prevent unnecessary Re-Evaluations with React.memo()

188-

To prevent unnecessary re-evaluation of a component: 



:gem: Case1: 

+ use `React.memo()` wrap component name when exporting

  + this tells React: check if any props of this component changed compared to previous props

    ```js
    // pseudo code:
    if ( props === props.prev)
      	then skip re-evaluation of this component 
    ```

```js
import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log("Button running!")

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
```

Now that we see:

initial rendering:

```console
APP RUNNING
DemoOutput.js:4 DEMOOUTPUT RUNNING!
Button.js:6 Button running!
```

click on toggle button once, the DemoOutput stops re-evaluating

```console
APP RUNNING
Button.js:6 Button running!
```



:bangbang: why don't we use React.memo() everywhere?

+ React needs to store previous props, this also causes overhead
+ so it's a trade-off,  depends on your project size. For large project, React.memo() can cut off a large component tree from unnecessary re-evaluation

---



:gem: Case2: 

now if we apply the same for Button

```js
import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log("Button running!")

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
```

but we still see Button is re-evaluated when its parent component App.js has state change, why? 

+ this is because the mechanism of JS comparisons: 

```js
// for primitive types 
false === false // true
'hi' === 'hi'	// true

// for object 
[1,2,3] === [1,2,3] // false
// function is also object
```



App.js

+ Everytime App.js is re-evaluated, the function App is re-executed
  + the props we pass to DemoOutput is primitive type, `React.memo()` think DemoOutput's props not changed => React skip re-evaluate DemoOutput
  + the props we pass to Button is a function (also object), so when App.js re-executed, the callback function toggleParagraph will be **re-created,**  so the reference to  toggleParagraph we pass to Button would be different with previous props, so `React.memo()` still thinks Button's props changed => React re-evaluate Button
    + this lead to next class

```js
import React, { useState } from "react";
import Button from "./components/UI/Button/Button";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraph = () => {		// this callback function will be re-created on re-evaluation
    setShowParagraph((prevShowParagraph) => {
      return !prevShowParagraph;
    });
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}></DemoOutput>
      <Button onClick={toggleParagraph}>Toggle aragraph!</Button>
    </div>
  );
}

export default App;
```







### Prevent Function Re-Creation with useCallback()

---

189-

we can use `useCallback()` to tell React: please store the specified variable as a singleton across different render cycles. In this way, the function reference we pass to Button will always be the same and not change any more. 

```js
import React, { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraph = useCallback(() => {		// useCallback
    setShowParagraph((prevShowParagraph) => {
      return !prevShowParagraph;
    });
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}></DemoOutput>
      <Button onClick={toggleParagraph}>Toggle aragraph!</Button>
    </div>
  );
}

export default App;
```

now when click on toggle button, the Button will not be re-evaluated



### useCallback() and its dependencies

190-
