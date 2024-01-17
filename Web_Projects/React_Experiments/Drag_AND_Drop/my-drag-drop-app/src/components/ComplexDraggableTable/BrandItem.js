import React from "react";

import styles from "./BrandItem.module.css";
import ImageComponent from "./ImageComponent";

const BrandItem = () => {
  return (
    <tbody
      onClick={() => {
        alert("you got me!");
      }}
      className={styles.brandItemBody}
    >
      <tr>
        <td rowSpan="4" style={{ padding: 0, width: "150px" }}>
          <ImageComponent
            imageUrl="https://i.nextmedia.com.au/News/nab.jpg" // Replace with your image URL
            width="150px" // Set your desired width
          />
        </td>
      </tr>

      <tr>
        <td style={{ width: "150px" }}>Rate</td>

        <td className={styles.startTd}>3.45</td>
        <td>3.6</td>
        <td className="highlight" style={{backgroundColor: "yellow"}}>5.5</td>
        <td>5.6</td>

        <td className={styles.startTd}>3.45</td>
        <td>3.6</td>
        <td className="highlight">5.5</td>
        <td>5.6</td>
      </tr>

      <tr>
        <td>WoW Change</td>

        <td className={styles.startTd}>(0.05)</td>
        <td className="negative">-0.02</td>
        <td className="highlight negative">(0.05)</td>
        <td className="negative">(0.05)</td>

        <td className={styles.startTd}>(0.05)</td>
        <td className="negative">-0.02</td>
        <td className="highlight negative">(0.05)</td>
        <td className="negative">(0.05)</td>
      </tr>

      <tr>
        <td>Rank</td>

        <td className={styles.startTd}>2</td>
        <td>2</td>
        <td className="highlight">1</td>
        <td>2</td>

        <td className={styles.startTd}>2</td>
        <td>2</td>
        <td className="highlight">1</td>
        <td>2</td>
      </tr>
    </tbody>
  );
};

export default BrandItem;
