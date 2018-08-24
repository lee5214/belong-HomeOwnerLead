import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import TextMask from "../TextMask";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
import styles from "./SignUp.css";
import ProfileImg from "../../../../assets/ic_profile_firstname@3x.png";
import EmailImg from "../../../../assets/ic_profile_email@3x.png";
import PasswordImg from "../../../../assets/ic_profile_password@3x.png";
import PhoneImg from "../../../../assets/ic_profile_phone@3x.png";
import HeaderContainer from "../../../../components/HeaderContainer";

class UserInputForm extends React.Component {
  state = {
    nameFirst: null,
    nameLast: null,
    email: null,
    email_error: null,
    phone: "",
    phone_error: null,
    textMask: ""
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // handle submit button enable
    const {
      nameFirst,
      nameLast,
      email,
      email_error,
      phone,
      phone_error
    } = this.state;
    // callback sends form data to parent && button enable only when all inputs are valid
    if (
      nameFirst !== prevState.nameFirst ||
      nameLast !== prevState.nameLast ||
      email_error !== prevState.email_error ||
      phone_error !== prevState.phone_error
    ) {
      if (nameFirst && nameLast && email_error === "" && phone_error === "") {
        const data = { nameFirst, nameLast, email, phone };
        this.props.updateUserData(data);
        this.props.setButtonEnabled(true);
      } else {
        this.props.setButtonEnabled(false);
      }
    }
  }

  handlePhoneChange = maskedPhone => {
    const rawPhone = maskedPhone.replace(/[\D]/g, "");
    this.setState({ textMask: maskedPhone, phone: rawPhone });
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.state.email).toLowerCase())) {
      this.setState({
        email_error: ""
      });
    } else {
      this.setState({
        email_error: "email format not correct, please check it again"
      });
    }
  };
  validatePhone = () => {
    if (this.state.phone.length === 10) {
      this.setState({
        phone_error: ""
      });
    } else {
      this.setState({
        phone_error: "10-digit phone number is required, please check it again"
      });
    }
  };

  handleSubmit = () => {
    const {
      nameFirst,
      nameLast,
      email,
      email_error,
      phone,
      phone_error
    } = this.state;

    if (nameFirst && nameLast && email_error === "" && phone_error === "") {
      const data = { nameFirst, nameLast, email, phone };
      this.props.updateUserData(data);
      this.props.gotoStep("searchStep");
    }
  };
  render() {
    return (
      <div>
        <HeaderContainer headerTitle={"Sign Up"} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={styles.block}
        >
          <Grid item xs={1}>
            <img className={styles.iconContainer} src={ProfileImg} />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={this.state.nameFirst === ""}
              id="first-name"
              label="First Name"
              className={styles.textField}
              margin="normal"
              onChange={event =>
                this.setState({ nameFirst: event.target.value })
              }
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={this.state.nameLast === ""}
              id="last-name"
              label="Last Name"
              className={styles.textField}
              margin="normal"
              onChange={event =>
                this.setState({ nameLast: event.target.value })
              }
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          justify="center"
          alignItems="center"
          className={styles.block}
        >
          <Grid item xs={1}>
            <img className={styles.iconContainer} src={EmailImg} />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              error={!!this.state.email_error}
              label="Email"
              type="email"
              margin="normal"
              onChange={event => this.setState({ email: event.target.value })}
              placeholder="a valid email for registration"
              onBlur={this.validateEmail}
              helperText={this.state.email_error}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          justify="center"
          alignItems="center"
          className={styles.block}
        >
          <Grid item xs={1}>
            <img className={styles.iconContainer} src={PhoneImg} />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              error={!!this.state.phone_error}
              label="Phone"
              value={this.state.phone}
              type="phone"
              margin="normal"
              placeholder="a valid phone number for registration"
              onBlur={this.validatePhone}
              helperText={this.state.phone_error}
              InputProps={{
                disableUnderline: true,
                error: !!this.state.phone_error,
                value: this.state.textMask,
                onChange: event => this.handlePhoneChange(event.target.value),
                inputComponent: TextMask
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          justify="center"
          alignItems="center"
          className={styles.block}
        >
          <Grid item xs={4}>
            <span className={styles.warningMsg}>
              By signing up, I agree to Belong's
              <a href={"/terms"}>
                <span>Terms of Service</span>
              </a>
              and
              <a href={"/policy"}>
                <span>Privacy Policy</span>
              </a>
            </span>
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          justify="center"
          alignItems="center"
          className={styles.block}
        >
          <Grid item xs={6}>
            <button className={styles.button} onClick={this.props.handleSignUp}>
              <span className={styles.enterProperty}>ENTER PROPERTY</span>
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserInputForm.propTypes = {
  setButtonEnabled: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired
};

export default UserInputForm;
