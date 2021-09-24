import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useStyles from "../../styles/footer";

function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      {"© Microsoft Student Ambassadors"}
      <Link color="inherit" href="https://material-ui.com/">
        {" "}
        Workshop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="h6">Workshop on Web development</Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
