import React, { useState } from "react";
import { usePanelContext } from "../../contexts/PanelContext";

const Panel = ({
  panel,
  activePanelId,
}: {
  panel: { id: number; title: string };
  activePanelId: number;
}) => {
  // const [count, setCount] = useState(0); // ! local state for each panel, independent of other panels

  const { count, setCount } = usePanelContext(); // ! using the context

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        marginBottom: "10px",
        display: activePanelId !== panel.id ? "none" : undefined,
      }}
    >
      <h2>{panel.title}</h2>
      <p>This is the content of {panel.title}</p>

      <p>Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Panel;
