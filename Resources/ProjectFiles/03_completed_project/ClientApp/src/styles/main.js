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
    paddingTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    backgroundColor: "transparent",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    paddingLeft: 0,
  },
  cardActions: {
    paddingLeft: 0,
  },
  button: {
    fontFamily: "var(--font)",
    fontSize: "var(--font-size-button)",
  },
}));

export default useStyles;
