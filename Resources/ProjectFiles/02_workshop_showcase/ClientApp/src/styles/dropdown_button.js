import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "left",
    fontFamily: "var(--font)",
    color: "var(--black)",
    boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: theme.spacing(2),
  },
  menuItem: {
    fontFamily: "var(--font)",
    color: "var(--black)",
  },
}));

export default useStyles;
