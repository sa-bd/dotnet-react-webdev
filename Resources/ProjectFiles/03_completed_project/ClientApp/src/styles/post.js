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
    },
    cardGrid: {
      paddingTop: theme.spacing(1),
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
    coverPhoto: {
      position: "relative",
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      padding: theme.spacing(20),
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
    },
  }));
  export default useStyles;