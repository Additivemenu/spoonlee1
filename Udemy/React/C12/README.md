React optimization & behind the scenes

# How does React work behind the scenes







## Introduction



:pencil: [React vs React DOM](./sub_topics/React_vs_ReactDOM.md)

+ React => blueprint of a house, React DOM or React Native=> construction crew 

+ Re-evaluation of component !== re-rendering the real DOM

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











