import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useState } from "react";

/**
 * an intermediate node that receives the RGB values and displays the color
 * 
 * ! the props of this custom node is from the data prop in the initialNodes
 *  @props id: the id of this node instance
 *  @props data: the data of this node instance
 *
 */
function ColorPreview({ id, data }) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className="node"
      style={{
        background: data.value
          ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
          : "rgb(0, 0, 0)",
      }}
    >
      <span>{data.label}</span>
      <span>{data.value.r}, {data.value.g}, {data.value.b}</span>
      {/* for id = red node, if its value gets changed, also update node with id 's data  */}
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, r: value } };
          });
        }}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, g: value } };
          });
        }}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...node.data.value, b: value } };
          });
        }}
      />
      <Handle type="source" position={Position.Right} id="output" />
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
