import React, { FunctionComponent } from "react";

const DropdownOption: FunctionComponent<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <li className="dropdown-option">{children}</li>;
};

export default DropdownOption;
