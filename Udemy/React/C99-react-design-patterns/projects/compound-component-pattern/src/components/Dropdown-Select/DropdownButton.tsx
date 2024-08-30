import React, { FunctionComponent } from "react";
import { useDropdownContext } from "./DropdownContext";

const DropdownButton: FunctionComponent = () => {
  const { toggle } = useDropdownContext();
  return (
    <button onClick={toggle} className="dropdown-button">
      Toggle Dropdown
    </button>
  );
};

export default DropdownButton;
