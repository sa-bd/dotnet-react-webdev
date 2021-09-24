import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: "relative",
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {
      textAlign: "left",
      position: "relative",
      padding: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(10),
        paddingRight: 0,
      },
    },
    button: {
      fontFamily: "var(--font)",
      fontSize: "var(--font-size-button)",
      marginTop: theme.spacing(2),
      backgroundColor: "var(--white)",
    },
  }));
  export default useStyles;