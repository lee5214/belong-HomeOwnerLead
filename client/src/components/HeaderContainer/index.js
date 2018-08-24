import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "./HeaderContainer.css";

const HeaderContainer = ({ headerTitle }) => {
  return (
    <Grid
      container
      spacing={12}
      direction="column"
      justify="center"
      alignItems="center"
      className={styles.block}
    >
      <Grid item xs={2} className={styles.signUpTitleContainer}>
        <span className={styles.signUpTitle}>{headerTitle}</span>
      </Grid>
    </Grid>
  );
};
export default HeaderContainer;
