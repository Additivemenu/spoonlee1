import logo from "./logo.svg";
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
