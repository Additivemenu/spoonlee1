import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
} from "@xyflow/react";
import { useEffect, useState } from "react";

/**
 * an intermediate node that receives the RGB values and displays the color
 *
 */
function ColorPreview() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

  return (
    <div
      className="node"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      {/* for id = red node, if its value gets changed, also update the color state */}
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => setColor((c) => ({ ...c, r: value }))}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => setColor((c) => ({ ...c, g: value }))}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => setColor((c) => ({ ...c, b: value }))}
      />
    </div>
  );
}
export default ColorPreview;

/**
 * ! A very good practice:
 * a custom handle component that isolates connection states and node data binding.
 * --> react 组件化的思想, 加一个中间层来解耦 (也降低代码重复)
 */
function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: "target",
    id,
  }); // ! get the connections to this handle

  const nodeData = useNodesData(connections?.[0].source); // ! get the data from the source node

  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  );
}
