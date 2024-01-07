import React, { useState } from "react";
import styles from './DraggableTable.module.css';

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
  const [draggedColIndex, setDraggedColIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedColIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const newColumns = [...columns];
    const draggedColumn = newColumns.splice(draggedColIndex, 1)[0];
    newColumns.splice(index, 0, draggedColumn);
    setColumns(newColumns);
    setDraggedColIndex(null);
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
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={styles.headerCell}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((student, rowIndex) => (
            <tr key={rowIndex} className={styles.dataRow}>
              {columns.map((col, colIndex) => {
                const value = student[col.toLowerCase().replace(/\s+/g, "")]; // ! find student's data field by column name
                return <td key={colIndex} className={styles.dataCell}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DraggableTable;
