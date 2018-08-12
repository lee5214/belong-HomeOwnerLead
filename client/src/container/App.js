import React, { Component } from "react";
import styles from "./App.css";
import Button from "@material-ui/core/Button";
import Stepper from "../components/Stepper/index";
import Instruction from "../components/Instruction";
import History from "../components/History";
import DataCollection from "../components/DataCollection";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.row}>
          <div className={`${styles.instruction} ${styles.section}`}>
            <Instruction />
          </div>
          <div className={`${styles.history} ${styles.section}`}>
            <History />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.dataCollection} ${styles.section}`}>
            <DataCollection />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
