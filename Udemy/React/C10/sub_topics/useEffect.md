Rule1: if you specify state A as dependency in useEffect, don't change its value in useEffect callback sicne this leads to infinite re-rendering



what will happen when ComponantA is mounted?

1. **render Component A**: React will render the JSX returned by component `A`, which includes the rendering of component `B`.
2. **UseEffect A**: The `useEffect` hooks of component `A` are run after the initial render (for those effects without dependencies or with empty dependency arrays). If there are effects with dependencies, they will run on the first render and subsequently when the dependencies change.
3. **Render Component B**: React will render component `B` because it is nested within `A`.
4. **UseEffect B**: After `B` has been rendered, its `useEffect` hooks will run, following the same rules regarding dependencies as described in step 2.

```js
import React, { useEffect } from 'react';

const ComponentA = () => {
  useEffect(() => {
    console.log('useEffect in Component A');
  }, []);

  return (
    <div>
      <h1>Component A</h1>
      <ComponentB />
    </div>
  );
};

const ComponentB = () => {
  useEffect(() => {
    console.log('useEffect in Component B');
  }, []);

  return (
    <div>
      <h2>Component B</h2>
    </div>
  );
};

export default ComponentA;

```





## learn useEffect in 13mins

 https://www.youtube.com/watch?v=0ZJgIjIuY7U&t=3s



demo1

+ on dependency change, run callback in useEffect. (最常见的情况)

```js
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  console.log("render");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
      });
  }, [resourceType]);

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
}

export default App;
```





demo2

+ clean up function (function returned by useEffect) 

```js
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
	
    // the return part is the 'cleanup' function
    return () => {
      console.log('remove resize event listener')
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{windowWidth}</>;
}

export default App;
```

Certainly! In React, the `useEffect` hook allows you to perform side effects in function components. It is particularly useful for running some code not only after the first render but also after every subsequent rerender. The `useEffect` hook accepts two arguments: a function that contains the code to run and a dependency array.

### Cleanup Function

When dealing with side effects, it's often necessary to clean them up when the component is unmounted or before rerunning the effect due to changed dependencies. This is where the cleanup function of `useEffect` comes into play. The function that you return from your `useEffect` function acts as the cleanup function.

When you return a function from your effect, React will run it when:
- The component is unmounted (to clean up the last effect)
- Before running the effect again (if the component re-renders and the dependencies have changed)

This cleanup is crucial when your effect involves things like subscriptions, timers, or manually changing the DOM that should be reset, cleared, or otherwise cleaned up before the component is removed or the effect is re-run.

