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
      marginLeft: theme.spacing(30),
      marginRight: theme.spacing(30),
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(15),
      marginRight: theme.spacing(15),
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
  /* form */

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "var(--black)",
    fontFamily: "var(--font)",
    fontSize: "var(--font-size-button)",
    padding: theme.spacing(1),
  },

  link: {
    color: "var(--darkash)",
    fontFamily: "var(--font)",
    fontSize: "var(--font-size-h6)",
  },
  avatarContainer: {
    backgroundColor: "var(--ash)",
    borderRadius: 20,
    width: 150,
    height: 150,
    display: "inline-grid",
    alignContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    padding: "13%",
  },
  avatarIconButton: {
    backgroundColor: "var(--darkash)",
    position: "absolute",
    marginLeft: "-15px",
    marginTop: "102px",
  },
  imageContainer: {
    textAlign: "left",
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
