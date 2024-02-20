import React from "react";
import PanelContextProvider from "../../contexts/PanelContext";
import Panel from "./Panel";

const WrappedPanel = ({
  panel,
  activePanelId,
}: {
  panel: { id: number; title: string };
  activePanelId: number;
}) => {
  return (
    <PanelContextProvider>
      <Panel panel={panel} activePanelId={activePanelId} />
    </PanelContextProvider>
  );
};

export default WrappedPanel;
