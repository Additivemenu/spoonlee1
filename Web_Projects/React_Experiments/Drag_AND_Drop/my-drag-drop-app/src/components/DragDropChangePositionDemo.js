import React, { useState } from "react";

/**
 * a classic drag-and-drop demo: 
 * drag the blue square to change its position in the drop target area
 * 
 * @returns 
 */
function DragDropChangePositionDemo() {
  // hooks --------------------------------
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // handlers ----------------------------
  // process of drag & drop: drag start -> drag over (consistently fired) -> drop
  // ! The dragstart event is fired when the user starts dragging an element or text selection.
  const handleDragStart = (e) => {
    // Calculate the mouse position relative to the draggable element
    const rect = e.target.getBoundingClientRect();
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      })
    );
    console.log(`drag start`);
  };

  // ! In drag-and-drop scenarios, the dragover event is continuously fired as the mouse drags over a potential drop target
  const handleDragOver = (e) => {
    // e is a drag event object
    e.preventDefault(); // ! In the context of drag and drop event, the default browser behavior is often to not allow dropping.
    console.log(`drag over`);
  };

  // ! The drop event is fired when an element or text selection is dropped on a valid drop target.
  const handleDrop = (e) => {
    e.preventDefault();
    // Get the offset from the dataTransfer object
    const offset = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Calculate the new position
    const newPosition = {
      x: e.clientX - offset.offsetX,
      y: e.clientY - offset.offsetY,
    };

    setPosition(newPosition);

    console.log(`drop`);
  };

  // jsx ---------------------------------
  // ! notice drag & drop event handler is bound to different element
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "100%",
        height: "300px",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          cursor: "move",
        }}
      >
        Drag me
      </div>
    </div>
  );
}

export default DragDropChangePositionDemo;
