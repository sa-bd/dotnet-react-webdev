import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    width: "100vh",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  cardContent: {
    paddingTop: 0,
  },
  button: {
    fontFamily: "var(--font)",
    fontSize: "var(--font-size-button)",
    marginRight: theme.spacing(1),
  },
}));
export default useStyles;
