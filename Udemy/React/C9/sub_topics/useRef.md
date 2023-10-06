learn `useRef` in 11mins:

https://www.youtube.com/watch?v=t2ypzz6gJm0&t=349s



In summary:

- Use `useState` when you need to create reactive state variables that will cause the component to re-render when they change.
- Use `useRef` when you want to create mutable object which holds a `.current` property and it does not cause re-render when the object is changed, or when you need to hold references to DOM nodes.



## UseCase1:  count render cycle number

show render cycle number



if only useState()

+ Trapped into infinite rendering-loop since change of state triggers re-render

```js
import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // useEffect, if not specify dependency array, the callback runs each time the component renders
  useEffect(() => {
    setRenderCount((prev) => prev + 1); // but this also changes the value of a react state, which leads to infinite rendering loop
  });

  return (
    <>
      {/* 2 way-binding */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount} times</div>
    </>
  );
}

export default App;
```



Now, useRef( ) can do the trick as change of useRef value doesn't trigger re-render

```js
import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const renderCount = useRef(0); // useRef returns an object with a property called current: {current: 0}

  // useEffect, if not specify dependency array, the callback runs each time the component renders
  useEffect(() => {
    renderCount.current = renderCount.current + 1;  // !this won't trigger component to re-render
  });

  return (
    <>
      {/* 2 way-binding */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount.current} times</div>
    </>
  );
}

export default App;
```





## UseCase2: reference to DOM element

like querySelector, ref to a html element

+ But be cautious, don't overuse it. R
  + eact states should be managed by react itself, don't attempt to manually manipulate over it. e.g. in below demo, when click on 'focus' button, the value shown in 'input' is changed, but in display bar `<div>My name is {name}</div>` there is no change.

```js
import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const inputRef = useRef();

  function focus() {
    console.log(inputRef.current);    // like using document.querySelector()
    inputRef.current.focus();
    inputRef.current.value = "Some value";    //! ******* but this violates react philosophy, state should be managed by react, not manually 
  }

  return (
    <>
      {/* 2 way-binding */}
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>My name is {name}</div>
      <button onClick={focus}>Focus</button>
    </>
  );
}

export default App;
```







## UseCase3: store state value in previous cycle

store states value in previous render cycle

+ now in display bar, you can see the value of 'name' in current render cycle and in the last render cycle

```js
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const prevName = useRef("");

  useEffect(() => {
    prevName.current = name; // prevName.current is the value of name in the previous render
    // in this useEffect callback, there is no state change and there won't be any infinite rendering loop
  }, [name]);

  return (
    <>
      {/* 2 way-binding */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        My name is {name}, it used to be {prevName.current}
      </div>
    </>
  );
}

export default App;
```

