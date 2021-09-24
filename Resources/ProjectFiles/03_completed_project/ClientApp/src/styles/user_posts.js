import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  section: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },

  button: {
    fontFamily: "var(--font)",
    fontSize: "var(--font-size-button)",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default useStyles;
