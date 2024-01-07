import React, { useState } from 'react';

function DragDropDemo() {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    // You can calculate and set the new position of the element here
  };

  return (
    <div 
      onDragOver={handleDragOver} 
      onDrop={handleDrop} 
      style={{ width: '100%', height: '300px', border: '1px solid black' }}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: dragging ? 'red' : 'blue',
          cursor: 'move'
        }}
      >
        Drag me
      </div>
    </div>
  );
}

export default DragDropDemo;
