import React, { useState } from "react";

/**
 * drag and drop to re-order the squares with a number:
 *  essentially, it's doing manipulation over an array by drag and drop
 * @returns
 */
function DraggableGrid() {
  // hooks --------------------------------
  const initialSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [squares, setSquares] = useState(initialSquares);

  // handlers ----------------------------
  /**
   * @param {*} e: drag start event object
   * @param {*} position: index of the square in the squares array
   */
  const handleDragStart = (e, position) => {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    e.dataTransfer.setData("text/plain", position);
  };

  /**
   * @param {*} e
   * @param {*} position : new position
   */
  const handleDrop = (e, position) => {
    const originalPosition = e.dataTransfer.getData("text/plain");
    const newSquares = [...squares]; // ! make a copy of the squares array
    const [item] = newSquares.splice(originalPosition, 1); //  remove the item from the original position
    newSquares.splice(position, 0, item); // insert (add) the item to the new position
    setSquares(newSquares);
  };

  const handleDragOver = (e) => {
    // ! this is to allow dropping
    e.preventDefault();
  };

  // jsx ---------------------------------
  //  ! note how drag and drop event handler is bound to different element
  // e.g. user drag square 4 and drop it to square 9:
  // the input to handleDragStart is e and index of square 4
  // while input to handleDrop is e and index of square 9
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 50px)",
        gap: "10px",
      }}
    >
      {squares.map((number, index) => (
        <div
          key={number}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "skyblue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

export default DraggableGrid;
