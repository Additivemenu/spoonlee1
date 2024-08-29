import React from "react";
import "./App.css";
import ExcelSheetSplitter from "./components/ExcelSheetSplitter";
import CSVEditor from "./components/CSVEditor";
import ExcelEditor from "./components/ExcelEditor";

function App() {
  return (
    <div className="App">
      <div style={{ border: "solid 1px black", padding: "20px" }}>
        <ExcelSheetSplitter />
      </div>

      <div
        style={{
          border: "solid 1px black",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        <CSVEditor />
      </div>

      <div
        style={{
          border: "solid 1px black",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        <ExcelEditor />
      </div>
    </div>
  );
}

export default App;
