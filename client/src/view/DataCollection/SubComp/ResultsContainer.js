import React from "react";
import styles from "./common.css";
const ResultsContainer = ({ rent }) => {
  console.log("rent", rent);
  return (
    <div className={styles.card}>
      <div>Or you could enter expected rent(monthly)</div>
      {JSON.stringify(rent)}
    </div>
  );
};
export default ResultsContainer;
