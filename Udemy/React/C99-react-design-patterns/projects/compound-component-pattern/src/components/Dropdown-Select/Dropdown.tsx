import React, { useState, FunctionComponent, ReactNode } from "react";
import { DropdownContext } from "./DropdownContext";
// import "./DropdownStyles.css";

const Dropdown: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
