import React, { Component } from "react";
import Form from "./Form/Form";
import { connect } from "react-redux";
import { addHistory } from "../../actions";
import styles from "./DataCollection.css";
import AddIcon from "../../../node_modules/@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";

const buttonProps = [
  {
    color: "red",
    icon: <AddIcon />
  },
  {
    color: "blue",
    icon: <AddIcon />
  }
];
const buttonTransitionDuration = {
  enter: 1000,
  exit: 500
};

class DataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      buttonEnabled: false,
      userData: {}
    };
  }

  handleButtonClick = step => {
    console.log(step);
    if (step === 1) {
      this.setState({ stepIndex: 0 });
    } else {
      this.setState({ stepIndex: step + 1 });
    }
  };

  setButtonEnabled = boolean => {
    this.setState({ buttonEnabled: boolean });
  };
  updateUserData = data => {
    this.setState({ userData: data });
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.sectionTitle}>Data Collection</h1>
          <div
            style={{
              position: "relative",
              maxHeight: 500
              //maxWidth: 600
            }}
          >
            <Form
              //addHistory={this.props.addHistory}
              setButtonEnabled={this.setButtonEnabled}
              updateUserData={this.updateUserData}
            />

            {buttonProps.map((btn, index) => (
              <Zoom
                key={btn.color}
                in={this.state.stepIndex === index}
                timeout={buttonTransitionDuration}
                style={{
                  transitionDelay: `${
                    this.state.value === index
                      ? buttonTransitionDuration.exit
                      : 0
                  }ms`,
                  position: "absolute",
                  bottom: -30,
                  right: -30
                }}
                unmountOnExit
              >
                <Button
                  disabled={!this.state.buttonEnabled}
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  //style={{ right: -30, bottom: -30 }}
                  //className={btn.className}
                  //color={btn.color}
                  onClick={() => this.handleButtonClick(this.state.stepIndex)}
                >
                  {btn.icon}
                </Button>
              </Zoom>
            ))}
          </div>
        </div>
        {/*<Button
          variant="fab"
          color="primary"
          aria-label="Add"
          //className={classes.button}
        >
          <AddIcon />
        </Button>*/}
      </div>
    );
  }
}
export default connect(
  null,
  { addHistory }
)(DataCollection);
