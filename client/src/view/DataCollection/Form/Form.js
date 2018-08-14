import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextMask from "./TextMask";
import MaskedInput from "react-text-mask";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import styles from "./Form.css";

/*const styles = theme => ({
 root: {
 display: "flex",
 flexWrap: "wrap"
 },
 margin: {
 margin: theme.spacing.unit
 },
 withoutLabel: {
 marginTop: theme.spacing.unit * 3
 },
 textField: {
 flexBasis: 200
 }
 });*/

const ranges = [
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];

class InputAdornments extends React.Component {
  state = {
    nameFirst: null,
    nameLast: null,
    email: "",
    email_error: null,
    phone: "",
    phone_error: null,
    textMask: "(  )    -    ",

    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
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
    if (
      nameFirst !== prevState.nameFirst ||
      nameLast !== prevState.nameLast ||
      email_error !== prevState.email_error ||
      phone_error !== prevState.phone_error
    ) {
      if (nameFirst && nameLast && email_error === "" && phone_error === "") {
        this.props.setButtonEnabled(true);
      } else {
        this.props.setButtonEnabled(false);
      }
    }
    /*if (
      this.state.email_error !== prevState.email_error &&
      this.state.email_error !== ""
    ) {
      this.props.setButtonEnabled(false);
    }*/
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

  render() {
    console.log(this.state);
    return (
      <div className={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexBasis: 100
          }}
        >
          <AccountCircle style={{ width: 20, margin: "auto 10" }} />
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-between"
            }}
          >
            <div style={{ width: "45%" }}>
              <TextField
                error={this.state.nameFirst === ""}
                id="first-name"
                label="First Name"
                className={styles.textField}
                margin="normal"
                onChange={event =>
                  this.setState({ nameFirst: event.target.value })
                }
              />
            </div>
            <div style={{ width: "45%" }}>
              <TextField
                error={this.state.nameLast === ""}
                id="last-name"
                label="Last Name"
                className={styles.textField}
                margin="normal"
                onChange={event =>
                  this.setState({ nameLast: event.target.value })
                }
              />
            </div>
          </div>
        </div>
        {/*Email*/}
        <div
          style={{
            display: "flex",
            flexBasis: 100
          }}
        >
          <Email style={{ width: 20, margin: "auto 10" }} />
          <TextField
            fullWidth
            error={!!this.state.email_error}
            label="Email"
            //className={styles.textField}
            type="email"
            margin="normal"
            onChange={event => this.setState({ email: event.target.value })}
            placeholder="a valid email for registration"
            onBlur={this.validateEmail}
            helperText={this.state.email_error}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexBasis: 100
          }}
        >
          <Phone style={{ width: 20, margin: "auto 10" }} />
          <TextField
            fullWidth
            error={!!this.state.phone_error}
            label="Phone"
            //className={styles.textField}
            type="phone"
            margin="normal"
            //onChange={event => this.setState({ phone: event.target.value })}
            placeholder="a valid phone number for registration"
            onBlur={this.validatePhone}
            helperText={this.state.phone_error}
            InputProps={{
              error: !!this.state.phone_error,
              value: this.state.textMask,
              onChange: event => this.handlePhoneChange(event.target.value),
              inputComponent: TextMask
            }}
          />
        </div>

        {/*<TextField
           label="First"
           id="simple-start-adornment"
           className={classNames(classes.margin, classes.textField)}
           InputProps={{
           startAdornment: <InputAdornment position="start">Kg</InputAdornment>
           }}
           />
           <FormControl
           className={classNames(
           classes.margin,
           classes.withoutLabel,
           classes.textField
           )}
           aria-describedby="weight-helper-text"
           >
           <Input
           id="adornment-weight"
           value={this.state.weight}
           onChange={this.handleChange("weight")}
           endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
           inputProps={{
           "aria-label": "Weight"
           }}
           />
           <FormHelperText id="weight-helper-text">Weight</FormHelperText>
           </FormControl>
           <FormControl className={classNames(classes.margin, classes.textField)}>
           <InputLabel htmlFor="adornment-password">Password</InputLabel>
           <Input
           id="adornment-password"
           type={this.state.showPassword ? "text" : "password"}
           value={this.state.password}
           onChange={this.handleChange("password")}
           endAdornment={
           <InputAdornment position="end">
           <IconButton
           aria-label="Toggle password visibility"
           onClick={this.handleClickShowPassword}
           onMouseDown={this.handleMouseDownPassword}
           >
           {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
           </IconButton>
           </InputAdornment>
           }
           />
           </FormControl>*/}
      </div>
    );
  }
}

InputAdornments.propTypes = {
  //classes: PropTypes.object.isRequired
  setButtonEnabled: PropTypes.func.isRequired
};
InputAdornments.defaultProps = {
  //setButtonEnabled:
};
export default InputAdornments;
