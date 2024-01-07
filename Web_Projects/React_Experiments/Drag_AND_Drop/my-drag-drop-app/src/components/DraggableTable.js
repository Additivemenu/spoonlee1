import React, { useState } from "react";
import styles from "./DraggableTable.module.css";

/**
 * @returns  an interactive table that allows user to re-order the columns and rows via DAD
 * TODO: try hierarchical data 
 */
function DraggableTable() {
  const initialColumns = ["ID", "Name", "Email", "Grades"];
  const initialData = [
    {
      name: "Alice Johnson",
      id: "1",
      email: "alice.johnson@example.com",
      grades: "A",
    },
    { name: "Bob Smith", id: "2", email: "bob.smith@example.com", grades: "B" },
    {
      name: "Charlie Davis",
      id: "3",
      email: "charlie.davis@example.com",
      grades: "C",
    },
    // ... more data
  ];

  const [columns, setColumns] = useState(initialColumns); // columns name
  const [data, setData] = useState(initialData); // real data about students

  // column DAD -------
  const [draggedColIndex, setDraggedColIndex] = useState(null);
  const handleDragStart = (index) => {
    setDraggedColIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleColumnDrop = (e, index) => {
    const type = e.dataTransfer.getData("type");

    if (type === "column") {
      const newColumns = [...columns];
      const draggedColumn = newColumns.splice(draggedColIndex, 1)[0];
      newColumns.splice(index, 0, draggedColumn);
      setColumns(newColumns);
      setDraggedColIndex(null);
    } else {
      alert(`unmatched DAD type!`);
    }
  };

  //  row DAD -------
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);

  const handleRowDragStart = (index) => {
    setDraggedRowIndex(index);
  };

  const handleRowDrop = (e, index) => {
    const type = e.dataTransfer.getData("type");

    if (type === "row") {
      const newData = [...data];
      const draggedRow = newData.splice(draggedRowIndex, 1)[0]; // remove dragged row from data
      newData.splice(index, 0, draggedRow); // insert dragged row to new position
      setData(newData);
      setDraggedRowIndex(null);
    } else {
      alert(`unmatched DAD type!`);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.draggableTable}>
        {/*  drag column header to another column header to re-order the column sequence */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("type", "column"); // restrict the DAD to column only (self-defined)
                  handleDragStart(index);
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleColumnDrop(e, index)}
                className={styles.headerCell}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* tbody that only supports column re-ordering via DAD */}
        {/* <tbody>
          {data.map((student, rowIndex) => (
            <tr key={rowIndex} className={styles.dataRow}>
              {columns.map((col, colIndex) => {
                const value = student[col.toLowerCase().replace(/\s+/g, "")]; // ! find student's data field by column name
                return (
                  <td key={colIndex} className={styles.dataCell}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody> */}

        {/*  tbody that supports both column re-ordering and row re-ordering via DAD */}
        <tbody>
          {data.map((student, rowIndex) => (
            <tr
              key={rowIndex}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("type", "row"); // ! restrict the DAD to row only (self-defined)
                handleRowDragStart(rowIndex);
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleRowDrop(e, rowIndex)}
              className={styles.dataRow}
            >
              {columns.map((col, colIndex) => {
                const value = student[col.toLowerCase().replace(/\s+/g, "")]; // ! find student's data field by column name
                return (
                  <td key={colIndex} className={styles.dataCell}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DraggableTable;
