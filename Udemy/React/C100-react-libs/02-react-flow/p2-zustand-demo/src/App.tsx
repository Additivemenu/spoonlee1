import React from "react";
import { useShallow } from "zustand/react/shallow";
import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import useStore from "./stores/store";
import ColorChooserNode from "./components/ColorChooserNode";

const nodeTypes = { colorChooser: ColorChooserNode };

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

/**
 *  a very simple but classic way to use zustand with react flow
 *  https://reactflow.dev/learn/advanced-use/state-management
 *
 */
function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );

  return (
    <div
      style={{ width: "1200px", height: "600px", border: "solid black 1px" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}

export default Flow;
