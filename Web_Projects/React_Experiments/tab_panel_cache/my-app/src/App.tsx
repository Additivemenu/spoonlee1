import React, { useState } from "react";
import Panel from "./components/Panel/Panel";
import WrappedPanel from "./components/Panel/WrappedPanel";

function App() {
  // State to hold the list of panels
  const [panels, setPanels] = useState([
    { id: 1, title: "Panel 1" },
    { id: 2, title: "Panel 2" },
    { id: 3, title: "Panel 3" },
  ]);

  // State to track the current active panel
  const [activePanelId, setActivePanelId] = useState(1);

  // Function to change the active panel
  const switchPanel = (panelId: number) => {
    setActivePanelId(panelId);
  };

  const handleAddNewPanel = () => {
    const newPanel = {
      id: panels.length + 1,
      title: `Panel ${panels.length + 1}`,
    };
    setPanels([...panels, newPanel]);
  }

  return (
    <div className="App">
      <h1>Panel Navigator Demo</h1>

      <button onClick={handleAddNewPanel}>Add New Panel</button>

      {/* tabs buttons */}
      <div>
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => switchPanel(panel.id)}
            style={{ marginRight: "10px" }}
          >
            {panel.title}
          </button>
        ))}
      </div>

      {/*  panel */}
      {/* {activePanel && <Panel title={activePanel.title} />}
      {activePanel && <Panel title={activePanel.title} />}
      {activePanel && <Panel title={activePanel.title} />} */}

      {panels.map((panel) => (
        <WrappedPanel key={panel.id} panel={panel} activePanelId={activePanelId} />
      ))}
      {/* TODO: having multiple Panels and unhidden on activePanel */}
    </div>
  );
}

export default App;
