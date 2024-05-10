import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FetchForm from "./components/FetchForm";
import AxiosForm from "./components/AxiosForm";

function App() {
  return (
    <div className="App">
      {/* <FetchForm /> */}
      <AxiosForm />
    </div>
  );
}

export default App;
