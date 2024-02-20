import React, { createContext, useState, useContext, ReactNode } from "react";

// context type
type PanelContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

// 1. create context
const PanelContext = createContext<PanelContextType | undefined>(undefined);

// 2. context provider
const PanelContextProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0); // ! local state for each panel, independent of other panels

  const value = { count, setCount };

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

export default PanelContextProvider;

// 3. hooks that uses the context
export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
};
