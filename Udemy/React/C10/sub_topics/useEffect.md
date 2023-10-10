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

