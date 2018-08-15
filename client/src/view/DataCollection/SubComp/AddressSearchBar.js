import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import LocationOn from "@material-ui/icons/LocationOn";
import styles from "./common.css";

const errorBox = {
  ZERO_RESULTS: "Couldn't find any related addresses, please try another",
  INVALID_REQUEST:
    "This request is not valid, it needs to be a string of your location"
};
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", address_error: null };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.address !== prevState.address ||
      this.state.address_error !== prevState.address_error
    ) {
      //TODO
      // callback sends address to parent && button enable only when input is a valid address
      if (this.state.address !== "" && this.state.address_error === "") {
        this.props.setButtonEnabled(true);
        this.props.updateSearchTerm(this.state.address);
      } else {
        this.props.setButtonEnabled(false);
      }
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log(results, address);
        this.setState({ address, address_error: "" });
      })
      .then(latLng => console.log("Success", latLng))
      .catch(error => {
        // create an error handler to display different kinds of error messages
        this.setState({ address_error: errorBox[error] || error });
        console.error("Error", error);
      });
  };

  render() {
    return (
      <div className={styles.card}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn style={{ padding: 3, fill: "red" }} />
                    </InputAdornment>
                  )
                }}
                error={!!this.state.address_error}
                helperText={this.state.address_error}
                {...getInputProps({
                  placeholder: "Input your location"
                })}
              />
              <div style={{ position: "absolute" }}>
                {loading && (
                  <LocationOn
                    style={{ padding: 5, marginRight: 7, fill: "tomato" }}
                  />
                )}
                {suggestions.map(suggestion => {
                  const style = suggestion.active
                    ? {
                        display: "flex",
                        padding: ".4rem 0rem",
                        backgroundColor: "#5f5f5f",
                        cursor: "pointer",
                        color: "white"
                      }
                    : {
                        display: "flex",
                        padding: ".4rem 0rem",
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        color: "black"
                      };
                  return (
                    <List
                      {...getSuggestionItemProps(suggestion, {
                        style
                      })}
                    >
                      <LocationOn
                        style={{ padding: 5, marginRight: 7, fill: "tomato" }}
                      />
                      <span>{suggestion.description}</span>
                    </List>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default LocationSearchInput;
