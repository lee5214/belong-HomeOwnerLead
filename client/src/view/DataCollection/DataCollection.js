import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveUser,
  addHistory,
  gotoStep,
  fetchRentZestimate,
  fetchIP
} from "../../actions";
import styles from "./DataCollection.css";
import SignUp from "./SubComp/SignUp/SignUp";
import AddressSearchBar from "./SubComp/AddressSearchBar";
import ResultsContainer from "./SubComp/ResultsContainer";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

const buttonTransitionDuration = {
  enter: 1000,
  exit: 500
};

class DataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO change to signUpStep
      stepComp: "signUpStep",
      buttonEnabled: false,
      searchTerm: "",
      userData: {},
      range: null,
      dialogOpen: false,
      expectedNum: null,
      signUpStatus: null
    };
  }
  componentDidMount() {
    if (!this.props.ip) {
      this.props.fetchIP();
    }
    if (this.props.user) {
      this.setState({ stepComp: "searchStep" });
      this.props.gotoStep("searchStep");
    } else {
      this.setState({ stepComp: "signUpStep" });
      this.props.gotoStep("signUpStep");
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.rentData && this.props.rentData !== prevProps.rentData) {
      this.setState({ stepComp: "resultStep" });
      this.props.gotoStep("resultStep");
    }
  }

  handleSignUp = step => {
    this.props.gotoStep(step);
    this.props.saveUser(this.state.userData);
  };

  handleButtonClick = step => {
    this.props.gotoStep(step);
    if (step === "searchStep") {
      this.props.saveUser(this.state.userData);
    }
    if (step === "resultStep") {
      this.props.fetchRentZestimate(this.state.searchTerm);
      this.props.addHistory(this.state.searchTerm);
    }
    this.setState({ stepComp: step, buttonEnabled: false });
  };

  handleDialogOpen = truefalse => {
    this.setState({ dialogOpen: truefalse });
  };
  handleSubmit = () => {
    const { nameFirst, phone, email } = this.state.userData;
    const ip = this.props.ip || "0.0.0.0";
    const text = `
    Thank you for sign up
    name: ${nameFirst} 
    phone: ${phone} 
    email: ${email} 
    address: ${this.state.searchTerm} 
    range: ${this.state.range} 
    expected rent: ${this.state.expectedNum}`;
    const html = `
    <p>name: ${nameFirst}</p> 
    <p>phone: ${phone}</p> 
    <p>email: ${email}</p> 
    <p>address: ${this.state.searchTerm}</p>
    <p>IP: ${ip}</p> 
    <p>range: ${this.state.range}</p> 
    <p>expected rent: ${this.state.expectedNum}</p>
    `;
    const param = {
      to: this.state.userData.email,
      from: "cong-li@cong-li.com",
      subject: "Thank you for sign up, here is your info",
      text,
      html
    };
    axios
      .post("/email", param)
      .then(res => {
        this.setState({ signUpStatus: true });
      })
      .catch(error => {
        this.setState({ signUpStatus: false });
      });
    this.props.gotoStep("submitStep");
    this.setState({ stepComp: "searchStep" });
    this.handleDialogOpen(false);
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
  updateRange = (low, high) => {
    this.setState({ range: `${low} - ${high}` });
  };

  render() {
    return (
      <div className={styles.root}>
        <span className={styles.bottomDivider} />
        <div className={styles.cardWrapper} style={{ zIndex: 1 }}>
          {this.state.stepComp === "signUpStep" && (
            <SignUp
              setButtonEnabled={this.setButtonEnabled}
              updateUserData={this.updateUserData}
              handleSignUp={this.handleSignUp}
            />
          )}
          {(this.state.stepComp === "searchStep" ||
            this.state.stepComp === "resultStep" ||
            this.state.stepComp === "submitStep") && (
            <AddressSearchBar
              setButtonEnabled={this.setButtonEnabled}
              updateSearchTerm={this.updateSearchTerm}
            />
          )}
          <Zoom
            key={"btn-1"}
            in={this.state.stepComp === "signUpStep"}
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
              onClick={() => this.handleButtonClick("searchStep")}
            >
              <SendIcon />
            </Button>
          </Zoom>
          <Zoom
            key={"btn-2"}
            in={
              this.state.stepComp === "searchStep" ||
              this.state.stepComp === "resultStep" ||
              this.state.stepComp === "submitStep"
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
              onClick={() => this.handleButtonClick("resultStep")}
            >
              <SearchIcon />
            </Button>
          </Zoom>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { rentData: state.rentData, user: state.user, ip: state.ip };
};
export default connect(
  mapStateToProps,
  { saveUser, addHistory, gotoStep, fetchRentZestimate, fetchIP }
)(DataCollection);
