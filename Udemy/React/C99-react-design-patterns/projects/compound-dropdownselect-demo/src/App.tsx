import React, { FunctionComponent } from "react";
import Dropdown from "./components/Dropdown";
import DropdownButton from "./components/DropdownButton";
import DropdownList from "./components/DropdownList";
import DropdownOption from "./components/DropdownOption";

const App: FunctionComponent = () => {
  return (
    <Dropdown>
      <DropdownButton />
      <DropdownList>
        <DropdownOption value="option1">Option 1</DropdownOption>
        <DropdownOption value="option2">Option 2</DropdownOption>
        <DropdownOption value="option3">Option 3</DropdownOption>
      </DropdownList>
    </Dropdown>
  );
};

export default App;
