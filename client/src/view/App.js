import React, { Component } from "react";
import styles from "./App.css";
import Instruction from "./Instruction";
import History from "./History";
import DataCollection from "./DataCollection";
import ProgressBar from "./ProgressBar";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={`${styles.dataCollection} ${styles.section}`}>
          <DataCollection />
        </div>
      </div>
    );
  }
}

export default App;
