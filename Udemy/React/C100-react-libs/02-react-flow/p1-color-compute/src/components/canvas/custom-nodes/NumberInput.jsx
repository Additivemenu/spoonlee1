import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

/**
 * the input node to receive user input for a number as RGB value
 */

function NumberInput({ id, data }) {
  // we encapsulate this hook in a custom hook in our product 
  const { updateNodeData } = useReactFlow();  // ! a core hook from react-flow to update the node data

  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.min(255, Math.max(0, evt.target.value));
    setNumber(cappedNumber);    // ! for visual update UI 

    updateNodeData(id, { value: cappedNumber });  // ! for internally updating the data
  }, []);

  return (
    <div className="number-input">
      <div>{data.label}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
