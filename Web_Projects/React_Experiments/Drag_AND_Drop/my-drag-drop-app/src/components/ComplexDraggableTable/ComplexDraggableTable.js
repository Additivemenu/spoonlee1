import React, { useState } from "react";
import styles from "./ComplexDraggableTable.module.css";

// import { DUMMY_DATA } from "./DUMMY_DATA";
/**
 * @returns  an interactive & hierarchical table that allows user to re-order the columns and rows via DAD
 */
function ComplexDraggableTable() {
  const initialColumns = ["ID", "Name", "Email", "Grades"];
  const initialData = [
    {
      name: "Alice Johnson",
      id: "1",
      email: "alice.johnson@example.com",
      grades: "A",
      className: "class1", // level 2 hierarchical data
      classTier: "tier1", // level 1 hierarchical data
    },
    {
      name: "Bob Smith",
      id: "2",
      email: "bob.smith@example.com",
      grades: "B",
      className: "class1",
      classTier: "tier1",
    },
    {
      name: "Charlie Davis",
      id: "3",
      email: "charlie.davis@example.com",
      grades: "C",
      className: "class2",
      classTier: "tier1",
    },
    {
      name: "David Trump",
      id: "4",
      email: "david.trump@example.com",
      grades: "D",
      className: "class2",
      classTier: "tier1",
    },
    {
      name: "Elena Gilbert",
      id: "5",
      email: "elena.gilbert@example.com",
      grades: "B",
      className: "class3",
      classTier: "tier2",
    },
    // ... more data
  ];



  return (
    <div className={styles.tableContainer}>
      <table className={styles.draggableTable}>
        {/*  drag column header to another column header to re-order the column sequence */}
        <thead></thead>

        {/*  tbody that supports both column re-ordering and row re-ordering via DAD */}
        <tbody>
          <div>
            <tr>
              <th rowspan="4" class="branch-icon">
                brand icon
              </th>
            </tr>
            <tr>
              <td>Rate</td>

              <td class={styles.startTd}>3.45</td>
              <td>3.6</td>
              <td class="highlight">5.5</td>
              <td>5.6</td>

              <td class={styles.startTd}>3.45</td>
              <td>3.6</td>
              <td class="highlight">5.5</td>
              <td>5.6</td>
            </tr>

            <tr>
              <td>WoW Change</td>

              <td class={styles.startTd}>(0.05)</td>
              <td class="negative">-0.02</td>
              <td class="highlight negative">(0.05)</td>
              <td class="negative">(0.05)</td>

              <td class={styles.startTd}>(0.05)</td>
              <td class="negative">-0.02</td>
              <td class="highlight negative">(0.05)</td>
              <td class="negative">(0.05)</td>
            </tr>

            <tr>
              <td>Rank</td>

              <td class={styles.startTd}>2</td>
              <td>2</td>
              <td class="highlight">1</td>
              <td>2</td>

              <td class={styles.startTd}>2</td>
              <td>2</td>
              <td class="highlight">1</td>
              <td>2</td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default ComplexDraggableTable;
