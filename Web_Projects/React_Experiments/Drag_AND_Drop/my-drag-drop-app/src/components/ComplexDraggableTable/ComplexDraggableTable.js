import React, { useState } from "react";
import styles from "./ComplexDraggableTable.module.css";
import BrandItem from "./BrandItem";
import BrandGroup from "./BrandGroup";

// import { DUMMY_DATA } from "./DUMMY_DATA";
/**
 * @returns  an interactive & hierarchical table that allows user to re-order the columns and rows via DAD
 */
function ComplexDraggableTable() {
  return (
    <div className={styles.tableContainer}>
      {/* ---------------- header ------------------ */}
      <table className={styles.draggableTable}>
        {/* column selection */}
        <colgroup>
          <col span="4" />
          <col span="1" style={{ backgroundColor: "#D6EEEE" }} />
          <col span="2" />
          <col span="1" style={{ backgroundColor: "#D6EEEE"}} />
        </colgroup>

        <thead>
          {/* 1 */}
          <tr>
            <th colSpan="2" rowSpan="4" style={{ position: "relative" }}>
              <span
                style={{ position: "absolute", right: "20px", top: "20px" }}
              >
                Product
              </span>
              <span
                style={{ position: "absolute", left: "20px", bottom: "20px" }}
              >
                brand
              </span>
            </th>
          </tr>
          {/* 2 */}
          <tr>
            <th colSpan="4">variable</th>
            <th colSpan="4">fixed</th>
          </tr>
          {/* 3 */}
          <tr>
            <th colSpan="2"></th>
            <th colSpan="2">
              <span>Offset</span>
            </th>
            <th colSpan="4"></th>
          </tr>
          {/* 4 */}
          <tr>
            <td>Intro</td>
            <td>Basic</td>
            <td>non-package</td>
            <td>package</td>
            <td>1 year</td>
            <td>2 year</td>
            <td>3 year</td>
            <td>4 year</td>
          </tr>
        </thead>

        {/* ------------------ table content ------------------ */}
        {/* TODO: add a filter state as props to pass down each group */}

        <BrandGroup title="Major Banks" itemCount={1} />

        <BrandGroup title="Regional Banks" itemCount={2} />

        <BrandGroup title="Online Banks" itemCount={3} />
      </table>
    </div>
  );
}

export default ComplexDraggableTable;
