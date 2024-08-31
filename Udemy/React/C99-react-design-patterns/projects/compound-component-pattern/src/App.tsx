import React, { FunctionComponent } from "react";
import Dropdown from "./components/Dropdown-Select/Dropdown";
import DropdownButton from "./components/Dropdown-Select/DropdownButton";
import DropdownList from "./components/Dropdown-Select/DropdownList";
import DropdownOption from "./components/Dropdown-Select/DropdownOption";
import "./App.css";
import CheckboxCardsDemo from "./components/CheckboxCards-Select";
import MultiSelectPage from "./components/Multi-Select/page";

const App: FunctionComponent = () => {
  return (
    <div
      className="App"
      style={{ margin: "20px", display: "flex", flexDirection: "column" }}
    >
      <div style={{ border: "1px solid black" }}>
        <Dropdown>
          <DropdownButton />
          <DropdownList>
            <DropdownOption value="option1">Option 1</DropdownOption>
            <DropdownOption value="option2">Option 2</DropdownOption>
            <DropdownOption value="option3">Option 3</DropdownOption>
          </DropdownList>
        </Dropdown>
      </div>

      <div style={{ border: "1px solid black", marginTop: "40px" }}>
        <CheckboxCardsDemo />
      </div>

      <div style={{ border: "1px solid black", marginTop: "40px" }}>
        <MultiSelectPage />
      </div>
    </div>
  );
};

export default App;
