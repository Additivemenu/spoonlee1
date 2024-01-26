import React, { useState } from 'react';
import './DivTable.css';

const InteractiveDivTable = () => {
    const data = [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
        // ... more data
    ];

    // hooks -----------------------------
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);

    // handler -----------------------------
    const toggleRowSelection = (id) => {
        alert("toggleRowSelection");
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter(rowId => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    const toggleColumnSelection = (columnName) => {
        alert("toggleColumnSelection");
        setSelectedColumns((prevSelectedColumns) =>
            prevSelectedColumns.includes(columnName)
                ? prevSelectedColumns.filter(colName => colName !== columnName)
                : [...prevSelectedColumns, columnName]
        );
    };

    // jsx -----------------------------
    return (
        <div className="divTable">
            {/*  header  */}
            <div className="divTableHeading">
                <div className="divTableRow">
                    {['id', 'name', 'age'].map((columnName) => (
                        <div
                            key={columnName}
                            className={`divTableHead ${selectedColumns.includes(columnName) ? 'selected' : ''}`}
                            onClick={() => toggleColumnSelection(columnName)}
                        >
                            {columnName.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            {/* body */}
            <div className="divTableBody">
                {data.map((row) => (
                    <div
                        key={row.id}
                        className={`divTableRow ${selectedRows.includes(row.id) ? 'selected' : ''}`}
                        onClick={() => toggleRowSelection(row.id)}
                    >
                        <div className="divTableCell">{row.id}</div>
                        <div className="divTableCell">{row.name}</div>
                        <div className="divTableCell">{row.age}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractiveDivTable;
