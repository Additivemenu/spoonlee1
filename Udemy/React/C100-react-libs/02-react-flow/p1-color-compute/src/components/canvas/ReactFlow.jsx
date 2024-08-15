import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NumberInput from "./custom-nodes/NumberInput.jsx";
import ColorPreview from "./custom-nodes/ColorPreview.jsx";
import LightnessNode from "./custom-nodes/LightnessNode.jsx";

/**
 * ! register the custom nodes
 * in custom nodes, we define:
 * 1. how the nodes look like
 * 2. how they process input and output
 *
 * you can consider the custom nodes as the building blocks of the flow
 *  -> pretty similar to a function (handling input and output)
 *
 */
const nodeTypes = {
  NumberInput,
  ColorPreview,
  LightnessNode,
};

/**
 * data props is the magic here
 * type props is to tell react-flow what type of node it is -> we register supported custom nodes in <ReactFlow nodeTypes={nodeTypes} />
 */
const initialNodes = [
  {
    type: "NumberInput",
    id: "1",
    data: { label: "Red", value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: "NumberInput",
    id: "2",
    data: { label: "Green", value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: "NumberInput",
    id: "3",
    data: { label: "Blue", value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: "ColorPreview",
    id: "color",
    position: { x: 150, y: 50 },
    data: { // ! magic here!
      label: "Color",
      value: { r: undefined, g: undefined, b: undefined },
    },
  },
  {
    type: "LightnessNode",
    id: "lightness",
    position: { x: 350, y: 75 },
  },
];

/**
 * the edges are the connections between the nodes
 * the 'source', 'target' should matches the 'id' of the nodes
 */
const initialEdges = [
  {
    id: "1-color",
    source: "1",
    target: "color",
    targetHandle: "red",
  },
  {
    id: "2-color",
    source: "2",
    target: "color",
    targetHandle: "green",
  },
  {
    id: "3-color",
    source: "3",
    target: "color",
    targetHandle: "blue",
  },
  {
    id: "color-lightness",
    source: "color",
    target: "lightness",
  },
];

/**
 *  where we define the nodes and edges of our flow
 *  1. also including how nodes are connected
 *
 *
 * ! A question is:  what events triggers onNodesChange and onEdgesChange, onConnect?
 *
 *
 * @returns
 */

function ReactiveFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}

export default ReactiveFlow;
