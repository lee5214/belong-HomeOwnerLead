import React, { Component } from "react";
import styles from "./App.css";
import Button from "@material-ui/core/Button";
import Stepper from "../components/Stepper/index";
import Instruction from "../view/Instruction";
import History from "../view/History";
import DataCollection from "../view/DataCollection";
import ProgressBar from "../components/ProgressBar";

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
          <div className={`${styles.progressBar} ${styles.section}`}>
            <ProgressBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
