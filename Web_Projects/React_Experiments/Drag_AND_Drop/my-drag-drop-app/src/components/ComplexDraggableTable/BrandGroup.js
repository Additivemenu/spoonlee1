import React from "react";
import BrandItem from "./BrandItem"; // Assuming BrandItem is a separate component

import styles from "./BrandGroup.module.css";

const BrandGroup = ({ title, itemCount }) => {
  return (
    <>
      <thead
        className={styles.providerGroupTitle}
        onClick={() => alert(`You got the ${title} group!`)}
      >
        <tr>
          <td colSpan="10">{title}</td>
        </tr>
      </thead>

      {Array.from({ length: itemCount }, (_, index) => (
        <BrandItem key={index} />
      ))}
    </>
  );
};

export default BrandGroup;
