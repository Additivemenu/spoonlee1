import React, { useState } from "react";

/**
 * just simple ideas, not shown in app
 */
function DraggableTable() {
    const [columns, setColumns] = useState(['Student Name', 'Student ID', 'Email', 'Grades']);
    const [rows, setRows] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', grades: 'A' },
        // ... more rows
    ]);

    const onDragStart = (e, type, index) => {
        e.dataTransfer.setData("drag-type", type);
        e.dataTransfer.setData("index", index);
    };

    const onDropColumn = (e, dropIndex) => {
        const dragType = e.dataTransfer.getData("drag-type");
        const dragIndex = e.dataTransfer.getData("index");

        if (dragType === "column") {
            // Logic to reorder columns
        }
    };

    const onDropRow = (e, dropIndex) => {
        const dragType = e.dataTransfer.getData("drag-type");
        const dragIndex = e.dataTransfer.getData("index");

        if (dragType === "row") {
            // Logic to reorder rows
        }
    };

    // Render table with draggable rows and columns
    // ...
}
