import React, { useState } from "react";
import styles from "./DataDisplay.module.scss";

const DataDisplay = ({ data }) => {
  const [highlightType, setHighlightType] = useState(null);

  const highlightData = (type) => {
    setHighlightType(type);
  };

  return (
    <div>
      {/* control */}
      <button onClick={() => highlightData("A")}>Highlight A</button>
      <button onClick={() => highlightData("B")}>Highlight B</button>

      {/* display */}
      <div className={styles.dataContainer}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`${styles.dataItem} ${
              highlightType === item.type ? `highlight${item.type}` : ""
            }`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
