import React, { useState, createContext, useContext } from "react";

// create and useContext hook to access the context
interface DataContextType {
  activeTabID: string;
  setActiveTabID: React.Dispatch<React.SetStateAction<string>>;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

// compound components ==================================================================================
// parent component that holds the context --------------------------------------------------------------
function TabSwitcher(props: { children: React.ReactNode }) {
  const [activeTabID, setActiveTabID] = useState("a");
  //since this component will provide data to the child components, we will use DataContext.Provider
  return (
    <DataContext.Provider value={{ activeTabID, setActiveTabID }}>
      {props.children}
    </DataContext.Provider>
  );
}

// child comp1 ------------------------------------------------------------------------------------------
interface TabProps {
  id: string;
  children: React.ReactNode;
}
function Tab({ id, children }: TabProps) {
  //extract the 'setActiveTabID` method from the DataContext state.
  const { setActiveTabID } = useDataContext();
  return (
    <div>
      <div onClick={() => setActiveTabID(id)}>{children}</div>
    </div>
  );
}

// child comp2 ------------------------------------------------------------------------------------------
interface TabPanelProps {
  whenActive: string;
  children: React.ReactNode;
}
function TabPanel({ whenActive, children }: TabPanelProps) {
  //get the 'activeTabID' state from DataContext.
  const { activeTabID } = useDataContext();
  return <div>{activeTabID === whenActive ? children : null}</div>;
}

export default TabSwitcher;
export { Tab, TabPanel };
