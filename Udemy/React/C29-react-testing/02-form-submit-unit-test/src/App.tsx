import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FetchForm from "./components/FetchForm";
import AxiosForm from "./components/AxiosForm";
import { RecipeForm } from "./components/RecipeForm";
import { Recipe } from "./components/types";

function App() {
  const saveData = (data: Recipe) => {
    // ! this is to simulate a save operation to a server
    alert(JSON.stringify(data));
  };

  return (
    // <div className="App">
    //   {/* <FetchForm /> */}
    //   {/* <AxiosForm /> */}
    // </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <RecipeForm saveData={saveData} />
    </div>
  );
}

export default App;
