import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "var(--radius-paper)",
    textAlign: "left",
    fontFamily: "var(--font)",
  },
  alertTitle: {
    fontFamily: "var(--font)",
    fontWeight: "bold",
  },
}));

export default useStyles;
