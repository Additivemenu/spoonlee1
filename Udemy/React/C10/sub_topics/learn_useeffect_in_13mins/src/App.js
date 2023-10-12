import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      console.log('remove resize event listener')
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{windowWidth}</>;
}

export default App;
