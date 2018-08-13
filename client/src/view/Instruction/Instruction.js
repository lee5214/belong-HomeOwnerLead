import React from "react";
import Steps from "./Steps";
import styles from "./Instruction.css";
export default () => {
  return (
    <div className={styles.sectionContainer}>
      <h1 className={styles.sectionTitle}>Instruction</h1> <Steps />{" "}
    </div>
  );
};
