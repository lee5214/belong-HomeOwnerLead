import React, { Component } from "react";
import styles from "./History.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

class History extends Component {
  render() {
    console.log("history add", this.props.history);
    const { history } = this.props;
    return (
      <div className={styles.sectionContainer} style={{ background: "white" }}>
        <h1 className={styles.sectionTitle}>History</h1>

        {this.props.history.map(item => (
          <List className={styles.listContainer} key={item}>
            <ListItem button key={`item-${item}-${item}`}>
              <ListItemText primary={`${item}`} />
            </ListItem>
          </List>
        ))}

        {/*<List className={styles.listContainer} subheader={<li />}>
          {[0, 1, 2, 3, 4].map(sectionId => (
            <li key={`section-${sectionId}`} style={{ background: "white" }}>
              <ul style={{ background: "white", padding: 0 }}>
                <ListSubheader
                  style={{ background: "black", color: "white" }}
                >{`I'm sticky ${sectionId}`}</ListSubheader>
                {[0, 1, 2].map(item => (
                  <ListItem button key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history
  };
};
export default connect(
  mapStateToProps,
  null
)(History);
