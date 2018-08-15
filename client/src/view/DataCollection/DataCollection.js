import React, { Component } from "react";
import { connect } from "react-redux";
import { addHistory, gotoStep, fetchRentZestimate } from "../../actions";
import styles from "./DataCollection.css";
import Form from "./SubComp/Form";
import AddressSearchBar from "./SubComp/AddressSearchBar";
import ResultsContainer from "./SubComp/ResultsContainer";
import SendIcon from "@material-ui/icons/Send";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";

const buttonTransitionDuration = {
  enter: 1000,
  exit: 500
};

class DataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO change to signupComp
      stepComp: "resultComp",
      buttonEnabled: false,
      searchTerm: "",
      userData: {}
    };
  }

  handleButtonClick = comp => {
    if (
      this.state.stepComp === "searchComp" ||
      this.state.stepComp === "resultComp"
    ) {
      this.props.fetchRentZestimate(this.state.searchTerm);
      this.props.addHistory(this.state.searchTerm);
      // action
    } else {
      // action
    }
    this.setState({ stepComp: comp, buttonEnabled: false });
  };

  setButtonEnabled = boolean => {
    this.setState({ buttonEnabled: boolean });
  };
  updateUserData = userData => {
    this.setState({ userData });
  };
  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    const { param, data } = this.props.rent;
    return (
      <div className={styles.root}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.sectionTitle}>Data Collection</h1>
          <div className={styles.cardWrapper}>
            {this.state.stepComp === "signUpComp" && (
              <Form
                setButtonEnabled={this.setButtonEnabled}
                updateUserData={this.updateUserData}
              />
            )}
            {(this.state.stepComp === "searchComp" ||
              this.state.stepComp === "resultComp") && (
              <AddressSearchBar
                setButtonEnabled={this.setButtonEnabled}
                updateSearchTerm={this.updateSearchTerm}
              />
            )}
            <Zoom
              key={"btn-1"}
              in={this.state.stepComp === "signUpComp"}
              timeout={buttonTransitionDuration}
              style={{
                position: "absolute",
                bottom: -30,
                right: -30
              }}
              unmountOnExit
            >
              <Button
                //IMPORTANT
                disabled={!this.state.buttonEnabled}
                variant="fab"
                color="primary"
                aria-label="Add"
                onClick={() => this.handleButtonClick("searchComp")}
              >
                <SendIcon />
              </Button>
            </Zoom>
            <Zoom
              key={"btn-2"}
              in={
                this.state.stepComp === "searchComp" ||
                this.state.stepComp === "resultComp"
              }
              timeout={buttonTransitionDuration}
              style={{
                position: "absolute",
                bottom: -30,
                right: -30
              }}
              unmountOnExit
            >
              <Button
                //IMPORTANT
                disabled={!this.state.buttonEnabled}
                variant="fab"
                color="primary"
                aria-label="Add"
                onClick={() => this.handleButtonClick("resultComp")}
              >
                <SearchIcon />
              </Button>
            </Zoom>
          </div>
          <div className={styles.cardWrapper}>
            {this.state.stepComp === "resultComp" && (
              <ResultsContainer rent={data} />
            )}
          </div>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={this.props.fetchRentZestimate}
          >
            Test
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { rent: state.rent };
};
export default connect(
  mapStateToProps,
  { addHistory, gotoStep, fetchRentZestimate }
)(DataCollection);
