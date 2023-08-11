// Whiteboard.js
import React, { useRef, useState } from "react";

function Whiteboard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [shape, setShape] = useState("circle");
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // onMouseDown
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setDrawing(true);

    if (shape === "circle") {
      console.log("start drawing a circle");

      ctx.beginPath();
      ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 50, 0, Math.PI * 2);
      ctx.stroke();

      setDrawing(false);
    } else if (shape === "rectangle") {
      console.log("start drawing a rectangle");

      ctx.beginPath(); // This starts a new path.
      ctx.rect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 100, 50);
      ctx.stroke(); // renders the shape onto the canvas with a stroke (outline).

      setDrawing(false);
    } else if (shape === "line") {
      console.log("start drawing a line");

      setStartPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    } else {
      console.log("invalid shape!");
    }
  };

  // onMouseUp
  const drawLine = (e) => {
    if (!drawing) return;   // use drawing state to differentiate if a shape is click to finish or drag to finish

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

    setDrawing(false); // stop drawing after line is made
  };

  return (
    <div>
      <button onClick={() => setShape("circle")}>Circle</button>
      <button onClick={() => setShape("rectangle")}>Rectangle</button>
      <button onClick={() => setShape("line")}>Line</button>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing} //event
        onMouseUp={drawLine} // Add this line
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}

export default Whiteboard;
