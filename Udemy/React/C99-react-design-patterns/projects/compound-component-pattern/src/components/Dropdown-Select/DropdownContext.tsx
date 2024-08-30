import { createContext, useContext } from "react";

interface IDropdownContext {
  isOpen: boolean;
  toggle: () => void;
}

export const DropdownContext = createContext<IDropdownContext | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider"
    );
  }
  return context;
};
