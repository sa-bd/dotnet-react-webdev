import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import useStyles from "../../styles/header_private";

export default function HeaderPrivate(props) {
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
              window.location.href = "/";
            }}
          >
            Home
          </Button>
        </div>

        <Button
          variant="contained"
          size="small"
          className={classes.button2}
          onClick={() => {
            history.push("/create");
          }}
        >
          Create a post
        </Button>

        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          log out
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

HeaderPrivate.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
