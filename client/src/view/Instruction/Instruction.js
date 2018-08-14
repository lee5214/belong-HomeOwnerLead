import React from "react";
import Expand from "./Expand";
import styles from "./Instruction.css";
export default () => {
  return (
    <div className={styles.sectionContainer}>
      <h1 className={styles.sectionTitle}>Instruction</h1>
      <Expand />
    </div>
  );
};
