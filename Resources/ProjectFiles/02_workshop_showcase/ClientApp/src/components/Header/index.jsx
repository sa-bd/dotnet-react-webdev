import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import useStyles from "../../styles/header";

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          align="left"
          noWrap
          component="h3"
          className={classes.title}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Blog
        </Typography>
        <div className={classes.navbar}>
          <Button
            size="small"
            className={classes.navbarItems}
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Button>
        </div>

        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={() => {
            history.push(props.buttonUrl);
          }}
        >
          {props.button}
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
