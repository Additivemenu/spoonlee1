import { useState, useEffect } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

function LightnessNode({ id }) {
  const { updateNodeData } = useReactFlow();

  const connections = useHandleConnections({ type: "target" }); // get all connections of the "target" type handles
  const nodesData = useNodesData(connections?.[0].source); // we just have one connection here so we hard coded

  const [lightness, setLightness] = useState("dark");  // a derived state that depends on source node's data to this node

  useEffect(() => {
    if (nodesData?.data) {
      const color = nodesData.data.value;
      const isLight =
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
      setLightness(isLight ? "light" : "dark");

      const newNodeData = isLight
        ? { light: color, dark: null }
        : { light: null, dark: color };
      updateNodeData(id, newNodeData);   // update data of this node instance
    } else {
      setLightness("dark");
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
    }
  }, [nodesData, updateNodeData]);

  return (
    <div
      className="lightness-node"
      style={{
        background: lightness === "light" ? "white" : "black",
        color: lightness === "light" ? "black" : "white",
      }}
    >
      <Handle type="target" position={Position.Left} />

      <p style={{ marginRight: 10 }}>Light</p>
      <Handle
        type="source"
        id="light"
        position={Position.Right}
        style={{ top: 25 }}
      />
      <p style={{ marginRight: 10 }}>Dark</p>
      <Handle
        type="source"
        id="dark"
        position={Position.Right}
        style={{ top: 75 }}
      />
    </div>
  );
}

export default LightnessNode;
