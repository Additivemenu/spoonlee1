import React, { FunctionComponent } from "react";
import { useDropdownContext } from "./DropdownContext";

type DropdownListProps = {
  children: React.ReactNode;
};

const DropdownList: FunctionComponent<DropdownListProps> = ({ children }) => {
  const { isOpen } = useDropdownContext();
  return isOpen ? <ul className="dropdown-list">{children}</ul> : null;
};

export default DropdownList;
