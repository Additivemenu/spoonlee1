import { useState } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

const Parent = () => {
  const [parentState, setParentState] = useState("hello world!");

  return (
    <div>
      <Child1 parentState = {parentState}/>
      <Child2 />
      <button onClick = {() => {setParentState("parent state changed!")}}> change parent state</button>
    </div>
  );
};

export default Parent;
