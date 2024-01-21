import React from 'react';
import './DivTable.css';

const DivTable = () => {
    const data = [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
        // Add more data as needed
    ];

    return (
        <div className="divTable">
            <div className="divTableHeading">
                <div className="divTableRow">
                    <div className="divTableHead">ID</div>
                    <div className="divTableHead">Name</div>
                    <div className="divTableHead">Age</div>
                </div>
            </div>
            <div className="divTableBody">
                {data.map((row) => (
                    <div key={row.id} className="divTableRow">
                        <div className="divTableCell">{row.id}</div>
                        <div className="divTableCell">{row.name}</div>
                        <div className="divTableCell">{row.age}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DivTable;