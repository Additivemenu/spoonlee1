其实更偏向于JS基础, JS的笔记也做了关于async-await的内容



## what is Async-await?



allows you to write asynchronous request in a synchronous way (only by the way it looks, NOT by the way it behaves)

nothing special, just moving from  `then catch` to `async await` + ``try catch`

:bangbang: note since node14.3, you can also use `await` outside of a `async` function





以下是我自己找的demo

## Demo1:

:book: [async function - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

+ get sample code to run in browser, sweet!

```js
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();		//JS runtime doesn't wait for async function complete, moving to next line
console.log("end")
```

The provided code snippet is an example of JavaScript asynchronous execution using Promises and async/await syntax. Here's what happens when you run this code:

1. The `asyncCall` function is called.
2. Inside `asyncCall`, `console.log('calling');` executes, logging "calling" to the console.
3. Then, the `await resolveAfter2Seconds();` is executed. This pauses the execution of `asyncCall` until `resolveAfter2Seconds` completes. <span style="color: red">Meanwhile, the rest of the code outside of `asyncCall` continues to execute.</span>
4. <span style="color:red">Since the JavaScript runtime doesn't wait for `asyncCall` to complete before moving to the next line, `console.log("end");` executes next, logging "end" to the console.</span>
5. After 2 seconds, `resolveAfter2Seconds` function resolves, and the string 'resolved' is returned.
6. The `const result = await resolveAfter2Seconds();` line in `asyncCall` gets the resolved value 'resolved', and the next line `console.log(result);` executes, logging "resolved" to the console.

So, the output will be in the following order:
```js
calling
end
resolved			// appears after 2 seconds
```





## Demo2

loading state:

```js
import React, { useState, useEffect } from 'react';

function CommentsPage() {
  // useState to store the comments and the loading state
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch comments
    const fetchComments = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch('/api/comments'); // Replace with your API endpoint
        const data = await response.json();
        setComments(data); // Set the comments
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false); // Finish loading regardless of success or error
      }
    };

    fetchComments(); // Invoke the function
  }, []); // Empty dependency array to ensure this runs only once on mount

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching
  }

  return (
    <div>
      <h1>Comments</h1>
      {comments.length === 0 ? (
        <p>No comments to display</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.text}</li> // Adjust according to your data structure
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentsPage;

```

### Behind the scene:

Certainly! Here's the summary of the rendering cycle for the React component that fetches data on mount:

1. **Initial Render**: 
   - The component mounts and renders for the first time.
   - The initial state is set with `comments` as an empty array and `isLoading` as `false`.
   - The UI reflects this initial state, likely showing no comments and no loading indicator.

2. **useEffect Hook Executes**:
   - Right after the first render, the `useEffect` hook is executed.
   - Inside `useEffect`, `setIsLoading(true)` is called first. This updates the `isLoading` state to `true`, signaling the start of the data fetching process.

3. **Second Render (Loading State)**:
   - React schedules a re-render in response to the state change (`isLoading` set to `true`).
   - The component re-renders, and the UI now shows a loading indicator, reflecting the updated state.

4. **Fetch Data**:
   - Still within the same `useEffect` block, immediately after `setIsLoading(true)`, the `fetch()` call is made to retrieve data.
   - This fetching process runs asynchronously in the background and does not block the rendering process.

5. **Data Fetching Completes & State Update**:
   - Once the data is successfully fetched, the state is updated again with `setComments(data)` to store the fetched comments and `setIsLoading(false)` to indicate that loading is complete.
   - These state changes trigger another re-render of the component.

6. **Final Render (Display Data)**:
   - The component re-renders in response to the updated state.
   - The UI now displays the fetched comments, and the loading indicator is removed, reflecting the final state where `isLoading` is `false` and `comments` contains the fetched data.

Throughout this process, React efficiently manages these renders, ensuring that the UI is always consistent with the component's state. The `useEffect` hook with an empty dependency array ensures that the side-effect (fetching data) is executed only once after the component initially mounts.



### a closer look: 

Yes, your understanding is correct. Let's break it down further for clarity:

1. **useEffect Executes**: When the component mounts, the `useEffect` hook is invoked after the initial render. This hook is designed for side effects and runs after the render is committed to the screen.

2. **Set isLoading to True**: Inside `useEffect`, the first thing that happens is `setIsLoading(true)`. This updates the state, which schedules a re-render of the component.

3. **Initiate fetch() Call**: Immediately after `setIsLoading(true)`, the `fetch()` function is called to retrieve the data. This is an asynchronous operation and doesn't block the JavaScript thread.

4. **Component Re-renders**: React now re-renders the component because of the state change (`isLoading` is now `true`). However, the `useEffect` hook does not run again because of its empty dependency array (`[]`). The empty dependency array ensures that the effect is only run on mount and unmount, not on every re-render.

5. **Asynchronous fetch() Continues**: While the component is re-rendering and showing the loading state, the `fetch()` operation continues in the background. It is not affected by the re-render since it's asynchronous and outside the normal flow of rendering.

6. **Fetch Completes**: Once the `fetch()` operation is complete, it updates the state with the fetched data (`setComments(data)`) and sets `isLoading` to `false`, which triggers another re-render to display the fetched data.

In summary, `setIsLoading(true)` triggers a re-render, and the `fetch()` call is made while the re-render is scheduled but not yet executed. The `useEffect` with an empty dependency array ensures that the fetch operation and the state updates within it are only executed once when the component mounts.